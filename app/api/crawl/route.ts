/**
 * NRT Crawl Agent — POST /api/crawl
 * 1. Fetch RSS feeds (9 sources)
 * 2. Rewrite with Claude Haiku
 * 3. Validate with AI quality gate
 * 4. Save to PostgreSQL
 * 5. Returns stats
 *
 * Schedule: every 15 minutes via Railway cron or external scheduler
 * Auth: Bearer {CRON_SECRET}
 */
import { NextRequest, NextResponse } from "next/server";
import { crawlFeeds, rewriteWithAI, getStoryImage, getCatMeta } from "../../../lib/crawler";
import { insertArticle } from "../../../lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const secret = process.env.CRON_SECRET || "nrt-cron-2026";
  if (!auth.includes(secret)) {
    return NextResponse.json({ error:"Unauthorized" }, { status:401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || "";
  const results = { found:0, rewritten:0, validated:0, saved:0, errors:[] as string[] };

  try {
    // 1. Crawl feeds
    const raw = await crawlFeeds(10, 3);
    results.found = raw.length;

    for (const item of raw) {
      try {
        // 2. Rewrite with AI
        const rewritten = await rewriteWithAI(item, apiKey);
        if (!rewritten) { results.errors.push(`AI rewrite failed: ${item.title.slice(0,40)}`); continue; }
        results.rewritten++;

        // 3. Validate quality
        const validateRes = await fetch(new URL("/api/validate", req.url).toString(), {
          method:"POST",
          headers:{ "Content-Type":"application/json", "authorization":`Bearer ${secret}` },
          body: JSON.stringify({
            headline: rewritten.headline,
            snippet: rewritten.snippet,
            articleBody: rewritten.body,
            image: getStoryImage(rewritten.category),
            category: rewritten.category,
            confidence: rewritten.confidence,
          }),
        });
        const validation = await validateRes.json();
        if (!validation.passed) {
          results.errors.push(`Validation failed (${validation.score}): ${rewritten.headline.slice(0,40)}`);
          continue;
        }
        results.validated++;

        // 4. Save to DB
        const meta = getCatMeta(rewritten.category);
        const id = await insertArticle({
          category: rewritten.category,
          category_slug: rewritten.category,
          headline: rewritten.headline,
          snippet: rewritten.snippet,
          body: rewritten.body,
          emoji: meta.emoji,
          ph_class: meta.ph,
          confidence: rewritten.confidence,
          source_url: item.link,
          image_url: item.imageUrl || getStoryImage(rewritten.category),
          is_breaking: rewritten.category === "investigation" || item.source === "Premium Times",
        });

        if (id) results.saved++;
      } catch (err: unknown) {
        results.errors.push(err instanceof Error ? err.message : "unknown error");
      }
    }
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Crawl failed", ...results }, { status:500 });
  }

  return NextResponse.json({
    success: true, ...results,
    crawledAt: new Date().toISOString(),
    nextCrawl: new Date(Date.now() + 15*60*1000).toISOString(),
  });
}

export async function GET() {
  return NextResponse.json({
    status:"NRT Crawl Agent ready",
    feeds: 10,
    schedule:"Every 15 minutes",
    endpoint:"POST /api/crawl",
    auth:"Bearer {CRON_SECRET}",
  });
}
