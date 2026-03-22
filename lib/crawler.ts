/**
 * NRT Live News Crawler
 * Runs on Railway (full internet access)
 * Crawls 9 Nigerian + international RSS feeds
 * Rewrites with Claude Haiku → validates → saves to DB
 */
import Parser from "rss-parser";

export type RawStory = {
  title: string;
  link: string;
  snippet: string;
  pubDate: string;
  source: string;
  category: string;
  imageUrl?: string;
};

// ── RSS FEEDS ────────────────────────────────────────────────────
export const FEEDS = [
  // Nigerian sources
  { url:"https://punchng.com/feed/",                    source:"Punch NG",       category:"nigeria",       priority:1 },
  { url:"https://www.vanguardngr.com/feed/",            source:"Vanguard NG",    category:"nigeria",       priority:1 },
  { url:"https://businessday.ng/feed/",                 source:"BusinessDay",    category:"economy",       priority:1 },
  { url:"https://dailypost.ng/feed/",                   source:"Daily Post",     category:"nigeria",       priority:2 },
  { url:"https://www.premiumtimesng.com/feed",          source:"Premium Times",  category:"politics",      priority:1 },
  { url:"https://saharareporters.com/rss.xml",          source:"Sahara Reporters",category:"investigation", priority:2 },
  // International
  { url:"https://feeds.bbci.co.uk/news/world/africa/rss.xml", source:"BBC Africa", category:"africa",   priority:1 },
  { url:"https://www.aljazeera.com/xml/rss/all.xml",    source:"Al Jazeera",     category:"world",         priority:2 },
  { url:"https://www.theguardian.com/world/rss",        source:"The Guardian",   category:"world",         priority:3 },
  // Sports
  { url:"https://supersport.com/rss/football.rss",      source:"SuperSport",     category:"sports",        priority:1 },
];

// ── CATEGORY → EMOJI + GRADIENT ──────────────────────────────────
const CAT_META: Record<string, { emoji:string; ph:string }> = {
  nigeria:       { emoji:"🇳🇬", ph:"ph-pol" },
  politics:      { emoji:"🏛️",  ph:"ph-pol" },
  economy:       { emoji:"💰",  ph:"ph-eco" },
  sports:        { emoji:"⚽",  ph:"ph-spo" },
  entertainment: { emoji:"🎵",  ph:"ph-ent" },
  investigation: { emoji:"🔍",  ph:"ph-inv" },
  world:         { emoji:"🌍",  ph:"ph-pol" },
  africa:        { emoji:"🌍",  ph:"ph-pol" },
  money:         { emoji:"💼",  ph:"ph-mon" },
  tech:          { emoji:"🚀",  ph:"ph-tec" },
  health:        { emoji:"❤️",  ph:"ph-hlt" },
  opinion:       { emoji:"✍️",  ph:"ph-pol" },
};

export function getCatMeta(cat: string) {
  return CAT_META[cat] || { emoji:"📰", ph:"ph-pol" };
}

// ── RSS CRAWLER ───────────────────────────────────────────────────
export async function crawlFeeds(maxFeeds = 10, storiesPerFeed = 3): Promise<RawStory[]> {
  const parser = new Parser({
    timeout: 10000,
    customFields: { item: [["media:content","media"],["enclosure","enclosure"]] }
  });
  const results: RawStory[] = [];
  const feeds = FEEDS.slice(0, maxFeeds);

  await Promise.allSettled(feeds.map(async (feed) => {
    try {
      const parsed = await parser.parseURL(feed.url);
      const items = (parsed.items || []).slice(0, storiesPerFeed);
      for (const item of items) {
        if (!item.title || !item.link) continue;
        // Try to extract image from media fields
        const imageUrl =
          (((item as unknown as Record<string,Record<string,Record<string,string>>>)["media:thumbnail"])?.["$"])?.url ||
          (((item as unknown as Record<string,Record<string,Record<string,string>>>)["media:content"])?.["$"])?.url ||
          ((item as unknown as Record<string,Record<string,string>>)["enclosure"])?.url ||
          "";
        results.push({
          title: item.title.trim(),
          link: item.link,
          snippet: stripHtml(item.contentSnippet || item.content || item.summary || "").slice(0, 400),
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          source: feed.source,
          category: detectCategory(item.title, item.categories, feed.category),
          imageUrl: imageUrl as string,
        });
      }
    } catch { /* feed failed — continue */ }
  }));

  return results;
}

// ── AUTO-DETECT CATEGORY FROM HEADLINE ───────────────────────────
function detectCategory(title: string, cats?: string[], defaultCat = "nigeria"): string {
  const t = (title + " " + (cats||[]).join(" ")).toLowerCase();
  if (/police|efcc|court|tribunal|election|governor|president|senate|minister|government/.test(t)) return "politics";
  if (/naira|inflation|cbn|economy|gdp|market|stock|budget|trade|investment/.test(t)) return "economy";
  if (/football|soccer|eagles|afcon|epl|premier|nba|basketball|boxing|athletics/.test(t)) return "sports";
  if (/music|movie|nollywood|film|celebrity|grammy|concert|davido|burna|wizkid/.test(t)) return "entertainment";
  if (/fraud|corruption|scam|efcc|icpc|probe|investigation|arrested/.test(t)) return "investigation";
  if (/startup|tech|ai|app|fintech|crypto|digital|software|data/.test(t)) return "tech";
  if (/health|hospital|disease|vaccine|covid|malaria|outbreak|who|ncdc/.test(t)) return "health";
  if (/africa|kenya|ghana|ethiopia|south africa|egypt|morocco|continent/.test(t)) return "africa";
  if (/dollar|job|salary|hustle|career|skill|income|remote|freelance/.test(t)) return "money";
  if (/world|global|us|usa|china|russia|ukraine|europe|international/.test(t)) return "world";
  return defaultCat;
}

// ── AI REWRITE WITH CLAUDE HAIKU ─────────────────────────────────
export async function rewriteWithAI(raw: RawStory, apiKey: string): Promise<{
  headline: string; snippet: string; body: string;
  category: string; confidence: "Verified" | "Developing";
} | null> {
  if (!apiKey) return null;
  try {
    const prompt = `You are a senior journalist at NRT (Nigeria Real Time) — Nigeria's fearless AI-native news network.

Rewrite this story in NRT style. Be bold, factual, authoritative. Nigerian audience first.

Source: ${raw.source}
Original headline: ${raw.title}
Original text: ${raw.snippet}

Output ONLY valid JSON (no markdown):
{
  "headline": "Bold 8-12 word headline, specific facts, no clickbait",
  "snippet": "2-3 sentence summary, key facts, why it matters to Nigerians (max 50 words)",
  "body": "4-6 paragraphs of full journalism. Context, quotes, analysis, Nigerian angle.",
  "category": "one of: politics|economy|sports|entertainment|nigeria|investigation|money|tech|africa|world|health|opinion",
  "confidence": "Verified if reputable source, Developing if single source"
}`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST",
      headers:{ "Content-Type":"application/json", "x-api-key":apiKey, "anthropic-version":"2023-06-01" },
      body:JSON.stringify({ model:"claude-haiku-4-5-20251001", max_tokens:1200, messages:[{ role:"user", content:prompt }] })
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = (data.content?.[0]?.text || "").replace(/```json|```/g,"").trim();
    return JSON.parse(text);
  } catch { return null; }
}

// ── UNSPLASH TOPIC IMAGES ─────────────────────────────────────────
const TOPIC_IMAGES: Record<string, string[]> = {
  politics:      ["1529107386315-e1a2ed48a620","1555848962-6e79363ec58f","1540910419892-4a36d2c3266c"],
  economy:       ["1611974789855-9c2a0a7236a3","1486406146926-c627a92ad1ab","1518770660439-4636190af475"],
  sports:        ["1579952363873-27f3bade9f55","1508098682722-e99c43a406b2","1546519638405-a9f0b27d18b0"],
  entertainment: ["1493225457124-a3eb161ffa5f","1478720568477-152d9b164e26","1516450360452-9312f5e86fc7"],
  nigeria:       ["1565043666747-69f6646db940","1503387762-592deb58ef4e","1609209080565-1a2d13286c86"],
  investigation: ["1450101499163-c8848c66ca85","1554224155-6726b3ff858f","1554224154-22dec7ec8818"],
  money:         ["1499750310107-5fef28a66643","1559526324-593bc073d938","1518611012118-696072aa579a"],
  tech:          ["1677442135703-1787eea5ce01","1473968512647-3e447244af8f","1518770660439-4636190af475"],
  africa:        ["1547471080-7cc2caa01a7e","1446776811953-b23d57bd21aa","1494523716954-dc08e5e57e64"],
  world:         ["1529107386315-e1a2ed48a620","1578662996442-48f60103fc96","1677442135703-1787eea5ce01"],
  health:        ["1576091160550-2173dba999ef","1559757175-7cb15e7bcce9","1576091160399-112ba8d25d1d"],
  sports_boxing: ["1549719386-74dfcbf7dbed"],
};

export function getStoryImage(category: string, sourceUrl?: string, idx = 0): string {
  const imgs = TOPIC_IMAGES[category] || TOPIC_IMAGES.world;
  const imgId = imgs[idx % imgs.length];
  return `https://images.unsplash.com/photo-${imgId}?w=900&q=80&auto=format&fit=crop`;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim();
}
