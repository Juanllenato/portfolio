"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import { createPortal } from "react-dom";
import DecryptedText from "@/components/effects/DecryptedText";
import Ferrofluid from "@/components/effects/Ferrofluid";
import { renderGate } from "@/components/effects/renderGate";
import { useT } from "@/lib/i18n";
import { fallbackAnswer } from "@/lib/chat-fallback";

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

const LINKEDIN_URL = "https://www.linkedin.com/in/juan-perez-ai-engineer";

// Detect a contact/scheduling link in an AI reply and turn it into a CTA button.
// Returns the button config + the message text with that bare URL removed.
function extractCta(
  text: string,
  lang: "en" | "es"
): { href: string; label: string; text: string } | null {
  const calMatch = text.match(/https?:\/\/[^\s)]*calendly[^\s)]*/i);
  const liMatch = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[^\s).,]*/i);
  if (calMatch) {
    return {
      href: calMatch[0],
      label: lang === "es" ? "Agendar una llamada" : "Book a call",
      text: text.replace(calMatch[0], "").replace(/\s{2,}/g, " ").trim(),
    };
  }
  if (liMatch) {
    const href = liMatch[0].startsWith("http") ? liMatch[0] : `https://${liMatch[0]}`;
    return {
      href,
      label: lang === "es" ? "Hablar con Juan en LinkedIn" : "Chat with Juan on LinkedIn",
      // remove the bare URL (and a trailing "aquí:"/"here:" style lead-in) for a clean bubble
      text: text.replace(liMatch[0], "").replace(/\s{2,}/g, " ").replace(/[:\-–]\s*$/, "").trim(),
    };
  }
  return null;
}

function CtaButton({ href, label }: { href: string; label: string }) {
  const isLinkedIn = href.includes("linkedin.com");
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mt-2.5 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] transition hover:bg-accent-light"
    >
      {isLinkedIn ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      )}
      {label}
      <span aria-hidden>→</span>
    </a>
  );
}

export default function AskAi({ startDelay = 0 }: { startDelay?: number }) {
  const { t, lang } = useT();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: t.chat.greeting },
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

  // keep the greeting in sync with the active language (only on a fresh chat)
  useEffect(() => {
    setMessages((m) =>
      m.length === 1 && m[0].role === "ai" ? [{ role: "ai", text: t.chat.greeting }] : m
    );
  }, [t.chat.greeting]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // lock background scroll + pause the hero WebGL while the chat is open.
  // Uses position:fixed (the only reliable lock on iOS Safari) and restores
  // the exact scroll position on close.
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      const body = document.body;
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
      renderGate.heroPaused = true;
      return () => {
        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";
        body.style.width = "";
        body.style.overflow = "";
        window.scrollTo(0, scrollY);
        renderGate.heroPaused = false;
      };
    }
  }, [open]);

  const speak = (text: string) => {
    if (!voiceOn || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "es" ? "es-ES" : "en-US";
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
        body: JSON.stringify({ messages: payload, lang }),
      });
      const data = await res.json();
      const reply: string = data.reply || fallbackAnswer(t, lang);
      setLoading(false);
      typewriter(reply);
      speak(reply);
    } catch {
      setLoading(false);
      const reply = fallbackAnswer(t, lang);
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
      alert(t.chat.voiceUnsupported);
      return;
    }
    const rec = new SR();
    rec.lang = lang === "es" ? "es-ES" : "en-US";
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
        <DecryptedText key={`askai-${lang}`} text={t.hero.askAi} animateOn="view" startDelay={startDelay} speed={28} maxIterations={10} />
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
          {/* Ferrofluid background */}
          <div className="absolute inset-0 bg-[#06040a]" onClick={() => setOpen(false)} aria-hidden>
            <Ferrofluid className="absolute inset-0" colors={["#cf67ff", "#b47fff", "#b691ff"]} flowDirection="up" glow={2.2} scale={1.5} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#06040a]/30 via-transparent to-[#06040a]/70" />
          </div>

          {/* liquid glass chat panel */}
          <div className="relative z-10 flex h-[88dvh] max-h-[88dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-white/15 bg-[#0b0814]/45 shadow-[0_30px_120px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:h-[640px] sm:max-h-[640px] sm:max-w-lg sm:rounded-3xl">
            {/* header */}
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 font-mono text-xs font-bold tracking-wider text-accent-light backdrop-blur">AI</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{t.chat.title}</p>
                <p className="font-mono text-[11px] text-white/60">{t.chat.subtitle}</p>
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
            <div className="scrollbar-slim flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-4" style={{ WebkitOverflowScrolling: "touch" }}>
              {messages.map((m, i) => {
                const cta = m.role === "ai" ? extractCta(m.text, lang) : null;
                return (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex max-w-[85%] flex-col items-start rounded-2xl px-4 py-2.5 text-sm leading-relaxed backdrop-blur-md ${m.role === "user" ? "bg-accent/85 text-white" : "border border-white/15 bg-white/10 text-white"}`}>
                      <span className="whitespace-pre-wrap">
                        {m.role === "ai" ? renderText(cta ? cta.text : m.text) : m.text}
                      </span>
                      {cta && <CtaButton href={cta.href} label={cta.label} />}
                    </div>
                  </div>
                );
              })}
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
              {t.chat.suggestions.map((s) => (
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
                placeholder={listening ? t.chat.listening : t.chat.placeholder}
                className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-base text-white outline-none backdrop-blur placeholder:text-white/50 focus:border-accent-light sm:text-sm"
              />
              <button type="submit" disabled={loading} className="shrink-0 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-light disabled:opacity-50">
                {t.chat.send}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
