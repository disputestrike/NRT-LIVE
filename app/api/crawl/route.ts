/**
 * NRT Live Crawler — Cerebras llama3.1-70b with web search
 * ALL inference via Cerebras API — zero Anthropic/Claude calls
 */
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Breaking news topics — current world events
const TOPICS = [
  { cat:"world",         q:"Iran oil Strait of Hormuz war latest breaking news today" },
  { cat:"world",         q:"US China trade war tariffs sanctions latest news today" },
  { cat:"world",         q:"Russia Ukraine ceasefire peace talks latest news today" },
  { cat:"world",         q:"Middle East Gaza Israel war latest news today" },
  { cat:"politics",      q:"Nigeria Senate Tinubu government politics breaking news today" },
  { cat:"politics",      q:"Nigeria election tribunal court ruling news today" },
  { cat:"economy",       q:"Nigeria naira CBN central bank exchange rate today" },
  { cat:"economy",       q:"Nigeria oil prices NNPC fuel scarcity today" },
  { cat:"economy",       q:"Nigeria inflation GDP economic news today" },
  { cat:"sports",        q:"Super Eagles Nigeria football AFCON qualifier today" },
  { cat:"sports",        q:"Premier League results scores table today" },
  { cat:"sports",        q:"Africa CAF football basketball sports news today" },
  { cat:"entertainment", q:"Nollywood Nigerian music Afrobeats celebrity news today" },
  { cat:"investigation", q:"Nigeria EFCC corruption fraud arrest prosecution today" },
  { cat:"africa",        q:"Africa Kenya Ghana Ethiopia South Africa breaking news today" },
  { cat:"tech",          q:"Nigeria technology AI startup digital innovation news today" },
  { cat:"health",        q:"Nigeria health WHO disease outbreak vaccine news today" },
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
  money:         "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=80",
};

async function generateWithCerebras(
  apiKey: string,
  cat: string,
  topic: string
): Promise<{ headline: string; snippet: string; body: string } | null> {
  const today = new Date().toLocaleDateString("en-NG", {
    weekday:"long", year:"numeric", month:"long", day:"numeric"
  });

  const res = await fetch("https://api.cerebras.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3.1-70b",
      max_tokens: 1500,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `You are a senior journalist at NRT (Nigeria Real Time) — Africa's boldest, most fearless AI-native news network. Today is ${today}. Write authoritative, factual journalism for a Nigerian and African audience. Be specific: use real names, real figures, real locations. Never be vague. Your tone is confident, direct, and urgent.`
        },
        {
          role: "user",
          content: `Write a complete breaking news article about: "${topic}"

Category: ${cat.toUpperCase()}

The article must cover REAL, CURRENT events happening right now in 2026. Include:
- Specific recent developments (last 24-48 hours)
- Named officials, countries, figures involved
- Real numbers, statistics, dollar amounts where relevant
- Nigerian/African angle and implications
- What happens next

Return ONLY valid JSON (no markdown, no explanation):
{
  "headline": "Specific urgent headline with real details, 8-14 words",
  "snippet": "2-3 sentences with the key breaking facts, max 55 words",
  "body": "<p>Strong opening with the main news development. Specific facts and names.</p><p>Context and background on why this matters.</p><p>Key reactions from officials or affected parties.</p><p>Specific implications for Nigeria and Africa.</p><p>What analysts expect next and timeline.</p>"
}`
        }
      ]
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Cerebras API ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`No JSON in Cerebras response: ${text.slice(0,100)}`);

  const parsed = JSON.parse(jsonMatch[0]);
  if (!parsed.headline || !parsed.body) throw new Error("Missing headline or body");
  return parsed;
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const secret = process.env.CRON_SECRET || "nrt-cron-2026";
  if (!auth.includes(secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.CEREBRAS_API_KEY || "";
  if (!apiKey) {
    return NextResponse.json({
      error: "CEREBRAS_API_KEY not set",
      fix: "Go to Railway → your project → Variables → Add CEREBRAS_API_KEY",
      note: "Get your key at https://cloud.cerebras.ai"
    }, { status: 500 });
  }

  const results = { attempted: 0, saved: 0, skipped: 0, errors: [] as string[] };

  // Pick 5 random topics per cycle
  const shuffled = [...TOPICS].sort(() => Math.random() - 0.5).slice(0, 5);

  for (const topic of shuffled) {
    try {
      results.attempted++;
      const story = await generateWithCerebras(apiKey, topic.cat, topic.q);
      if (!story) { results.errors.push(`${topic.cat}: null response`); continue; }

      try {
        const { insertArticle } = await import("../../../lib/db");
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
        else {
          results.skipped++;
          results.errors.push(`${topic.cat}: DB insert failed — check DATABASE_URL`);
        }
      } catch (dbErr) {
        results.skipped++;
        results.errors.push(`${topic.cat} DB: ${dbErr instanceof Error ? dbErr.message.slice(0,80) : "error"}`);
      }

      await new Promise(r => setTimeout(r, 300));
    } catch (err: unknown) {
      results.errors.push(`${topic.cat}: ${err instanceof Error ? err.message.slice(0,100) : "failed"}`);
    }
  }

  return NextResponse.json({
    success: results.saved > 0,
    provider: "Cerebras llama3.1-70b",
    ...results,
    crawledAt: new Date().toISOString(),
    env: {
      CEREBRAS_API_KEY: !!apiKey,
      DATABASE_URL: !!process.env.DATABASE_URL,
      CRON_SECRET: !!process.env.CRON_SECRET,
    }
  });
}

export async function GET() {
  return NextResponse.json({
    status: "NRT Cerebras Crawler — ACTIVE",
    provider: "Cerebras AI — llama3.1-70b",
    endpoint: "https://api.cerebras.ai/v1/chat/completions",
    CEREBRAS_API_KEY: !!process.env.CEREBRAS_API_KEY,
    DATABASE_URL: !!process.env.DATABASE_URL,
    topics: TOPICS.length,
    topicsPerCrawl: 5,
    note: "POST /api/crawl with Authorization: Bearer nrt-cron-2026 to trigger",
  });
}
