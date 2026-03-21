import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 60;

const DEFAULT_ITEMS = [
  { label: "BREAKING", text: "Senate passes Digital Media Regulation Act 67–42 amid nationwide protests" },
  { label: "ECONOMY",  text: "Naira falls to ₦1,420/USD — CBN emergency MPC session underway" },
  { label: "SPORTS",   text: "Super Eagles squad named — Osimhen fit for AFCON qualifiers" },
  { label: "MARKETS",  text: "Bitcoin ▲ $84,210 · DANGCEM ▲ ₦1,042 · Crude Oil ▲ $74.40" },
  { label: "LAGOS",    text: "Governor signs landmark transport reform — BRT expansion confirmed" },
  { label: "EPL",      text: "Arsenal 1–2 Man City (FT) — Haaland brace ends 7-match winning run" },
];

export async function GET() {
  // In production: query ticker_items table from DB
  return NextResponse.json({ items: DEFAULT_ITEMS });
}
