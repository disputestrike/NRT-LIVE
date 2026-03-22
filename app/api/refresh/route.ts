/**
 * GET /api/refresh — polled by frontend every 60s
 * Returns: latest top story, ticker items, crawl status
 * In production: reads from DB. Falls back to curated static when DB unavailable.
 */
import { NextResponse } from "next/server";
import { getArticles } from "../../../lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const now = new Date();

  try {
    // Try to get latest from DB
    const latest = await getArticles({ limit:6 });

    if (latest.length > 0) {
      const top = latest[0];
      return NextResponse.json({
        source: "live",
        timestamp: now.toISOString(),
        topStory: {
          headline: top.headline,
          category: top.category,
          ago: formatAgo(new Date(top.published_at)),
          id: top.id,
        },
        ticker: latest.slice(0,6).map(a => ({
          label: a.category.toUpperCase().slice(0,12),
          text: a.headline,
        })),
        latestCount: latest.length,
        crawlSchedule: {
          intervalMinutes: 15,
          nextCrawl: new Date(now.getTime() + 15*60*1000).toISOString(),
          status: "active",
          feeds: 10,
        },
      });
    }
  } catch { /* fall through to static */ }

  // Fallback static rotation (used until DB is connected)
  const rotations = [
    { label:"BREAKING", text:"Senate passes Digital Media Regulation Act 67–42 amid protests" },
    { label:"ECONOMY",  text:"CBN raises benchmark rate to 27.5% — third hike this year" },
    { label:"SPORTS",   text:"Super Eagles squad named — Osimhen confirmed fit for qualifiers" },
    { label:"MARKETS",  text:"Bitcoin ▲ $84,210 · DANGCEM ▲ ₦1,042 · Crude ▲ $74.40" },
    { label:"NIGERIA",  text:"Lagos fuel scarcity Day 3 — NNPC promises 72hr resolution" },
    { label:"AFRICA",   text:"Tyla wins two Grammys — first African to achieve the feat" },
  ];
  const idx = Math.floor(now.getMinutes() / 10) % rotations.length;

  return NextResponse.json({
    source: "static",
    timestamp: now.toISOString(),
    topStory: { headline: rotations[idx].text, category: rotations[idx].label, ago:"Just now" },
    ticker: rotations,
    crawlSchedule: {
      intervalMinutes: 15,
      nextCrawl: new Date(now.getTime() + 15*60*1000).toISOString(),
      status: "pending_db",
      feeds: 10,
      note: "Connect DATABASE_URL and ANTHROPIC_API_KEY to activate live crawling",
    },
  });
}

function formatAgo(date: Date): string {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min${mins===1?"":"s"} ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs} hr${hrs===1?"":"s"} ago`;
}
