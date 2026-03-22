// Cerebras AI client with 5-key round-robin rotation
// Rotates keys automatically to avoid rate limits

const CEREBRAS_KEYS = [
  process.env.CEREBRAS_KEY_1 || "csk-j839dc68v5mtd323f5jfvm82rkhyny3dy8kdxyr93w2ertnt",
  process.env.CEREBRAS_KEY_2 || "csk-jfwhwetet942t4ndxjph5t83v3rrcypd48tvdce3tdk9tkh3",
  process.env.CEREBRAS_KEY_3 || "csk-vtdn3ypfw353xmevcce9wr8w6h2evwm8kpxyh5tnwkw5v8wv",
  process.env.CEREBRAS_KEY_4 || "csk-fpp82tdfhyhy955rff4w6pe59vpyrmmc633htrdwwhhwfp6e",
  process.env.CEREBRAS_KEY_5 || "csk-3rmkpjm3d5hcxf9pxjj6xy8yh3w3299p68tjnvfphm9kvx3t",
];

// Round-robin counter (persists in module scope)
let keyIndex = 0;

function getNextKey(): string {
  const key = CEREBRAS_KEYS[keyIndex % CEREBRAS_KEYS.length];
  keyIndex++;
  return key;
}

export type CerebrasMessage = { role: "user" | "assistant" | "system"; content: string };

export async function cerebrasChat(
  messages: CerebrasMessage[],
  opts: { maxTokens?: number; temperature?: number; retries?: number } = {}
): Promise<string | null> {
  const { maxTokens = 1024, temperature = 0.7, retries = 3 } = opts;

  for (let attempt = 0; attempt < retries; attempt++) {
    const key = getNextKey();
    try {
      const res = await fetch("https://api.cerebras.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "llama3.1-8b",
          messages,
          max_tokens: maxTokens,
          temperature,
          stream: false,
        }),
      });

      if (res.status === 429) {
        // Rate limited — rotate to next key and retry
        console.warn(`Cerebras key ${attempt + 1} rate limited, rotating...`);
        await sleep(500 * (attempt + 1));
        continue;
      }

      if (!res.ok) {
        console.error(`Cerebras error ${res.status}: ${await res.text()}`);
        continue;
      }

      const data = await res.json();
      return data.choices?.[0]?.message?.content || null;
    } catch (err) {
      console.error(`Cerebras attempt ${attempt + 1} failed:`, err);
      if (attempt < retries - 1) await sleep(1000 * (attempt + 1));
    }
  }
  return null;
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

// Convenience: rewrite a news story in NRT style
export async function rewriteNewsStory(raw: {
  title: string; snippet: string; source: string; category: string;
}): Promise<{ headline: string; snippet: string; body: string; category: string; confidence: string } | null> {
  const prompt = `You are NRT (Nigeria Real Time) — Nigeria's #1 AI news network. Rewrite this story in NRT's bold, authoritative voice.

Source: ${raw.source}
Category: ${raw.category}
Original title: ${raw.title}
Original text: ${raw.snippet.slice(0, 600)}

Rules:
- HEADLINE: Bold, specific, max 12 words. No clickbait. Facts first.
- SNIPPET: 2 sentences, max 45 words. Key facts only.
- BODY: 4 paragraphs. Journalist tone. Why it matters to Nigerians/Africans.
- CATEGORY: one of: politics, economy, sports, entertainment, nigeria, investigation, money, tech, africa, health, world, opinion
- CONFIDENCE: "Verified" if established source, "Developing" if single source

Respond ONLY with valid JSON (no markdown):
{"headline":"...","snippet":"...","body":"...","category":"...","confidence":"..."}`;

  const result = await cerebrasChat([{ role: "user", content: prompt }], { maxTokens: 800, temperature: 0.6 });
  if (!result) return null;

  try {
    const clean = result.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return null;
  }
}
