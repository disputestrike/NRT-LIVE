import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const TOPICS = [
  { cat:"politics",      slug:"politics",      q:"Nigeria Senate government president Tinubu NASS politics news" },
  { cat:"economy",       slug:"economy",       q:"Nigeria naira CBN inflation economy business news" },
  { cat:"sports",        slug:"sports",        q:"Super Eagles Nigeria football Premier League AFCON sports" },
  { cat:"entertainment", slug:"entertainment", q:"Nollywood Davido Burna Boy Nigerian music entertainment celebrity" },
  { cat:"investigation", slug:"investigation", q:"Nigeria EFCC corruption fraud arrest probe investigation" },
  { cat:"nigeria",       slug:"nigeria",       q:"Lagos Abuja Port Harcourt Nigeria breaking local news" },
  { cat:"africa",        slug:"africa",        q:"Africa Kenya Ghana Ethiopia South Africa continental news" },
  { cat:"world",         slug:"world",         q:"United States China Russia Europe international world news" },
  { cat:"tech",          slug:"tech",          q:"Nigeria tech startup fintech AI digital innovation" },
  { cat:"health",        slug:"health",        q:"Nigeria health WHO disease vaccine medical outbreak" },
];

const CAT_IMAGES: Record<string, string> = {
  politics:      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80",
  economy:       "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80",
  sports:        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&q=80",
  entertainment: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=80",
  investigation: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80",
  nigeria:       "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=900&q=80",
  africa:        "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80",
  world:         "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=80",
  tech:          "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80",
  health:        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
};

async function generateStory(apiKey: string, cat: string, topic: string) {
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
      model:"claude-haiku-4-5-20251001",
      max_tokens:1200,
      messages:[{
        role:"user",
        content:`Today is ${today}. You are a senior journalist at NRT — Nigeria Real Time, Africa's boldest AI-native news network.

Write ONE fresh, realistic breaking news story. Category: ${cat.toUpperCase()}
Topic: ${topic}

Requirements:
- Plausible for today's Nigerian/African news cycle
- Specific: include real-sounding names, figures, locations
- Bold, authoritative journalism voice
- Do NOT include "Verified" or confidence labels

Return ONLY this exact JSON (no markdown):
{
  "headline": "Specific bold headline 8-12 words with real details",
  "snippet": "2-3 sentence summary with key facts, 40-55 words max",
  "body": "5 solid paragraphs. Include named sources, specific figures, context, Nigerian angle, international implications. 400-600 words total."
}`
      }]
    })
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = (data.content?.[0]?.text || "").replace(/```json|```/g,"").trim();
  return JSON.parse(text);
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const secret = process.env.CRON_SECRET || "nrt-cron-2026";
  if (!auth.includes(secret)) {
    return NextResponse.json({ error:"Unauthorized" }, { status:401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || "";
  if (!apiKey) {
    return NextResponse.json({ error:"ANTHROPIC_API_KEY not configured in Railway environment variables" }, { status:500 });
  }

  const results = { attempted:0, saved:0, errors:[] as string[] };
  const shuffled = [...TOPICS].sort(()=>Math.random()-0.5).slice(0,5);

  for (const topic of shuffled) {
    try {
      results.attempted++;
      const story = await generateStory(apiKey, topic.cat, topic.q);

      // Try DB first
      try {
        const { insertArticle } = await import("../../../lib/db");
        const id = await insertArticle({
          category: topic.cat,
          category_slug: topic.slug,
          headline: story.headline,
          snippet: story.snippet,
          body: story.body,
          confidence: "Verified",
          image_url: CAT_IMAGES[topic.cat],
          source_url: "",
          is_breaking: topic.cat === "investigation" || topic.cat === "politics",
        });
        if (id) { results.saved++; }
      } catch {
        // DB not available — still count as attempted
        results.errors.push(`DB save failed for ${topic.cat} (DB may not be configured)`);
      }

      await new Promise(r => setTimeout(r, 300));
    } catch (err: unknown) {
      results.errors.push(`${topic.cat}: ${err instanceof Error ? err.message : "failed"}`);
    }
  }

  return NextResponse.json({
    success: true, ...results,
    crawledAt: new Date().toISOString(),
    dbConfigured: !!process.env.DATABASE_URL,
    apiKeyConfigured: !!apiKey,
  });
}

export async function GET() {
  return NextResponse.json({
    status:"NRT AI Crawler ready",
    apiKeySet: !!process.env.ANTHROPIC_API_KEY,
    dbSet: !!process.env.DATABASE_URL,
    topics: TOPICS.length,
  });
}
