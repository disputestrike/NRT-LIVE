// GET /api/news — returns live articles (DB or fallback)
import { NextRequest, NextResponse } from "next/server";
import { getArticles } from "../../../lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("category") || undefined;
  const limit = Number(searchParams.get("limit") || "20");
  const offset = Number(searchParams.get("offset") || "0");

  try {
    const articles = await getArticles({ slug, limit, offset });
    return NextResponse.json({ articles, total: articles.length, cached: false });
  } catch {
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
