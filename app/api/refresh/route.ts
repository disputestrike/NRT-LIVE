import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const now = new Date();
  const mins = now.getMinutes();
  const rotations = [
    { headline:"Senate Passes Sweeping Media Bill Amid Press Freedom Outcry", cat:"Politics", ago:"2 mins ago" },
    { headline:"CBN Raises Benchmark Rate to 27.5% — Third Consecutive Hike", cat:"Economy", ago:"Just now" },
    { headline:"Super Eagles Named for AFCON Qualifiers — Osimhen Confirmed Fit", cat:"Sports", ago:"4 mins ago" },
    { headline:"Naira Recovers to ₦1,388 After CBN Forex Market Intervention", cat:"Economy", ago:"1 min ago" },
    { headline:"EFCC Arraigns 12 Bank Officials in ₦4.7B Forex Fraud Case", cat:"Investigation", ago:"3 mins ago" },
    { headline:"Tyla's Grammy Double Makes History Across Africa", cat:"Entertainment", ago:"Just now" },
  ];
  const current = rotations[mins % rotations.length];
  return NextResponse.json({
    timestamp: now.toISOString(),
    topStory: current,
    ticker: [
      { label:"BREAKING", text:current.headline },
      { label:"ECONOMY", text:"Naira at ₦1,420/USD · CBN emergency session underway" },
      { label:"SPORTS", text:"Super Eagles squad named — Osimhen confirmed fit" },
      { label:"MARKETS", text:"Bitcoin $84,210 ▲ · DANGCEM ₦1,042 ▲ · Crude $74.40 ▲" },
      { label:"NIGERIA", text:"Lagos fuel scarcity Day 3 — NNPC promises 72hr resolution" },
      { label:"AFRICA", text:"Tyla wins two Grammys — first African artist in history" },
    ],
    crawlSchedule: {
      nextCrawl: new Date(now.getTime() + 15*60*1000).toISOString(),
      intervalMinutes: 15,
      feeds: 9,
      status:"active"
    }
  });
}
