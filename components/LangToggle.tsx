"use client";

import { useLang } from "@/lib/i18n";

export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label="Language / Idioma"
      className="fixed right-4 top-4 z-[60] flex items-center gap-0.5 rounded-full border border-white/20 bg-black/50 p-0.5 font-mono text-xs font-semibold backdrop-blur-md print:hidden sm:right-6 sm:top-6"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-1.5 h-3.5 w-3.5 text-white/60"
        aria-hidden
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <button
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`rounded-full px-2.5 py-1 transition ${
          lang === "en"
            ? "bg-accent text-white"
            : "text-white/60 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("es")}
        aria-pressed={lang === "es"}
        className={`rounded-full px-2.5 py-1 transition ${
          lang === "es"
            ? "bg-accent text-white"
            : "text-white/60 hover:text-white"
        }`}
      >
        ES
      </button>
    </div>
  );
}
