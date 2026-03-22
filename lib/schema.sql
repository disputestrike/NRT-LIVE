-- NRT Database Schema — Run on Railway PostgreSQL
-- psql $DATABASE_URL < lib/schema.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Main articles table
CREATE TABLE IF NOT EXISTS articles (
  id              VARCHAR(64) PRIMARY KEY DEFAULT concat('art_', extract(epoch from now())::bigint::text, '_', substr(md5(random()::text),1,5)),
  category        VARCHAR(100) NOT NULL,
  category_slug   VARCHAR(50)  NOT NULL,
  headline        TEXT NOT NULL,
  snippet         TEXT,
  body            TEXT,
  emoji           VARCHAR(10)  DEFAULT '📰',
  ph_class        VARCHAR(20)  DEFAULT 'ph-pol',
  confidence      VARCHAR(20)  DEFAULT 'Developing',
  source_url      TEXT         DEFAULT '',
  image_url       TEXT         DEFAULT '',
  published_at    TIMESTAMPTZ  DEFAULT NOW(),
  updated_at      TIMESTAMPTZ  DEFAULT NOW(),
  is_breaking     BOOLEAN      DEFAULT FALSE,
  is_published    BOOLEAN      DEFAULT TRUE,
  related_ids     JSONB        DEFAULT '[]',
  view_count      INTEGER      DEFAULT 0,
  crawl_source    VARCHAR(100) DEFAULT 'manual',
  validation_score INTEGER     DEFAULT 100
);

CREATE INDEX IF NOT EXISTS idx_articles_slug        ON articles(category_slug);
CREATE INDEX IF NOT EXISTS idx_articles_published   ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_breaking    ON articles(is_breaking) WHERE is_breaking = TRUE;
CREATE INDEX IF NOT EXISTS idx_articles_published_f ON articles(published_at DESC) WHERE is_published = TRUE;

-- Crawl audit log
CREATE TABLE IF NOT EXISTS crawl_log (
  id              SERIAL PRIMARY KEY,
  source          VARCHAR(200),
  articles_found  INTEGER DEFAULT 0,
  articles_saved  INTEGER DEFAULT 0,
  validation_pass INTEGER DEFAULT 0,
  validation_fail INTEGER DEFAULT 0,
  crawled_at      TIMESTAMPTZ DEFAULT NOW(),
  duration_ms     INTEGER,
  error           TEXT
);

-- Ticker items (editable from admin)
CREATE TABLE IF NOT EXISTS ticker_items (
  id         SERIAL PRIMARY KEY,
  label      VARCHAR(30),
  text       TEXT,
  active     BOOLEAN DEFAULT TRUE,
  priority   INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leak submissions
CREATE TABLE IF NOT EXISTS leaks (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(200),
  category     VARCHAR(100),
  content      TEXT,
  status       VARCHAR(20) DEFAULT 'pending',
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default ticker items
INSERT INTO ticker_items (label, text, priority) VALUES
  ('BREAKING', 'NRT is live — Nigeria Real Time, the nation''s first AI-native 24/7 news network', 10),
  ('ECONOMY',  'CBN raises benchmark rate to 27.5% — third hike this year', 8),
  ('SPORTS',   'Super Eagles squad named — Osimhen confirmed fit for AFCON qualifiers', 8),
  ('MARKETS',  'Bitcoin ▲ $84,210 · DANGCEM ▲ ₦1,042 · Crude Oil ▲ $74.40', 7),
  ('NIGERIA',  'Lagos fuel scarcity — NNPC promises 72-hour resolution', 6),
  ('AFRICA',   'Tyla wins two Grammys — first African artist to achieve the feat', 6)
ON CONFLICT DO NOTHING;

-- Update trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
