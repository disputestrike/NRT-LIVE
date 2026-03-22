/**
 * GET /api/cron — Railway Cron Job endpoint
 * Set in Railway: Schedule = "every 15 minutes"
 * Command = curl -X GET https://your-domain.up.railway.app/api/cron
 * 
 * Also auto-triggers on first page load if last crawl > 15 mins ago
 */
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET || "nrt-cron-2026";
  
  // Trigger the crawl
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                    `https://${req.headers.get("host")}`;
    
    const res = await fetch(`${baseUrl}/api/crawl`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
    });
    
    const data = await res.json();
    
    return NextResponse.json({
      triggered: true,
      crawlResult: data,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    return NextResponse.json({ 
      triggered: false, 
      error: err instanceof Error ? err.message : "Failed",
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
