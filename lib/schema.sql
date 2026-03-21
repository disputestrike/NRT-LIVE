-- NRT Database Schema
-- Run this on Railway PostgreSQL to initialize

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS articles (
  id VARCHAR(64) PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  category_slug VARCHAR(50) NOT NULL,
  headline TEXT NOT NULL,
  snippet TEXT,
  body TEXT,
  emoji VARCHAR(10) DEFAULT '📰',
  ph_class VARCHAR(20) DEFAULT 'ph-pol',
  confidence VARCHAR(20) DEFAULT 'Developing',
  source_url TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_breaking BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  related_ids JSONB DEFAULT '[]',
  view_count INTEGER DEFAULT 0,
  crawl_source VARCHAR(100) DEFAULT 'manual'
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(category_slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_breaking ON articles(is_breaking) WHERE is_breaking = TRUE;

CREATE TABLE IF NOT EXISTS crawl_log (
  id SERIAL PRIMARY KEY,
  source VARCHAR(200),
  articles_found INTEGER DEFAULT 0,
  articles_saved INTEGER DEFAULT 0,
  crawled_at TIMESTAMPTZ DEFAULT NOW(),
  error TEXT
);

CREATE TABLE IF NOT EXISTS ticker_items (
  id SERIAL PRIMARY KEY,
  label VARCHAR(30),
  text TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leaks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  category VARCHAR(100),
  content TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial ticker items
INSERT INTO ticker_items (label, text) VALUES
  ('BREAKING', 'Senate passes Digital Media Regulation Act 67–42 amid nationwide protests'),
  ('ECONOMY',  'Naira falls to ₦1,420/USD — CBN emergency MPC session underway'),
  ('SPORTS',   'Super Eagles squad named — Osimhen fit for AFCON qualifiers'),
  ('MARKETS',  'Bitcoin ▲ $84,210 · DANGCEM ▲ ₦1,042 · Crude Oil ▲ $74.40'),
  ('LAGOS',    'Governor signs landmark transport reform — BRT expansion confirmed')
ON CONFLICT DO NOTHING;
