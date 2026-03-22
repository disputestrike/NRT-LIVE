/**
 * NRT Database Layer
 * Connects to all 11 tables created in Railway PostgreSQL:
 * users, categories, articles, media, tags, article_tags,
 * newsletter_subscribers, leak_submissions, ad_placements,
 * site_settings, (articles fallback from static)
 */
import { STORIES } from "../app/data/stories";
import type { Pool as PgPool } from "pg";

let pool: PgPool | null = null;

async function getPool(): Promise<PgPool | null> {
  if (pool) return pool;
  if (!process.env.DATABASE_URL) return null;
  try {
    const { Pool } = await import("pg");
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
    // Test connection
    await pool.query("SELECT 1");
    return pool;
  } catch (e) {
    console.error("[NRT DB] Connection failed:", e);
    pool = null;
    return null;
  }
}

/* ── TYPES matching your exact tables ─────────────────────────── */

export type Article = {
  id: string | number;
  category: string;
  category_slug: string;
  headline: string;
  snippet: string;
  body: string;
  confidence: string;
  source_url: string;
  image_url: string;
  published_at: string;
  is_breaking: boolean;
  author_id?: number;
  status?: string;
  views?: number;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  color?: string;
  description?: string;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
};

export type SiteSettings = {
  key: string;
  value: string;
};

export type LeakSubmission = {
  name?: string;
  category?: string;
  content: string;
  email?: string;
};

export type NewsletterSubscriber = {
  email: string;
};

export type AdPlacement = {
  id: number;
  position: string;
  content: string;
  link?: string;
  active: boolean;
};

/* ── ARTICLES ──────────────────────────────────────────────────── */

export async function getArticles(opts: {
  slug?: string; limit?: number; offset?: number; breaking?: boolean;
} = {}): Promise<Article[]> {
  const db = await getPool();
  if (!db) return getFallback(opts);
  try {
    const limit  = opts.limit  || 20;
    const offset = opts.offset || 0;

    let q: string;
    let params: unknown[];

    if (opts.breaking) {
      q = `SELECT a.*, c.slug as category_slug, c.name as category
           FROM articles a
           LEFT JOIN categories c ON a.category_id = c.id
           WHERE a.is_breaking = true AND a.status = 'published'
           ORDER BY a.published_at DESC LIMIT $1`;
      params = [limit];
    } else if (opts.slug) {
      q = `SELECT a.*, c.slug as category_slug, c.name as category
           FROM articles a
           LEFT JOIN categories c ON a.category_id = c.id
           WHERE c.slug = $1 AND a.status = 'published'
           ORDER BY a.published_at DESC LIMIT $2 OFFSET $3`;
      params = [opts.slug, limit, offset];
    } else {
      q = `SELECT a.*, c.slug as category_slug, c.name as category
           FROM articles a
           LEFT JOIN categories c ON a.category_id = c.id
           WHERE a.status = 'published'
           ORDER BY a.published_at DESC LIMIT $1 OFFSET $2`;
      params = [limit, offset];
    }

    const res = await db.query(q, params);

    // Map DB rows to Article type, handle varying column names
    const rows = res.rows.map(normalizeArticle);
    return rows.length > 0 ? rows : getFallback(opts);
  } catch (e) {
    console.error("[NRT DB] getArticles error:", e);
    return getFallback(opts);
  }
}

export async function getArticleById(id: string | number): Promise<Article | null> {
  const db = await getPool();
  if (!db) return null;
  try {
    const res = await db.query(
      `SELECT a.*, c.slug as category_slug, c.name as category
       FROM articles a
       LEFT JOIN categories c ON a.category_id = c.id
       WHERE a.id = $1`,
      [id]
    );
    return res.rows[0] ? normalizeArticle(res.rows[0]) : null;
  } catch (e) {
    console.error("[NRT DB] getArticleById error:", e);
    return null;
  }
}

export async function insertArticle(a: Partial<Article> & { category_id?: number }): Promise<string | null> {
  const db = await getPool();
  if (!db) return null;
  try {
    // Try to find category_id from categories table if not provided
    let catId = a.category_id;
    if (!catId && a.category_slug) {
      const catRes = await db.query(
        `SELECT id FROM categories WHERE slug = $1 LIMIT 1`,
        [a.category_slug]
      );
      catId = catRes.rows[0]?.id;
    }

    // Try inserting with JOIN-based schema first
    const res = await db.query(
      `INSERT INTO articles (
        category_id, headline, snippet, body,
        source_url, image_url, is_breaking, status, published_at
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,'published',NOW())
      RETURNING id`,
      [
        catId || null,
        a.headline, a.snippet || "", a.body || "",
        a.source_url || "", a.image_url || "",
        a.is_breaking || false,
      ]
    );
    return String(res.rows[0]?.id);
  } catch {
    // Fallback: try simpler schema (category as text column)
    try {
      const res = await db.query(
        `INSERT INTO articles (
          category, category_slug, headline, snippet, body,
          source_url, image_url, is_breaking, published_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW())
        RETURNING id`,
        [
          a.category || "nigeria",
          a.category_slug || a.category || "nigeria",
          a.headline, a.snippet || "", a.body || "",
          a.source_url || "", a.image_url || "",
          a.is_breaking || false,
        ]
      );
      return String(res.rows[0]?.id);
    } catch (e2) {
      console.error("[NRT DB] insertArticle error:", e2);
      return null;
    }
  }
}

/* ── CATEGORIES ────────────────────────────────────────────────── */

export async function getCategories(): Promise<Category[]> {
  const db = await getPool();
  if (!db) return [];
  try {
    const res = await db.query(`SELECT * FROM categories ORDER BY name ASC`);
    return res.rows;
  } catch (e) {
    console.error("[NRT DB] getCategories error:", e);
    return [];
  }
}

/* ── TAGS ──────────────────────────────────────────────────────── */

export async function getTrendingTags(limit = 10): Promise<Tag[]> {
  const db = await getPool();
  if (!db) return [];
  try {
    const res = await db.query(
      `SELECT t.*, COUNT(at.article_id) as article_count
       FROM tags t
       LEFT JOIN article_tags at ON t.id = at.tag_id
       GROUP BY t.id
       ORDER BY article_count DESC
       LIMIT $1`,
      [limit]
    );
    return res.rows;
  } catch (e) {
    console.error("[NRT DB] getTrendingTags error:", e);
    return [];
  }
}

/* ── SITE SETTINGS ─────────────────────────────────────────────── */

export async function getSetting(key: string): Promise<string | null> {
  const db = await getPool();
  if (!db) return null;
  try {
    const res = await db.query(
      `SELECT value FROM site_settings WHERE key = $1 LIMIT 1`,
      [key]
    );
    return res.rows[0]?.value || null;
  } catch (e) {
    console.error("[NRT DB] getSetting error:", e);
    return null;
  }
}

export async function setSetting(key: string, value: string): Promise<void> {
  const db = await getPool();
  if (!db) return;
  try {
    await db.query(
      `INSERT INTO site_settings (key, value) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = $2`,
      [key, value]
    );
  } catch (e) {
    console.error("[NRT DB] setSetting error:", e);
  }
}

/* ── NEWSLETTER ────────────────────────────────────────────────── */

export async function addSubscriber(email: string): Promise<boolean> {
  const db = await getPool();
  if (!db) return false;
  try {
    await db.query(
      `INSERT INTO newsletter_subscribers (email, subscribed_at)
       VALUES ($1, NOW())
       ON CONFLICT (email) DO NOTHING`,
      [email]
    );
    return true;
  } catch (e) {
    console.error("[NRT DB] addSubscriber error:", e);
    return false;
  }
}

/* ── LEAK SUBMISSIONS ──────────────────────────────────────────── */

export async function submitLeak(data: LeakSubmission): Promise<boolean> {
  const db = await getPool();
  if (!db) return false;
  try {
    await db.query(
      `INSERT INTO leak_submissions (name, category, content, submitted_at)
       VALUES ($1, $2, $3, NOW())`,
      [data.name || "Anonymous", data.category || "Other", data.content]
    );
    return true;
  } catch (e) {
    console.error("[NRT DB] submitLeak error:", e);
    return false;
  }
}

/* ── ADS ───────────────────────────────────────────────────────── */

export async function getAds(position?: string): Promise<AdPlacement[]> {
  const db = await getPool();
  if (!db) return [];
  try {
    const q = position
      ? `SELECT * FROM ad_placements WHERE position = $1 AND active = true ORDER BY id`
      : `SELECT * FROM ad_placements WHERE active = true ORDER BY id`;
    const res = await db.query(q, position ? [position] : []);
    return res.rows;
  } catch (e) {
    console.error("[NRT DB] getAds error:", e);
    return [];
  }
}

/* ── DB HEALTH CHECK ───────────────────────────────────────────── */

export async function getDbStatus(): Promise<{
  connected: boolean;
  tables: string[];
  articleCount: number;
  error?: string;
}> {
  const db = await getPool();
  if (!db) return { connected: false, tables: [], articleCount: 0, error: "No DATABASE_URL" };
  try {
    // Get all tables
    const tablesRes = await db.query(
      `SELECT table_name FROM information_schema.tables
       WHERE table_schema = 'public' ORDER BY table_name`
    );
    const tables = tablesRes.rows.map((r: { table_name: string }) => r.table_name);

    // Get article count
    let articleCount = 0;
    try {
      const countRes = await db.query(`SELECT COUNT(*) FROM articles`);
      articleCount = parseInt(countRes.rows[0].count);
    } catch { /* articles table may have different name */ }

    return { connected: true, tables, articleCount };
  } catch (e) {
    return { connected: false, tables: [], articleCount: 0, error: String(e) };
  }
}

/* ── INTROSPECT TABLE COLUMNS ──────────────────────────────────── */

export async function getTableColumns(tableName: string): Promise<string[]> {
  const db = await getPool();
  if (!db) return [];
  try {
    const res = await db.query(
      `SELECT column_name, data_type FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = $1
       ORDER BY ordinal_position`,
      [tableName]
    );
    return res.rows.map((r: { column_name: string; data_type: string }) => `${r.column_name} (${r.data_type})`);
  } catch { return []; }
}

/* ── NORMALIZE ARTICLE ROWS ────────────────────────────────────── */

function normalizeArticle(row: Record<string, unknown>): Article {
  return {
    id: String(row.id),
    category: String(row.category || row.category_name || "Nigeria"),
    category_slug: String(row.category_slug || row.slug || "nigeria"),
    headline: String(row.headline || row.title || ""),
    snippet: String(row.snippet || row.summary || row.excerpt || ""),
    body: String(row.body || row.content || ""),
    confidence: String(row.confidence || "Verified"),
    source_url: String(row.source_url || row.url || ""),
    image_url: String(row.image_url || row.thumbnail || row.featured_image || ""),
    published_at: String(row.published_at || row.created_at || new Date().toISOString()),
    is_breaking: Boolean(row.is_breaking || row.breaking),
    author_id: row.author_id as number,
    status: String(row.status || "published"),
    views: Number(row.views || row.view_count || 0),
  };
}

/* ── FALLBACK TO STATIC STORIES ────────────────────────────────── */

function getFallback(opts: { slug?: string; limit?: number }): Article[] {
  let src = STORIES;
  if (opts.slug) src = STORIES.filter(s => s.categorySlug === opts.slug);
  return src.slice(0, opts.limit || 20).map(s => ({
    id: s.id,
    category: s.category,
    category_slug: s.categorySlug,
    headline: s.headline,
    snippet: s.snippet,
    body: s.body,
    confidence: s.confidence,
    source_url: "",
    image_url: s.image,
    published_at: new Date().toISOString(),
    is_breaking: false,
  }));
}
