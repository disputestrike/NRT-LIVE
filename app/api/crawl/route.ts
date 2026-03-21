// POST /api/crawl — trigger news crawl (protected by CRON_SECRET)
import { NextRequest, NextResponse } from "next/server";
import { crawlFeeds, rewriteWithAI, getEmoji, getPhClass } from "../../../lib/crawler";
import { insertArticle } from "../../../lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  // Auth check
  const auth = req.headers.get("authorization") || "";
  const secret = process.env.CRON_SECRET || "nrt-cron-2026";
  if (!auth.includes(secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = { found: 0, saved: 0, errors: [] as string[] };

  try {
    const raw = await crawlFeeds(5);
    results.found = raw.length;

    for (const item of raw) {
      try {
        const rewritten = await rewriteWithAI(item);
        if (!rewritten) continue;

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
          is_breaking: item.category === "breaking",
        });

        if (id) results.saved++;
      } catch (err: unknown) {
        results.errors.push(err instanceof Error ? err.message : "unknown error");
      }
    }
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "unknown", ...results }, { status: 500 });
  }

  return NextResponse.json({ success: true, ...results, crawledAt: new Date().toISOString() });
}

// GET for health check
export async function GET() {
  return NextResponse.json({ status: "NRT Crawl Agent ready", feeds: 9, schedule: "every 15 mins" });
}
