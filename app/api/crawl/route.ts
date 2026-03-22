/**
 * NRT Live Crawler
 * Uses Cerebras llama3.1-70b with round-robin key rotation
 * Keys hardcoded as fallback — works immediately on Railway
 */
import { NextRequest, NextResponse } from "next/server";
import { insertArticle } from "../../../lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Round-robin key rotation — same 5 keys as lib/cerebras.ts
const CEREBRAS_KEYS = [
  process.env.CEREBRAS_KEY_1 || "csk-j839dc68v5mtd323f5jfvm82rkhyny3dy8kdxyr93w2ertnt",
  process.env.CEREBRAS_KEY_2 || "csk-jfwhwetet942t4ndxjph5t83v3rrcypd48tvdce3tdk9tkh3",
  process.env.CEREBRAS_KEY_3 || "csk-vtdn3ypfw353xmevcce9wr8w6h2evwm8kpxyh5tnwkw5v8wv",
  process.env.CEREBRAS_KEY_4 || "csk-fpp82tdfhyhy955rff4w6pe59vpyrmmc633htrdwwhhwfp6e",
  process.env.CEREBRAS_KEY_5 || "csk-3rmkpjm3d5hcxf9pxjj6xy8yh3w3299p68tjnvfphm9kvx3t",
];
let keyIdx = 0;
function nextKey() { return CEREBRAS_KEYS[keyIdx++ % CEREBRAS_KEYS.length]; }

const TOPICS = [
  { cat:"world",         q:"Iran Strait of Hormuz oil war US military latest breaking news" },
  { cat:"world",         q:"US China trade war tariffs sanctions latest news today" },
  { cat:"world",         q:"Russia Ukraine ceasefire war news latest today" },
  { cat:"world",         q:"Middle East Gaza Israel conflict latest breaking news" },
  { cat:"politics",      q:"Nigeria Senate Tinubu government parliament latest news" },
  { cat:"politics",      q:"Nigeria state governor election court ruling news" },
  { cat:"economy",       q:"Nigeria naira dollar exchange rate CBN latest news" },
  { cat:"economy",       q:"Nigeria oil NNPC fuel petrol price news today" },
  { cat:"sports",        q:"Super Eagles Nigeria AFCON football match result" },
  { cat:"sports",        q:"Premier League Champions League football latest results" },
  { cat:"entertainment", q:"Nollywood Davido Burna Boy Nigerian music latest news" },
  { cat:"investigation", q:"Nigeria EFCC corruption fraud arrest court latest" },
  { cat:"africa",        q:"Africa South Africa Kenya Ghana Ethiopia breaking news" },
  { cat:"tech",          q:"Nigeria fintech startup AI technology latest news" },
  { cat:"health",        q:"Nigeria health WHO disease outbreak vaccine latest" },
];

const CAT_IMAGES: Record<string, string> = {
  world:         "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80",
  politics:      "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=900&q=80",
  economy:       "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80",
  sports:        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&q=80",
  entertainment: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=80",
  investigation: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80",
  nigeria:       "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=900&q=80",
  africa:        "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80",
  tech:          "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80",
  health:        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
};

async function generateStory(cat: string, topic: string) {
  const today = new Date().toLocaleDateString("en-NG", {
    weekday:"long", year:"numeric", month:"long", day:"numeric"
  });

  // Try each key with 429 backoff
  for (let attempt = 0; attempt < CEREBRAS_KEYS.length; attempt++) {
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
          temperature: 0.7,
          messages: [
            {
              role: "system",
              content: `You are a senior journalist at NRT (Nigeria Real Time). Today is ${today}. Write authoritative breaking news for Nigerian and African audiences. Be specific: real names, real numbers, real locations. Never vague.`
            },
            {
              role: "user",
              content: `Write a breaking news article about: "${topic}"

Return ONLY this JSON (no markdown):
{
  "headline": "Specific urgent headline with real details, 8-14 words",
  "snippet": "2-3 sentences with key facts, max 55 words",
  "body": "<p>Opening with the main breaking development. Specific names and facts.</p><p>Context and why this matters to Nigeria and Africa.</p><p>Official reactions and statements.</p><p>Implications and what analysts are saying.</p><p>What happens next — timeline and expectations.</p>"
}`
            }
          ]
        })
      });

      if (res.status === 429) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Cerebras ${res.status}: ${err.slice(0,150)}`);
      }

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || "";
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("No JSON in response");

      const parsed = JSON.parse(match[0]);
      if (!parsed.headline || !parsed.body) throw new Error("Missing fields");
      return parsed as { headline:string; snippet:string; body:string };

    } catch (err: unknown) {
      if (attempt === CEREBRAS_KEYS.length - 1) throw err;
      await new Promise(r => setTimeout(r, 500));
    }
  }
  throw new Error("All keys exhausted");
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const secret = process.env.CRON_SECRET || "nrt-cron-2026";
  if (!auth.includes(secret)) {
    return NextResponse.json({ error:"Unauthorized" }, { status:401 });
  }

  const results = {
    attempted: 0, saved: 0, errors: [] as string[],
    dbConnected: !!process.env.DATABASE_URL,
  };

  const shuffled = [...TOPICS].sort(()=>Math.random()-0.5).slice(0,5);

  for (const topic of shuffled) {
    try {
      results.attempted++;
      const story = await generateStory(topic.cat, topic.q);

      const id = await insertArticle({
        category: topic.cat,
        category_slug: topic.cat,
        headline: story.headline,
        snippet: story.snippet,
        body: story.body,
        confidence: "Verified",
        image_url: CAT_IMAGES[topic.cat] || CAT_IMAGES.world,
        source_url: "",
        is_breaking: ["world","investigation","politics"].includes(topic.cat),
      });

      if (id) results.saved++;
      else results.errors.push(`${topic.cat}: DB save failed`);

      await new Promise(r => setTimeout(r, 400));
    } catch (err:unknown) {
      results.errors.push(`${topic.cat}: ${err instanceof Error ? err.message.slice(0,100) : "error"}`);
    }
  }

  return NextResponse.json({
    success: results.saved > 0,
    provider: "Cerebras llama3.1-70b",
    keysAvailable: CEREBRAS_KEYS.length,
    ...results,
    crawledAt: new Date().toISOString(),
  });
}

export async function GET() {
  return NextResponse.json({
    status: "NRT Cerebras Crawler ACTIVE",
    provider: "Cerebras llama3.1-70b",
    endpoint: "https://api.cerebras.ai/v1/chat/completions",
    keysLoaded: CEREBRAS_KEYS.length,
    dbReady: !!process.env.DATABASE_URL,
    topics: TOPICS.length,
    howToTrigger: "POST /api/crawl with Authorization: Bearer nrt-cron-2026",
  });
}
