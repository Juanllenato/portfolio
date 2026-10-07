import { NextRequest, NextResponse } from "next/server";
import { chatCompletion, providerNames, LlmUnavailableError } from "@/lib/llm";
import { alertOwner } from "@/lib/alert";

export const runtime = "nodejs";
export const maxDuration = 60;

// Daily Vercel Cron (see vercel.json) checks every configured LLM provider separately and emails
// the owner if any of them fails, so a retired model, revoked key or broken backup is caught even
// when nobody is chatting. Vercel sends `Authorization: Bearer $CRON_SECRET` automatically.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const providers: Record<string, string> = {};
  const failures: string[] = [];
  for (const name of providerNames()) {
    try {
      const { target } = await chatCompletion(
        { messages: [{ role: "user", content: "Reply with the single word OK." }], max_tokens: 20 },
        undefined,
        name
      );
      providers[name] = `ok (${target.model})`;
    } catch (e) {
      const attempts = e instanceof LlmUnavailableError ? e.attempts : [String(e)];
      providers[name] = "failing";
      failures.push(...attempts);
    }
  }

  const anyOk = Object.values(providers).some((s) => s.startsWith("ok"));
  if (failures.length || !anyOk) {
    console.error("[health] LLM provider failures", failures);
    await alertOwner(
      anyOk ? "Daily check: a backup LLM provider is failing" : "Daily check: chatbot LLM is failing",
      failures.length ? failures : ["no LLM provider configured"],
      { force: true }
    );
  }
  return NextResponse.json({ ok: anyOk, providers }, { status: anyOk ? 200 : 503 });
}
