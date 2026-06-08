"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import { createPortal } from "react-dom";
import DecryptedText from "@/components/effects/DecryptedText";
import Ferrofluid from "@/components/effects/Ferrofluid";
import { renderGate } from "@/components/effects/renderGate";

type Msg = { role: "user" | "ai"; text: string };

// Turn URLs / bare domains in text into clickable links (open in new tab)
const URL_RE = /((?:https?:\/\/)?(?:[a-zA-Z0-9-]+\.)+(?:com|pe|co|dev|io|ai|net|org)(?:\/[^\s)]*)?)/g;

function renderText(text: string) {
  const nodes: (string | ReactElement)[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  URL_RE.lastIndex = 0;
  while ((m = URL_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    let raw = m[0];
    let trail = "";
    const t = raw.match(/[.,;:!?]+$/);
    if (t) {
      trail = t[0];
      raw = raw.slice(0, raw.length - trail.length);
    }
    const href = raw.startsWith("http") ? raw : `https://${raw}`;
    nodes.push(
      <a
        key={key++}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="break-all font-medium text-accent-light underline decoration-accent-light/40 underline-offset-2 transition hover:text-white"
      >
        {raw}
      </a>
    );
    if (trail) nodes.push(trail);
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

const SUGGESTIONS = [
  "What does Juan build?",
  "Are these real production systems?",
  "What's his tech stack?",
  "Is he available to hire?",
  "Leave him a message",
  "Book a call",
];

// Offline fallback (used only if the API is unreachable)
function fallbackAnswer(input: string): string {
  const q = input.toLowerCase();
  const has = (...k: string[]) => k.some((w) => q.includes(w));
  if (has("build", "do", "make")) return "Juan builds production AI-first software — LLM assistants, RAG, agentic apps, OCR pipelines, automation, backends and mobile. From the AI layer to deployment.";
  if (has("stack", "tech")) return "Python · FastAPI · PostgreSQL/pgvector · LLM APIs · RAG · agentic tool-calling · OCR · n8n · React/Next.js · React Native · Docker.";
  if (has("available", "hire", "remote", "job")) return "Yes — open to remote AI Engineer roles (full-time, contract, freelance). LatAm time zone, overlaps with US hours.";
  if (has("contact", "email", "message", "linkedin", "call")) return "Reach Juan on LinkedIn: linkedin.com/in/juan-perez-ai-engineer or GitHub: github.com/Juanllenato.";
  return "Ask me about Juan's projects, stack, experience or availability. (Demo mode — connect a key for full AI.)";
}

export default function AskAi({ startDelay = 0 }: { startDelay?: number }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi — I'm Juan's AI assistant. Ask me anything about his work, skills or experience, or leave him a message and I'll send it over." },
  ]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recRef = useRef<any>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // lock background scroll + pause the hero WebGL while the chat is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      renderGate.heroPaused = true;
      return () => {
        document.body.style.overflow = prev;
        renderGate.heroPaused = false;
      };
    }
  }, [open]);

  const speak = (text: string) => {
    if (!voiceOn || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 1.05;
    window.speechSynthesis.speak(u);
  };

  const typewriter = (full: string) => {
    setMessages((m) => [...m, { role: "ai", text: "" }]);
    let i = 0;
    const id = setInterval(() => {
      i += 6;
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "ai", text: full.slice(0, i) };
        return copy;
      });
      if (i >= full.length) clearInterval(id);
    }, 28);
  };

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || loading) return;
    setValue("");
    const history = [...messages, { role: "user" as const, text: t }];
    setMessages(history);
    setLoading(true);

    const payload = history
      .filter((_, i) => i > 0 || history.length === 1) // include greeting context too
      .map((m) => ({ role: m.role === "ai" ? "assistant" : "user", content: m.text }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });
      const data = await res.json();
      const reply: string = data.reply || fallbackAnswer(t);
      setLoading(false);
      typewriter(reply);
      speak(reply);
    } catch {
      setLoading(false);
      const reply = fallbackAnswer(t);
      typewriter(reply);
      speak(reply);
    }
  };

  const toggleListen = () => {
    if (listening) {
      recRef.current?.stop();
      setListening(false);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert("Voice input isn't supported in this browser. Try Chrome.");
      return;
    }
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setListening(false);
      send(transcript);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    setListening(true);
    rec.start();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-light hover:shadow-[0_0_30px_var(--glow)]"
      >
        <DecryptedText text="Ask my AI" animateOn="view" startDelay={startDelay} speed={28} maxIterations={10} />
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
          {/* Ferrofluid background */}
          <div className="absolute inset-0 bg-[#06040a]" onClick={() => setOpen(false)} aria-hidden>
            <Ferrofluid className="absolute inset-0" colors={["#cf67ff", "#b47fff", "#b691ff"]} flowDirection="up" glow={2.2} scale={1.5} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#06040a]/30 via-transparent to-[#06040a]/70" />
          </div>

          {/* liquid glass chat panel */}
          <div className="relative z-10 flex h-[88vh] w-full flex-col overflow-hidden rounded-t-3xl border border-white/15 bg-[#0b0814]/45 shadow-[0_30px_120px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:h-[640px] sm:max-w-lg sm:rounded-3xl">
            {/* header */}
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 font-mono text-xs font-bold tracking-wider text-accent-light backdrop-blur">AI</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Juan&rsquo;s AI Assistant</p>
                <p className="font-mono text-[11px] text-white/60">agentic · voice · can email Juan</p>
              </div>
              <button
                onClick={() => {
                  setVoiceOn((v) => {
                    if (v && window.speechSynthesis) window.speechSynthesis.cancel();
                    return !v;
                  });
                }}
                aria-label="Toggle voice"
                title={voiceOn ? "Voice replies: on" : "Voice replies: off"}
                className={`rounded-md border p-1.5 transition ${voiceOn ? "border-accent-light text-accent-light" : "border-white/20 text-white hover:border-accent-light"}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  {voiceOn ? (
                    <>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </>
                  ) : (
                    <>
                      <line x1="22" y1="9" x2="16" y2="15" />
                      <line x1="16" y1="9" x2="22" y2="15" />
                    </>
                  )}
                </svg>
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-md border border-white/20 px-2.5 py-1 font-mono text-xs text-white transition hover:border-accent-light">✕</button>
            </div>

            {/* messages */}
            <div className="scrollbar-slim flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed backdrop-blur-md ${m.role === "user" ? "bg-accent/85 text-white" : "border border-white/15 bg-white/10 text-white"}`}>
                    {m.role === "ai" ? renderText(m.text) : m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur-md">
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/70 [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/70 [animation-delay:-0.1s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/70" />
                    </span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* suggestions */}
            <div className="flex flex-wrap gap-2 border-t border-white/10 px-5 py-3">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs text-white/80 backdrop-blur transition hover:border-accent-light hover:text-white">
                  {s}
                </button>
              ))}
            </div>

            {/* input */}
            <form onSubmit={(e) => { e.preventDefault(); send(value); }} className="flex items-center gap-2 border-t border-white/10 p-3">
              <button
                type="button"
                onClick={toggleListen}
                aria-label="Voice input"
                title="Speak"
                className={`flex shrink-0 items-center justify-center rounded-full border p-2.5 transition ${listening ? "animate-pulse border-accent-light bg-accent/30 text-white" : "border-white/20 bg-white/10 text-white hover:border-accent-light"}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
              </button>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={listening ? "Listening…" : "Ask anything about Juan…"}
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white outline-none backdrop-blur placeholder:text-white/50 focus:border-accent-light"
              />
              <button type="submit" disabled={loading} className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-light disabled:opacity-50">
                Send
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
