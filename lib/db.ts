// Database layer — PostgreSQL via Railway
// Falls back to in-memory store for dev/demo
import { STORIES } from "../app/data/stories";

import type { Pool as PgPool } from "pg";
let pool: PgPool | null = null;

async function getPool() {
  if (pool) return pool;
  if (!process.env.DATABASE_URL) return null;
  try {
    const { Pool } = await import("pg");
    pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
    return pool;
  } catch { return null; }
}

export type Article = {
  id: string;
  category: string;
  category_slug: string;
  headline: string;
  snippet: string;
  body: string;
  emoji: string;
  ph_class: string;
  confidence: string;
  source_url: string;
  image_url: string;
  published_at: string;
  is_breaking: boolean;
  related_ids: string[];
};

export async function getArticles(opts: { slug?: string; limit?: number; offset?: number } = {}): Promise<Article[]> {
  const db = await getPool();
  if (!db) return getFallbackArticles(opts);
  try {
    const slug = opts.slug;
    const limit = opts.limit || 20;
    const offset = opts.offset || 0;
    const q = slug
      ? `SELECT * FROM articles WHERE category_slug = $1 ORDER BY published_at DESC LIMIT $2 OFFSET $3`
      : `SELECT * FROM articles ORDER BY published_at DESC LIMIT $1 OFFSET $2`;
    const params = slug ? [slug, limit, offset] : [limit, offset];
    const res = await db.query(q, params);
    return res.rows;
  } catch { return getFallbackArticles(opts); }
}

export async function getArticleById(id: string): Promise<Article | null> {
  const db = await getPool();
  if (!db) return getFallbackById(id);
  try {
    const res = await db.query("SELECT * FROM articles WHERE id = $1", [id]);
    return res.rows[0] || null;
  } catch { return getFallbackById(id); }
}

export async function insertArticle(a: Partial<Article>): Promise<string | null> {
  const db = await getPool();
  if (!db) return null;
  try {
    const id = `art_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
    await db.query(`
      INSERT INTO articles (id,category,category_slug,headline,snippet,body,emoji,ph_class,confidence,source_url,image_url,published_at,is_breaking,related_ids)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW(),$12,$13)
      ON CONFLICT (id) DO NOTHING
    `, [id, a.category, a.category_slug, a.headline, a.snippet, a.body, a.emoji||"📰", a.ph_class||"ph-pol", a.confidence||"Developing", a.source_url||"", a.image_url||"", a.is_breaking||false, JSON.stringify(a.related_ids||[])]);
    return id;
  } catch(e) { console.error(e); return null; }
}

// Fallback to static data when no DB
function getFallbackArticles(opts: { slug?: string; limit?: number }): Article[] {
  let src = STORIES;
  if (opts.slug) src = STORIES.filter(s => s.categorySlug === opts.slug);
  return src.slice(0, opts.limit || 20).map(storyToArticle);
}
function getFallbackById(id: string): Article | null {
  const s = STORIES.find(s => s.id === id);
  return s ? storyToArticle(s) : null;
}
function storyToArticle(s: { id:string; category:string; categorySlug:string; headline:string; snippet:string; body:string; emoji?:string; phClass?:string; confidence:string; related?:string[] }): Article {
  return {
    id: s.id, category: s.category, category_slug: s.categorySlug,
    headline: s.headline, snippet: s.snippet, body: s.body,
    emoji: s.emoji || "📰", ph_class: s.phClass || "ph-pol", confidence: s.confidence,
    source_url: "", image_url: "", published_at: new Date().toISOString(),
    is_breaking: false, related_ids: s.related || []
  };
}
