/**
 * NRT Database Layer — Railway PostgreSQL
 * Uses DATABASE_URL (private) with SSL
 */
import { STORIES } from "../app/data/stories";
import type { Pool as PgPool } from "pg";

let pool: PgPool | null = null;
let schemaChecked = false;

async function getPool(): Promise<PgPool | null> {
  if (pool) return pool;

  const connStr =
    process.env.DATABASE_URL ||
    `postgresql://postgres:bZZzdWYwtivcafnEEnbTvJhnymORwiOU@${process.env.RAILWAY_PRIVATE_DOMAIN || "localhost"}:5432/railway`;

  try {
    const { Pool } = await import("pg");
    pool = new Pool({
      connectionString: connStr,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 8000,
    });
    await pool.query("SELECT 1"); // test connection
    await ensureSchema(pool);
    return pool;
  } catch (e) {
    console.error("[NRT DB] Connection failed:", e);
    pool = null;
    return null;
  }
}

async function ensureSchema(db: PgPool) {
  if (schemaChecked) return;
  try {
    // Check what columns articles table actually has
    const cols = await db.query(
      `SELECT column_name FROM information_schema.columns
       WHERE table_schema='public' AND table_name='articles'`
    );
    const colNames = cols.rows.map((r: {column_name: string}) => r.column_name);

    if (colNames.length === 0) {
      // Table doesn't exist — create it
      await db.query(`
        CREATE TABLE IF NOT EXISTS articles (
          id            BIGSERIAL PRIMARY KEY,
          category      VARCHAR(100) NOT NULL DEFAULT 'nigeria',
          category_slug VARCHAR(50)  NOT NULL DEFAULT 'nigeria',
          headline      TEXT NOT NULL,
          snippet       TEXT DEFAULT '',
          body          TEXT DEFAULT '',
          confidence    VARCHAR(20)  DEFAULT 'Verified',
          source_url    TEXT DEFAULT '',
          image_url     TEXT DEFAULT '',
          published_at  TIMESTAMPTZ  DEFAULT NOW(),
          is_breaking   BOOLEAN DEFAULT FALSE
        );
        CREATE INDEX IF NOT EXISTS idx_art_slug ON articles(category_slug);
        CREATE INDEX IF NOT EXISTS idx_art_pub  ON articles(published_at DESC);
      `);
      console.log("[NRT DB] Created articles table");
    } else {
      console.log("[NRT DB] Articles table exists, columns:", colNames.join(", "));
    }
    schemaChecked = true;
  } catch (e) {
    console.error("[NRT DB] Schema check failed:", e);
  }
}

export type Article = {
  id: string;
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
};

export async function getArticles(opts: {
  slug?: string; limit?: number; offset?: number;
} = {}): Promise<Article[]> {
  const db = await getPool();
  if (!db) return getFallback(opts);

  try {
    const limit  = Math.min(opts.limit  || 20, 50);
    const offset = opts.offset || 0;

    let q: string;
    let params: unknown[];

    if (opts.slug) {
      q = `SELECT * FROM articles WHERE category_slug=$1
           ORDER BY published_at DESC LIMIT $2 OFFSET $3`;
      params = [opts.slug, limit, offset];
    } else {
      q = `SELECT * FROM articles ORDER BY published_at DESC LIMIT $1 OFFSET $2`;
      params = [limit, offset];
    }

    const res = await db.query(q, params);
    return res.rows.length > 0
      ? res.rows.map(normalizeRow)
      : getFallback(opts);
  } catch (e) {
    console.error("[NRT DB] getArticles:", e);
    return getFallback(opts);
  }
}

export async function insertArticle(a: Partial<Article>): Promise<string | null> {
  const db = await getPool();
  if (!db) {
    console.error("[NRT DB] insertArticle: no DB connection");
    return null;
  }
  try {
    const res = await db.query(
      `INSERT INTO articles
         (category, category_slug, headline, snippet, body,
          confidence, source_url, image_url, is_breaking, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW())
       RETURNING id`,
      [
        a.category     || "nigeria",
        a.category_slug || a.category || "nigeria",
        a.headline     || "",
        a.snippet      || "",
        a.body         || "",
        a.confidence   || "Verified",
        a.source_url   || "",
        a.image_url    || "",
        a.is_breaking  || false,
      ]
    );
    return String(res.rows[0]?.id);
  } catch (e) {
    console.error("[NRT DB] insertArticle:", e);
    return null;
  }
}

export async function getDbStatus(): Promise<{
  connected: boolean; tables: string[]; articleCount: number; error?: string;
}> {
  const db = await getPool();
  if (!db) return { connected:false, tables:[], articleCount:0, error:"No DB connection" };
  try {
    const tables = await db.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name`
    );
    let count = 0;
    try {
      const c = await db.query("SELECT COUNT(*) FROM articles");
      count = parseInt(c.rows[0].count);
    } catch {}
    return {
      connected: true,
      tables: tables.rows.map((r: {table_name: string}) => r.table_name),
      articleCount: count,
    };
  } catch (e) {
    return { connected:false, tables:[], articleCount:0, error:String(e) };
  }
}

export async function getTableColumns(tableName: string): Promise<string[]> {
  const db = await getPool();
  if (!db) return [];
  try {
    const res = await db.query(
      `SELECT column_name, data_type FROM information_schema.columns
       WHERE table_schema='public' AND table_name=$1 ORDER BY ordinal_position`,
      [tableName]
    );
    return res.rows.map((r: {column_name:string; data_type:string}) => `${r.column_name}:${r.data_type}`);
  } catch { return []; }
}

export async function addSubscriber(email: string): Promise<boolean> {
  const db = await getPool();
  if (!db) return false;
  try {
    await db.query(
      `INSERT INTO newsletter_subscribers (email, subscribed_at)
       VALUES ($1, NOW()) ON CONFLICT (email) DO NOTHING`,
      [email]
    );
    return true;
  } catch (e) {
    console.error("[NRT DB] addSubscriber:", e);
    return false;
  }
}

export async function submitLeak(data: {
  name?: string; category?: string; content: string;
}): Promise<boolean> {
  const db = await getPool();
  if (!db) return false;
  try {
    await db.query(
      `INSERT INTO leak_submissions (name, category, content, submitted_at)
       VALUES ($1,$2,$3,NOW())`,
      [data.name || "Anonymous", data.category || "Other", data.content]
    );
    return true;
  } catch (e) {
    console.error("[NRT DB] submitLeak:", e);
    return false;
  }
}

function normalizeRow(row: Record<string, unknown>): Article {
  return {
    id:           String(row.id),
    category:     String(row.category     || "nigeria"),
    category_slug:String(row.category_slug || "nigeria"),
    headline:     String(row.headline     || row.title || ""),
    snippet:      String(row.snippet      || row.summary || row.excerpt || ""),
    body:         String(row.body         || row.content || ""),
    confidence:   String(row.confidence   || "Verified"),
    source_url:   String(row.source_url   || ""),
    image_url:    String(row.image_url    || row.thumbnail || row.featured_image || ""),
    published_at: String(row.published_at || row.created_at || new Date().toISOString()),
    is_breaking:  Boolean(row.is_breaking || row.breaking),
  };
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
