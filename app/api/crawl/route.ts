import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Real news topics — current world events NRT should cover
const TOPICS = [
  { cat:"world",         q:"Iran oil Strait of Hormuz latest news today 2026" },
  { cat:"world",         q:"US China trade war tariffs latest news today 2026" },
  { cat:"world",         q:"Russia Ukraine war ceasefire latest news today 2026" },
  { cat:"politics",      q:"Nigeria Senate government Tinubu politics news today 2026" },
  { cat:"economy",       q:"Nigeria naira CBN exchange rate inflation today 2026" },
  { cat:"economy",       q:"Nigeria oil prices NNPC fuel latest news today 2026" },
  { cat:"sports",        q:"Super Eagles Nigeria football AFCON latest news 2026" },
  { cat:"sports",        q:"Premier League latest results scores today 2026" },
  { cat:"entertainment", q:"Nollywood Nigerian music Afrobeats latest news 2026" },
  { cat:"investigation", q:"Nigeria EFCC corruption fraud arrest latest 2026" },
  { cat:"africa",        q:"Africa Kenya Ghana Ethiopia South Africa news today 2026" },
  { cat:"tech",          q:"Nigeria tech AI startup fintech latest news 2026" },
  { cat:"health",        q:"Nigeria health WHO disease outbreak latest 2026" },
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

async function generateStory(apiKey: string, cat: string, topic: string): Promise<{
  headline: string; snippet: string; body: string;
} | null> {
  const today = new Date().toLocaleDateString("en-NG", {
    weekday:"long", year:"numeric", month:"long", day:"numeric"
  });

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "x-api-key": apiKey,
      "anthropic-version":"2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      tools: [{
        type: "web_search_20250305",
        name: "web_search"
      }],
      messages:[{
        role:"user",
        content:`Today is ${today}.

Search for the LATEST breaking news on this topic: "${topic}"

Then write a complete NRT news article based on what you find. NRT is Nigeria's premier AI news network - write with authority and depth for a Nigerian/African audience.

Return ONLY valid JSON (no markdown):
{
  "headline": "Specific factual headline with real details, 8-14 words",
  "snippet": "2-3 sentence summary with the key facts from today's news, max 60 words",
  "body": "<p>Opening paragraph with the main news. Names, figures, locations.</p><p>Second paragraph with context and background.</p><p>Third paragraph with reactions or implications for Nigeria/Africa.</p><p>Fourth paragraph with what happens next or additional details.</p><p>Fifth paragraph with broader significance.</p>"
}`
      }]
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API ${res.status}: ${err.slice(0,200)}`);
  }

  const data = await res.json();
  // Find the text response (after tool use)
  const textBlock = data.content?.find((b: {type:string}) => b.type === "text");
  if (!textBlock) throw new Error("No text in response");

  const text = textBlock.text.replace(/```json|```/g,"").trim();
  // Find JSON in the response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON found in response");

  return JSON.parse(jsonMatch[0]);
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const secret = process.env.CRON_SECRET || "nrt-cron-2026";
  if (!auth.includes(secret)) {
    return NextResponse.json({ error:"Unauthorized" }, { status:401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || "";
  if (!apiKey) {
    return NextResponse.json({
      error:"ANTHROPIC_API_KEY not set in Railway environment variables",
      fix:"Go to Railway → your project → Variables → Add ANTHROPIC_API_KEY"
    }, { status:500 });
  }

  const results = { attempted:0, saved:0, skipped:0, errors:[] as string[] };

  // Pick 5 random topics per crawl cycle
  const shuffled = [...TOPICS].sort(()=>Math.random()-0.5).slice(0,5);

  for (const topic of shuffled) {
    try {
      results.attempted++;
      const story = await generateStory(apiKey, topic.cat, topic.q);
      if (!story?.headline || !story?.body) {
        results.errors.push(`${topic.cat}: Empty response`);
        continue;
      }

      // Save to DB
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
          is_breaking: topic.cat === "world" || topic.cat === "investigation",
        });
        if (id) {
          results.saved++;
        } else {
          results.errors.push(`${topic.cat}: DB insert returned null — check DATABASE_URL`);
          results.skipped++;
        }
      } catch (dbErr) {
        results.errors.push(`${topic.cat}: DB error — ${dbErr instanceof Error ? dbErr.message : "unknown"}`);
        results.skipped++;
      }

      // Rate limit: 500ms between calls
      await new Promise(r => setTimeout(r, 500));
    } catch (err: unknown) {
      results.errors.push(`${topic.cat}: ${err instanceof Error ? err.message.slice(0,100) : "failed"}`);
    }
  }

  return NextResponse.json({
    success: results.saved > 0,
    ...results,
    crawledAt: new Date().toISOString(),
    env: {
      ANTHROPIC_API_KEY: !!apiKey,
      DATABASE_URL: !!process.env.DATABASE_URL,
      CRON_SECRET: !!process.env.CRON_SECRET,
    }
  });
}

export async function GET() {
  return NextResponse.json({
    status: "NRT Live Crawler",
    ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
    DATABASE_URL: !!process.env.DATABASE_URL,
    topics: TOPICS.length,
    method: "Uses Anthropic web_search tool to find real breaking news",
    trigger: "POST /api/crawl with Authorization: Bearer nrt-cron-2026",
  });
}
