// NRT Validation Agent — Cerebras-powered quality gate
import { NextRequest, NextResponse } from "next/server";
import { cerebrasChat } from "../../../lib/cerebras";

export const dynamic = "force-dynamic";

type Check = { name: string; passed: boolean; reason: string };

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  if (!auth.includes(process.env.CRON_SECRET || "nrt-cron-2026")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { headline = "", snippet = "", articleBody = "", image = "", category = "", confidence = "" } = await req.json();
  const checks: Check[] = [];
  let score = 100;

  // Rule-based checks (fast, no AI needed)
  const hlWords = headline.split(" ").length;
  const hlOk = hlWords >= 6 && !/lorem|placeholder|test|todo/i.test(headline);
  checks.push({ name: "Headline quality", passed: hlOk, reason: `${hlWords} words${hlOk ? " ✓" : " — too short or placeholder"}` });
  if (!hlOk) score -= 25;

  const bodyWords = articleBody.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
  const bodyOk = bodyWords >= 200;
  checks.push({ name: "Body length", passed: bodyOk, reason: `${bodyWords} words${bodyOk ? " ✓" : " — min 200 required"}` });
  if (!bodyOk) score -= 30;

  const snipWords = snippet.split(" ").length;
  const snipOk = snipWords >= 15 && snipWords <= 80;
  checks.push({ name: "Snippet length", passed: snipOk, reason: `${snipWords} words` });
  if (!snipOk) score -= 15;

  const imgOk = image.startsWith("https://") && image.length > 20;
  checks.push({ name: "Image URL", passed: imgOk, reason: imgOk ? "Valid HTTPS URL ✓" : "Missing or invalid" });
  if (!imgOk) score -= 20;

  const validCats = ["politics","economy","sports","entertainment","nigeria","investigation","money","tech","africa","health","world","opinion"];
  const catOk = validCats.includes(category.toLowerCase());
  checks.push({ name: "Category", passed: catOk, reason: catOk ? `'${category}' ✓` : `Unknown: '${category}'` });
  if (!catOk) score -= 10;

  const confOk = ["Verified","Developing","Unverified"].includes(confidence);
  checks.push({ name: "Confidence label", passed: confOk, reason: confOk ? `${confidence} ✓` : "Missing" });
  if (!confOk) score -= 10;

  // AI check via Cerebras — only if score is borderline (40-80)
  if (score >= 40 && score <= 80 && headline.length > 10) {
    const aiResult = await cerebrasChat([{
      role: "user",
      content: `Rate this news headline for quality on a scale of 1-10. Only respond with a JSON object: {"score": N, "reason": "..."}\n\nHeadline: "${headline}"\nCategory: ${category}`
    }], { maxTokens: 100, temperature: 0.3 });

    if (aiResult) {
      try {
        const parsed = JSON.parse(aiResult.replace(/```json|```/g, "").trim());
        const aiScore = Number(parsed.score) || 5;
        const aiPassed = aiScore >= 6;
        checks.push({ name: "Cerebras AI quality check", passed: aiPassed, reason: `Score ${aiScore}/10 — ${parsed.reason}` });
        if (!aiPassed) score -= 10;
      } catch { /* skip AI check if parse fails */ }
    }
  }

  const finalScore = Math.max(0, score);
  const action = finalScore >= 70 ? "publish" : finalScore >= 40 ? "hold" : "reject";

  return NextResponse.json({
    passed: finalScore >= 70,
    score: finalScore,
    action,
    checks,
    engine: "Cerebras llama3.1-8b",
    validatedAt: new Date().toISOString(),
  });
}

export async function GET() {
  return NextResponse.json({ status: "NRT Validation Agent v2.0", engine: "Cerebras AI", checks: 7, publishThreshold: 70 });
}
