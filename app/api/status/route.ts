/**
 * GET /api/status — shows exactly what DB tables exist and their columns
 * Use this to verify your Railway DB is connected and see table structure
 */
import { NextResponse } from "next/server";
import { getDbStatus, getTableColumns } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = await getDbStatus();

  // Introspect all 11 expected tables
  const expectedTables = [
    "users","categories","articles","media","tags",
    "article_tags","newsletter_subscribers","leak_submissions",
    "ad_placements","site_settings"
  ];

  const tableDetails: Record<string, string[]> = {};
  if (status.connected) {
    for (const t of expectedTables) {
      if (status.tables.includes(t)) {
        tableDetails[t] = await getTableColumns(t);
      } else {
        tableDetails[t] = ["TABLE NOT FOUND"];
      }
    }
  }

  return NextResponse.json({
    connected: status.connected,
    error: status.error,
    articleCount: status.articleCount,
    tablesFound: status.tables,
    tableDetails,
    env: {
      DATABASE_URL: !!process.env.DATABASE_URL,
      ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
      CRON_SECRET: !!process.env.CRON_SECRET,
    },
    timestamp: new Date().toISOString(),
  });
}
