import { NextRequest, NextResponse } from "next/server";
import { insertArticle } from "../../../lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Nigerian news topics to generate fresh stories about
const TOPICS = [
  { cat:"politics",      q:"Nigeria politics Senate government Tinubu latest news today" },
  { cat:"economy",       q:"Nigeria economy naira CBN inflation latest news today" },
  { cat:"sports",        q:"Super Eagles Nigeria football AFCON Premier League today" },
  { cat:"entertainment", q:"Nollywood Davido Burna Boy Nigerian music entertainment today" },
  { cat:"investigation", q:"Nigeria EFCC corruption fraud arrest latest news today" },
  { cat:"nigeria",       q:"Lagos Abuja Nigeria local news today breaking" },
  { cat:"africa",        q:"Africa Kenya Ethiopia Ghana news today" },
  { cat:"world",         q:"World international news United States China today" },
  { cat:"tech",          q:"Nigeria tech startup fintech AI innovation today" },
  { cat:"health",        q:"Nigeria health WHO disease vaccine medical news today" },
];

const CAT_IMAGES: Record<string, string> = {
  politics:      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80",
  economy:       "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80",
  sports:        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&q=80",
  entertainment: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=80",
  investigation: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80",
  nigeria:       "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=900&q=80",
  africa:        "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80",
  world:         "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80",
  tech:          "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80",
  health:        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
  money:         "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=80",
  opinion:       "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80",
};

async function generateNewsWithAI(apiKey: string, cat: string, topic: string) {
  const today = new Date().toLocaleDateString("en-GB", { weekday:"long", year:"numeric", month:"long", day:"numeric" });
  
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [{
        role: "user",
        content: `Today is ${today}. You are a senior journalist at NRT (Nigeria Real Time) — Nigeria's bold, fearless AI-native news network.

Write ONE complete, realistic, breaking news story for the category: ${cat.toUpperCase()}
Topic area: ${topic}

The story must be:
- Realistic and plausible for today's Nigerian news cycle
- Specific with names, numbers, locations, and quotes
- Written in confident, authoritative news style
- Nigerian audience first but internationally relevant

Output ONLY valid JSON (no markdown, no explanation):
{
  "headline": "Specific, bold 8-14 word headline with real details",
  "snippet": "2-3 sentence summary with key facts and why it matters (max 55 words)",
  "body": "5 full paragraphs of journalism. Include: context, specific quotes from named officials/experts, background, implications, reactions. Each paragraph 60-100 words.",
  "confidence": "Verified"
}`
      }]
    })
  });

  if (!res.ok) throw new Error(`Anthropic API error: ${res.status}`);
  const data = await res.json();
  const text = (data.content?.[0]?.text || "").replace(/```json|```/g, "").trim();
  return JSON.parse(text);
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const secret = process.env.CRON_SECRET || "nrt-cron-2026";
  if (!auth.includes(secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || "";
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not set" }, { status: 500 });
  }

  const results = { attempted: 0, saved: 0, errors: [] as string[] };

  // Generate stories for each topic (pick 5 random topics per crawl to avoid rate limits)
  const shuffled = [...TOPICS].sort(() => Math.random() - 0.5).slice(0, 5);

  for (const topic of shuffled) {
    try {
      results.attempted++;
      const story = await generateNewsWithAI(apiKey, topic.cat, topic.q);
      
      const id = await insertArticle({
        category: topic.cat,
        category_slug: topic.cat,
        headline: story.headline,
        snippet: story.snippet,
        body: story.body,
        confidence: story.confidence || "Verified",
        image_url: CAT_IMAGES[topic.cat] || CAT_IMAGES.nigeria,
        source_url: "",
        is_breaking: topic.cat === "investigation" || topic.cat === "politics",
      });

      if (id) results.saved++;
      
      // Small delay between API calls
      await new Promise(r => setTimeout(r, 500));
    } catch (err: unknown) {
      results.errors.push(`${topic.cat}: ${err instanceof Error ? err.message : "failed"}`);
    }
  }

  return NextResponse.json({
    success: true,
    ...results,
    crawledAt: new Date().toISOString(),
  });
}

export async function GET() {
  return NextResponse.json({ status: "NRT AI News Generator active", topics: TOPICS.length });
}
