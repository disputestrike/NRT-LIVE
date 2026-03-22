import { NextRequest, NextResponse } from "next/server";
import { getArticles } from "../../../lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug   = searchParams.get("category") || undefined;
  const limit  = Math.min(Number(searchParams.get("limit") || "12"), 50);
  const offset = Number(searchParams.get("offset") || "0");

  try {
    const articles = await getArticles({ slug, limit, offset });
    const isFromDB = articles.length > 0 && articles[0].id && !isNaN(Number(articles[0].id));
    return NextResponse.json({
      articles,
      source: isFromDB ? "db" : "static",
      count:  articles.length,
      ts:     new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json({ articles:[], source:"error", error:String(e) }, { status:500 });
  }
}
