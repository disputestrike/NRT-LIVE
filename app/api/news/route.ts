/**
 * GET /api/news — live articles from DB with fallback to static
 * Used by dynamic sections of the homepage to stay fresh
 */
import { NextRequest, NextResponse } from "next/server";
import { getArticles } from "../../../lib/db";
import { STORIES } from "../../data/stories";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug   = searchParams.get("category") || undefined;
  const limit  = Math.min(Number(searchParams.get("limit")  || "20"), 50);
  const offset = Number(searchParams.get("offset") || "0");

  try {
    const articles = await getArticles({ slug, limit, offset });

    // If we have live DB articles, return them
    if (articles.length > 0) {
      return NextResponse.json({ articles, source:"db", total:articles.length });
    }
  } catch { /* fall through */ }

  // Fallback: return static stories filtered by slug
  const fallback = slug
    ? STORIES.filter(s => s.categorySlug === slug)
    : STORIES;

  return NextResponse.json({
    articles: fallback.slice(offset, offset+limit).map(s => ({
      id: s.id, category: s.category, category_slug: s.categorySlug,
      headline: s.headline, snippet: s.snippet, body: s.body,
      image_url: s.image, confidence: s.confidence,
      published_at: new Date().toISOString(), is_breaking: false,
    })),
    source: "static",
    total: fallback.length,
    note: "Static fallback — connect DB for live content",
  });
}
