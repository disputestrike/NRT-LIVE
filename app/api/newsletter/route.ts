import { NextRequest, NextResponse } from "next/server";
import { addSubscriber } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error:"Invalid email" }, { status:400 });
  }
  const saved = await addSubscriber(email);
  return NextResponse.json({ success: true, saved });
}
