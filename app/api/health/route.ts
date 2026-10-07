import { NextRequest, NextResponse } from "next/server";
import { chatCompletion, LlmUnavailableError } from "@/lib/llm";
import { alertOwner } from "@/lib/alert";

export const runtime = "nodejs";
export const maxDuration = 60;

// Daily Vercel Cron (see vercel.json) checks that the chatbot's LLM still answers and emails the
// owner if it doesn't, so a retired model or revoked key is caught even when nobody is chatting.
// Vercel sends `Authorization: Bearer $CRON_SECRET` automatically.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { target } = await chatCompletion({
      messages: [{ role: "user", content: "Reply with the single word OK." }],
      max_tokens: 20,
    });
    return NextResponse.json({ ok: true, model: `${target.provider}/${target.model}` });
  } catch (e) {
    const attempts = e instanceof LlmUnavailableError ? e.attempts : [String(e)];
    console.error("[health] LLM unavailable", attempts);
    const emailed = await alertOwner("Daily check: chatbot LLM is failing", attempts, { force: true });
    return NextResponse.json({ ok: false, attempts, emailed }, { status: 503 });
  }
}
