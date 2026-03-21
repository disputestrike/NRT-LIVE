import { NextRequest, NextResponse } from "next/server";
import { getArticles } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const secret = process.env.ADMIN_SECRET || "nrt-admin-2026";
  if (!auth.includes(secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const articles = await getArticles({ limit: 50 });
  return NextResponse.json({
    stats: { total_articles: articles.length, live: true },
    recent: articles.slice(0, 10),
  });
}
