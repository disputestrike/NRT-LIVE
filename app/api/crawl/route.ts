/**
 * NRT Crawler — Cerebras llama3.1-70b
 * Keys from env with hardcoded fallback — works immediately
 */
import { NextRequest, NextResponse } from "next/server";
import { insertArticle } from "../../../lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// All 5 keys — env first, hardcoded fallback
const KEYS = [
  process.env.CEREBRAS_API_KEY   || "csk-j839dc68v5mtd323f5jfvm82rkhyny3dy8kdxyr93w2ertnt",
  process.env.CEREBRAS_API_KEY_2 || "csk-jfwhwetet942t4ndxjph5t83v3rrcypd48tvdce3tdk9tkh3",
  process.env.CEREBRAS_API_KEY_3 || "csk-vtdn3ypfw353xmevcce9wr8w6h2evwm8kpxyh5tnwkw5v8wv",
  process.env.CEREBRAS_API_KEY_4 || "csk-fpp82tdfhyhy955rff4w6pe59vpyrmmc633htrdwwhhwfp6e",
  process.env.CEREBRAS_API_KEY_5 || "csk-3rmkpjm3d5hcxf9pxjj6xy8yh3w3299p68tjnvfphm9kvx3t",
];
let ki = 0;
const nextKey = () => KEYS[ki++ % KEYS.length];

const TOPICS = [
  { cat:"world",         img:"1529107386315-e1a2ed48a620", q:"Iran oil Strait Hormuz US military war today 2026" },
  { cat:"world",         img:"1529107386315-e1a2ed48a620", q:"US China trade war tariffs sanctions breaking news today" },
  { cat:"world",         img:"1578662996442-48f60103fc96", q:"Russia Ukraine war ceasefire peace talks latest news" },
  { cat:"world",         img:"1529107386315-e1a2ed48a620", q:"Gaza Middle East Israel war humanitarian latest news" },
  { cat:"politics",      img:"1555848962-6e79363ec58f", q:"Nigeria Tinubu Senate government policy latest news today" },
  { cat:"politics",      img:"1540910419892-4a36d2c3266c", q:"Nigeria governor court ruling election news today" },
  { cat:"economy",       img:"1611974789855-9c2a0a7236a3", q:"Nigeria naira dollar CBN exchange rate today 2026" },
  { cat:"economy",       img:"1601027847350-0285867c31f7", q:"Nigeria oil NNPC fuel petrol price latest 2026" },
  { cat:"economy",       img:"1486406146926-c627a92ad1ab", q:"Nigeria inflation economy GDP business news today" },
  { cat:"sports",        img:"1579952363873-27f3bade9f55", q:"Super Eagles Nigeria football AFCON result today" },
  { cat:"sports",        img:"1508098682722-e99c43a406b2", q:"Premier League Champions League football results today" },
  { cat:"entertainment", img:"1493225457124-a3eb161ffa5f", q:"Nollywood Davido Burna Boy Afrobeats news today" },
  { cat:"investigation", img:"1450101499163-c8848c66ca85", q:"Nigeria EFCC corruption fraud arrest court today" },
  { cat:"africa",        img:"1547471080-7cc2caa01a7e", q:"Africa South Africa Kenya Ghana Ethiopia news today" },
  { cat:"tech",          img:"1677442135703-1787eea5ce01", q:"Nigeria fintech AI startup technology news today" },
];

async function generateStory(cat: string, q: string, img: string) {
  const today = new Date().toLocaleDateString("en-NG", {
    weekday:"long", year:"numeric", month:"long", day:"numeric"
  });

  for (let attempt = 0; attempt < KEYS.length; attempt++) {
    const key = nextKey();
    try {
      const res = await fetch("https://api.cerebras.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.1-70b",
          max_tokens: 1200,
          temperature: 0.75,
          messages: [
            {
              role: "system",
              content: `You are a senior journalist at NRT (Nigeria Real Time), Africa's boldest AI-native news network. Today is ${today}. Write authoritative journalism for Nigerian audiences. Use specific names, numbers, and locations. Never be vague or generic.`
            },
            {
              role: "user",
              content: `Write a complete breaking news article about this topic: "${q}"

The article must reflect what is actually happening in the world right now in 2026. Include real geopolitical context, real named officials and countries, specific figures and dates.

Return ONLY valid JSON — no markdown, no explanation:
{
  "headline": "Urgent specific headline with real details, 8-14 words",
  "snippet": "2-3 sentences with the core breaking facts. Max 55 words.",
  "body": "<p>Opening paragraph: the main breaking development with specific names, places, numbers.</p><p>Second paragraph: background context and why this matters.</p><p>Third paragraph: official reactions and statements from named sources.</p><p>Fourth paragraph: implications for Nigeria and Africa specifically.</p><p>Fifth paragraph: what happens next — expected timeline and analyst views.</p>"
}`
            }
          ]
        })
      });

      if (res.status === 429) {
        await new Promise(r => setTimeout(r, 1200 * (attempt + 1)));
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0,150)}`);

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || "";
      const m = text.match(/\{[\s\S]*\}/);
      if (!m) throw new Error("No JSON found");
      const p = JSON.parse(m[0]);
      if (!p.headline || !p.body) throw new Error("Missing fields");

      return {
        headline: p.headline as string,
        snippet:  p.snippet  as string || "",
        body:     p.body     as string,
        image_url: `https://images.unsplash.com/photo-${img}?w=900&q=80`,
      };
    } catch (err) {
      if (attempt === KEYS.length - 1) throw err;
      await new Promise(r => setTimeout(r, 500));
    }
  }
  throw new Error("All keys failed");
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const secret = process.env.CRON_SECRET || "nrt-cron-2026";
  if (!auth.includes(secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = { attempted:0, saved:0, errors:[] as string[] };
  const picked = [...TOPICS].sort(()=>Math.random()-0.5).slice(0,5);

  for (const t of picked) {
    try {
      results.attempted++;
      const story = await generateStory(t.cat, t.q, t.img);
      const id = await insertArticle({
        category:      t.cat,
        category_slug: t.cat,
        headline:      story.headline,
        snippet:       story.snippet,
        body:          story.body,
        image_url:     story.image_url,
        is_breaking:   ["world","investigation","politics"].includes(t.cat),
      });
      if (id) results.saved++;
      else results.errors.push(`${t.cat}: DB save returned null`);
      await new Promise(r => setTimeout(r, 400));
    } catch (e: unknown) {
      results.errors.push(`${t.cat}: ${e instanceof Error ? e.message.slice(0,100) : "error"}`);
    }
  }

  return NextResponse.json({
    success:    results.saved > 0,
    provider:   "Cerebras llama3.1-70b",
    db:         !!process.env.DATABASE_URL,
    ...results,
    crawledAt:  new Date().toISOString(),
  });
}

export async function GET() {
  const { getDbStatus } = await import("../../../lib/db");
  const db = await getDbStatus();
  return NextResponse.json({
    status:          "NRT Cerebras Crawler — ACTIVE",
    provider:        "Cerebras llama3.1-70b",
    endpoint:        "https://api.cerebras.ai/v1/chat/completions",
    keysLoaded:      KEYS.length,
    db_connected:    db.connected,
    db_articles:     db.articleCount,
    db_tables:       db.tables,
    trigger:         "POST /api/crawl   Authorization: Bearer nrt-cron-2026",
  });
}
