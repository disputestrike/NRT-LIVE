// NRT News Crawl Agent — powered by Cerebras AI (5-key rotation)
import { NextRequest, NextResponse } from "next/server";
import { crawlFeeds, getEmoji, getPhClass } from "../../../lib/crawler";
import { rewriteNewsStory } from "../../../lib/cerebras";
import { insertArticle } from "../../../lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  if (!auth.includes(process.env.CRON_SECRET || "nrt-cron-2026")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = { found: 0, saved: 0, errors: [] as string[] };

  try {
    const raw = await crawlFeeds(5);
    results.found = raw.length;

    for (const item of raw) {
      try {
        // Use Cerebras with key rotation
        const rewritten = await rewriteNewsStory({
          title: item.title,
          snippet: item.snippet,
          source: item.source,
          category: item.category,
        });

        if (!rewritten) {
          results.errors.push(`Cerebras rewrite failed for: ${item.title.slice(0, 40)}`);
          continue;
        }

        const id = await insertArticle({
          category: rewritten.category,
          category_slug: rewritten.category,
          headline: rewritten.headline,
          snippet: rewritten.snippet,
          body: rewritten.body,
          emoji: getEmoji(rewritten.category),
          ph_class: getPhClass(rewritten.category),
          confidence: rewritten.confidence as "Verified" | "Developing",
          source_url: item.link,
          is_breaking: false,
        });

        if (id) results.saved++;
      } catch (err: unknown) {
        results.errors.push(err instanceof Error ? err.message : "unknown");
      }
    }
  } catch (err: unknown) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : "unknown",
      ...results
    }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    ...results,
    engine: "Cerebras llama3.1-8b (5-key rotation)",
    crawledAt: new Date().toISOString()
  });
}

export async function GET() {
  return NextResponse.json({
    status: "NRT Crawl Agent ready",
    engine: "Cerebras AI — llama3.1-8b",
    keys: 5,
    rotation: "round-robin",
    feeds: 9,
    schedule: "every 15 mins"
  });
}
