import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

type Check = { name: string; passed: boolean; reason: string };

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  if (!auth.includes(process.env.CRON_SECRET || "nrt-cron-2026")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { headline="", snippet="", articleBody="", image="", category="", confidence="" } = await req.json();
  const checks: Check[] = [];
  let score = 100;

  // 1. Headline — 6+ words, no placeholders
  const hlWords = headline.split(" ").length;
  const hlOk = hlWords >= 6 && !/lorem|placeholder|test|todo/i.test(headline);
  checks.push({ name:"Headline quality", passed:hlOk, reason: hlOk ? `${hlWords} words, clean` : "Too short or placeholder text" });
  if (!hlOk) score -= 25;

  // 2. Body — 200+ words
  const bodyWords = articleBody.replace(/<[^>]*>/g," ").split(/\s+/).filter(Boolean).length;
  const bodyOk = bodyWords >= 200;
  checks.push({ name:"Body length", passed:bodyOk, reason: `${bodyWords} words ${bodyOk?"✓":"— min 200 required"}` });
  if (!bodyOk) score -= 30;

  // 3. Snippet — 15-80 words
  const snipWords = snippet.split(" ").length;
  const snipOk = snipWords >= 15 && snipWords <= 80;
  checks.push({ name:"Snippet length", passed:snipOk, reason:`${snipWords} words` });
  if (!snipOk) score -= 15;

  // 4. Image URL valid
  const imgOk = image.startsWith("https://") && image.length > 20;
  checks.push({ name:"Image URL", passed:imgOk, reason: imgOk ? "Valid HTTPS URL" : "Missing or invalid" });
  if (!imgOk) score -= 20;

  // 5. Category valid
  const validCats = ["politics","economy","sports","entertainment","nigeria","investigation","money","tech","africa","health","world","opinion"];
  const catOk = validCats.includes(category.toLowerCase());
  checks.push({ name:"Category", passed:catOk, reason: catOk ? `'${category}' valid` : `Unknown: '${category}'` });
  if (!catOk) score -= 10;

  // 6. Confidence label
  const confOk = ["Verified","Developing","Unverified"].includes(confidence);
  checks.push({ name:"Confidence label", passed:confOk, reason: confOk ? confidence : "Missing" });
  if (!confOk) score -= 10;

  // 7. No duplicate headline words
  const hlArr = headline.toLowerCase().split(" ");
  const noDupe = hlArr.length === new Set(hlArr).size;
  checks.push({ name:"Headline uniqueness", passed:noDupe, reason: noDupe ? "No duplicates" : "Repeated words detected" });
  if (!noDupe) score -= 10;

  const finalScore = Math.max(0, score);
  const action = finalScore >= 70 ? "publish" : finalScore >= 40 ? "hold" : "reject";
  return NextResponse.json({ passed: finalScore >= 70, score: finalScore, action, checks, validatedAt: new Date().toISOString() });
}

export async function GET() {
  return NextResponse.json({ status:"NRT Validation Agent v1.0", checks:7, publishThreshold:70 });
}
