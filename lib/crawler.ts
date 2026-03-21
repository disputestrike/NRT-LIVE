// NRT News Crawler Agent
// Crawls Nigerian + international RSS feeds, rewrites with AI, saves to DB

import Parser from "rss-parser";

export type RawStory = {
  title: string;
  link: string;
  snippet: string;
  pubDate: string;
  source: string;
  category: string;
};

const FEEDS = [
  // Nigerian sources
  { url: "https://punchng.com/feed/", source: "Punch NG", category: "nigeria" },
  { url: "https://www.vanguardngr.com/feed/", source: "Vanguard NG", category: "nigeria" },
  { url: "https://businessday.ng/feed/", source: "BusinessDay", category: "economy" },
  { url: "https://dailypost.ng/feed/", source: "Daily Post", category: "nigeria" },
  { url: "https://www.premiumtimesng.com/feed", source: "Premium Times", category: "nigeria" },
  // Sports
  { url: "https://supersport.com/rss/football.rss", source: "SuperSport", category: "sports" },
  // Africa
  { url: "https://allafrica.com/tools/headlines/rdf/nigeria/headlines.rdf", source: "AllAfrica", category: "africa" },
  // International (for context)
  { url: "https://feeds.bbci.co.uk/news/world/africa/rss.xml", source: "BBC Africa", category: "world" },
  { url: "https://www.aljazeera.com/xml/rss/all.xml", source: "Al Jazeera", category: "world" },
];

const CAT_EMOJI: Record<string, string> = {
  nigeria: "🇳🇬", politics: "🏛️", economy: "💰", sports: "⚽",
  entertainment: "🎵", investigation: "🔍", world: "🌍", africa: "🌍",
  money: "💼", tech: "🚀", health: "❤️", default: "📰"
};

const CAT_PH: Record<string, string> = {
  nigeria: "ph-pol", politics: "ph-pol", economy: "ph-eco", sports: "ph-spo",
  entertainment: "ph-ent", investigation: "ph-inv", world: "ph-pol",
  africa: "ph-pol", money: "ph-mon", tech: "ph-tec", health: "ph-hlt"
};

export async function crawlFeeds(limit = 5): Promise<RawStory[]> {
  const parser = new Parser({ timeout: 8000 });
  const results: RawStory[] = [];

  for (const feed of FEEDS.slice(0, limit)) {
    try {
      const parsed = await parser.parseURL(feed.url);
      const items = (parsed.items || []).slice(0, 3);
      for (const item of items) {
        if (!item.title || !item.link) continue;
        results.push({
          title: item.title.trim(),
          link: item.link,
          snippet: stripHtml(item.contentSnippet || item.content || item.summary || ""),
          pubDate: item.pubDate || new Date().toISOString(),
          source: feed.source,
          category: feed.category,
        });
      }
    } catch {
      // Feed failed silently
    }
  }

  return results;
}

export async function rewriteWithAI(raw: RawStory): Promise<{
  headline: string;
  snippet: string;
  body: string;
  category: string;
  confidence: string;
} | null> {
  const key = process.env.ANTHROPIC_API_KEY || process.env.CEREBRAS_API_KEY_1;
  if (!key) return null;

  try {
    const prompt = `You are NRT (Nigeria Real Time) — a fearless, authoritative Nigerian AI news network.

Rewrite this news story in NRT style:
- HEADLINE: Bold, specific, punchy (max 12 words). No clickbait. Fact-first.
- SNIPPET: 2 sentences max. Key facts only. (max 40 words)
- BODY: 3–4 paragraphs. Authoritative journalist tone. Nigerian audience context. Include why it matters to Nigerians.
- CATEGORY: One of: politics, economy, sports, entertainment, investigation, money, tech, health, world, nigeria, africa
- CONFIDENCE: "Verified" if from established source, "Developing" if single source

Source: ${raw.source}
Original title: ${raw.title}
Original text: ${raw.snippet.slice(0, 500)}

Respond ONLY with valid JSON:
{"headline":"...","snippet":"...","body":"...","category":"...","confidence":"..."}`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 800,
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!res.ok) return null;
    const data = await res.json();
    const text = data.content?.[0]?.text || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return parsed;
  } catch { return null; }
}

export function getEmoji(category: string): string {
  return CAT_EMOJI[category] || CAT_EMOJI.default;
}

export function getPhClass(category: string): string {
  return CAT_PH[category] || "ph-pol";
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 400);
}
