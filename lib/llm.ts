// Server-only LLM client with automatic model and provider failover.
//
// Why: providers retire models without notice. In Oct 2026 Groq removed `llama-3.3-70b-versatile`,
// which was hard-coded here, and the portfolio chatbot went down. Now:
//   1. Each provider has an ordered list of preferred models (overridable via env).
//   2. We ask the provider which models are live (cached) and skip retired ones, falling back
//      to any other live chat model if every preferred one is gone.
//   3. An optional second OpenAI-compatible provider is tried if the first one fails entirely.

export type ChatBody = {
  messages: unknown[];
  tools?: unknown[];
  tool_choice?: string;
  temperature?: number;
  max_tokens?: number;
};

type Provider = { name: string; baseUrl: string; key: string; models: string[]; discover: boolean };
export type Target = { provider: string; model: string };

const GROQ_DEFAULT_MODELS = ["openai/gpt-oss-120b", "qwen/qwen3.8-27b", "openai/gpt-oss-20b"];
// Live models that are not general chat models (speech, TTS, safety classifiers, ...)
const NON_CHAT = /whisper|guard|orpheus|tts|safeguard|allam|embed/i;
const CALL_TIMEOUT_MS = 15_000;
const DISCOVERY_TIMEOUT_MS = 5_000;
const DISCOVERY_TTL_MS = 60 * 60 * 1000;
const MAX_MODELS_PER_PROVIDER = 3;

const list = (v?: string) =>
  (v || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

function providers(): Provider[] {
  const out: Provider[] = [];
  const groqKey = process.env.GROQ_API_KEY?.trim();
  if (groqKey) {
    const models = list(process.env.GROQ_MODELS);
    out.push({
      name: "groq",
      baseUrl: "https://api.groq.com/openai/v1",
      key: groqKey,
      models: models.length ? models : GROQ_DEFAULT_MODELS,
      discover: true,
    });
  }
  // Optional backup provider: any OpenAI-compatible API (e.g. Together AI, OpenRouter).
  const fbKey = process.env.LLM_FALLBACK_API_KEY?.trim();
  const fbUrl = process.env.LLM_FALLBACK_BASE_URL?.trim();
  const fbModels = list(process.env.LLM_FALLBACK_MODELS);
  if (fbKey && fbUrl && fbModels.length) {
    out.push({ name: "fallback", baseUrl: fbUrl.replace(/\/$/, ""), key: fbKey, models: fbModels, discover: false });
  }
  return out;
}

export function llmConfigured(): boolean {
  return providers().length > 0;
}

const liveModels = new Map<string, { ids: string[]; at: number }>();

async function discover(p: Provider): Promise<string[] | null> {
  const hit = liveModels.get(p.name);
  if (hit && Date.now() - hit.at < DISCOVERY_TTL_MS) return hit.ids;
  try {
    const res = await fetch(`${p.baseUrl}/models`, {
      headers: { Authorization: `Bearer ${p.key}` },
      signal: AbortSignal.timeout(DISCOVERY_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    const ids: string[] = ((await res.json())?.data || []).map((m: { id: string }) => m.id);
    liveModels.set(p.name, { ids, at: Date.now() });
    return ids;
  } catch {
    return null;
  }
}

async function candidates(p: Provider): Promise<string[]> {
  if (!p.discover) return p.models;
  const live = await discover(p);
  if (!live) return p.models; // discovery unavailable: just try the configured list
  const preferred = p.models.filter((m) => live.includes(m));
  const others = live.filter((m) => !NON_CHAT.test(m) && !preferred.includes(m));
  return [...preferred, ...others];
}

export class LlmUnavailableError extends Error {
  attempts: string[];
  constructor(attempts: string[]) {
    super("All LLM providers failed");
    this.attempts = attempts;
  }
}

// Calls the first provider/model that works. Pass `prefer` to keep using the model that
// answered the previous step of the same conversation.
export async function chatCompletion(body: ChatBody, prefer?: Target) {
  const attempts: string[] = [];
  for (const p of providers()) {
    let models = (await candidates(p)).slice(0, MAX_MODELS_PER_PROVIDER);
    if (prefer?.provider === p.name) models = [prefer.model, ...models.filter((m) => m !== prefer.model)];

    for (const model of models) {
      try {
        const res = await fetch(`${p.baseUrl}/chat/completions`, {
          method: "POST",
          headers: { Authorization: `Bearer ${p.key}`, "Content-Type": "application/json" },
          body: JSON.stringify({ ...body, model }),
          signal: AbortSignal.timeout(CALL_TIMEOUT_MS),
        });
        if (res.ok) return { data: await res.json(), target: { provider: p.name, model } as Target };

        const detail = (await res.text().catch(() => "")).slice(0, 200);
        attempts.push(`${p.name}/${model}: HTTP ${res.status} ${detail}`);
        if (res.status === 401 || res.status === 403) break; // bad key: no model will work here
        if (res.status === 404 || /model_not_found|decommission|deprecat/i.test(detail)) {
          liveModels.delete(p.name); // refresh the live list on the next request
        }
      } catch (e) {
        attempts.push(`${p.name}/${model}: ${(e as Error).name}`);
      }
    }
  }
  throw new LlmUnavailableError(attempts.length ? attempts : ["no LLM provider configured"]);
}
