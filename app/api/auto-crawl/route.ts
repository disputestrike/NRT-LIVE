/**
 * GET /api/auto-crawl — called on every page load
 * Triggers crawl if articles are stale or missing
 */
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

let lastCrawl = 0;
const INTERVAL = 15 * 60 * 1000; // 15 min

export async function GET(req: Request) {
  const now = Date.now();
  let count = 0;
  try {
    const { getDbStatus } = await import("../../../lib/db");
    const s = await getDbStatus();
    count = s.articleCount;
  } catch {}

  const stale = count === 0 || (now - lastCrawl) > INTERVAL;

  if (stale) {
    lastCrawl = now;
    const origin = new URL(req.url).origin;
    // Fire and forget — non-blocking
    fetch(`${origin}/api/crawl`, {
      method: "POST",
      headers: { "Authorization": "Bearer nrt-cron-2026" },
    }).catch(() => {});
  }

  return NextResponse.json({ count, stale, triggered: stale });
}
