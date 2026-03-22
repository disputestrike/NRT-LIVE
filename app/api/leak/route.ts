import { NextRequest, NextResponse } from "next/server";
import { submitLeak } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.content) {
    return NextResponse.json({ error:"Content required" }, { status:400 });
  }
  const saved = await submitLeak(data);
  return NextResponse.json({ success: true, saved });
}
