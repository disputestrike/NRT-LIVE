import { NextResponse } from "next/server";
import { getDbStatus, getTableColumns } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await getDbStatus();

  const tableDetails: Record<string, string[]> = {};
  for (const t of db.tables) {
    tableDetails[t] = await getTableColumns(t);
  }

  return NextResponse.json({
    database: {
      connected:    db.connected,
      articleCount: db.articleCount,
      tables:       db.tables,
      tableDetails,
      error:        db.error,
    },
    cerebras: {
      keys: [
        !!process.env.CEREBRAS_API_KEY,
        !!process.env.CEREBRAS_API_KEY_2,
        !!process.env.CEREBRAS_API_KEY_3,
        !!process.env.CEREBRAS_API_KEY_4,
        !!process.env.CEREBRAS_API_KEY_5,
      ],
      hardcodedFallback: true,
      endpoint: "https://api.cerebras.ai/v1/chat/completions",
      model: "llama3.1-70b",
    },
    env: {
      DATABASE_URL:    !!process.env.DATABASE_URL,
      CRON_SECRET:     !!process.env.CRON_SECRET,
      NODE_ENV:        process.env.NODE_ENV,
    },
    crawl: {
      trigger:   "POST /api/crawl",
      auth:      "Authorization: Bearer nrt-cron-2026",
      topics:    15,
      perCrawl:  5,
    },
    ts: new Date().toISOString(),
  });
}
