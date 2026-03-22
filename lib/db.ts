import { STORIES } from "../app/data/stories";
import type { Pool as PgPool } from "pg";

let pool: PgPool | null = null;
let schemaReady = false;

async function getPool(): Promise<PgPool | null> {
  if (pool) return pool;
  if (!process.env.DATABASE_URL) return null;
  try {
    const { Pool } = await import("pg");
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30000,
    });
    await ensureSchema(pool);
    return pool;
  } catch (e) {
    console.error("DB connection failed:", e);
    return null;
  }
}

// Auto-create tables — no manual schema.sql needed
async function ensureSchema(db: PgPool) {
  if (schemaReady) return;
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id              VARCHAR(64) PRIMARY KEY,
        category        VARCHAR(100) NOT NULL DEFAULT 'nigeria',
        category_slug   VARCHAR(50)  NOT NULL DEFAULT 'nigeria',
        headline        TEXT NOT NULL,
        snippet         TEXT DEFAULT '',
        body            TEXT DEFAULT '',
        confidence      VARCHAR(20)  DEFAULT 'Verified',
        source_url      TEXT DEFAULT '',
        image_url       TEXT DEFAULT '',
        published_at    TIMESTAMPTZ  DEFAULT NOW(),
        is_breaking     BOOLEAN DEFAULT FALSE
      );
      CREATE INDEX IF NOT EXISTS idx_art_slug ON articles(category_slug);
      CREATE INDEX IF NOT EXISTS idx_art_pub  ON articles(published_at DESC);
    `);
    schemaReady = true;
  } catch (e) {
    console.error("Schema creation failed:", e);
  }
}

export type Article = {
  id: string; category: string; category_slug: string;
  headline: string; snippet: string; body: string;
  confidence: string; source_url: string; image_url: string;
  published_at: string; is_breaking: boolean;
};

export async function getArticles(opts: { slug?: string; limit?: number; offset?: number } = {}): Promise<Article[]> {
  const db = await getPool();
  if (!db) return getFallback(opts);
  try {
    const limit = opts.limit || 20;
    const offset = opts.offset || 0;
    const q = opts.slug
      ? `SELECT * FROM articles WHERE category_slug=$1 ORDER BY published_at DESC LIMIT $2 OFFSET $3`
      : `SELECT * FROM articles ORDER BY published_at DESC LIMIT $1 OFFSET $2`;
    const params = opts.slug ? [opts.slug, limit, offset] : [limit, offset];
    const res = await db.query(q, params);
    return res.rows.length > 0 ? res.rows : getFallback(opts);
  } catch (e) {
    console.error("getArticles error:", e);
    return getFallback(opts);
  }
}

export async function insertArticle(a: Partial<Article>): Promise<string | null> {
  const db = await getPool();
  if (!db) return null;
  try {
    const id = `art_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    await db.query(
      `INSERT INTO articles (id,category,category_slug,headline,snippet,body,confidence,source_url,image_url,is_breaking)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       ON CONFLICT (id) DO NOTHING`,
      [id, a.category||"nigeria", a.category_slug||a.category||"nigeria",
       a.headline, a.snippet||"", a.body||"",
       a.confidence||"Verified", a.source_url||"", a.image_url||"", a.is_breaking||false]
    );
    return id;
  } catch (e) {
    console.error("insertArticle error:", e);
    return null;
  }
}

function getFallback(opts: { slug?: string; limit?: number }): Article[] {
  let src = STORIES;
  if (opts.slug) src = STORIES.filter(s => s.categorySlug === opts.slug);
  return src.slice(0, opts.limit || 20).map(s => ({
    id: s.id, category: s.category, category_slug: s.categorySlug,
    headline: s.headline, snippet: s.snippet, body: s.body,
    confidence: s.confidence, source_url: "", image_url: s.image,
    published_at: new Date().toISOString(), is_breaking: false,
  }));
}
