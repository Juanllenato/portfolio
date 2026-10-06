"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";

type QA = { q: string; a: string };

function FaqItem({ item, index }: { item: QA; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-border">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex w-full items-center gap-4 py-6 text-left"
      >
        <span className="font-mono text-xs text-accent-light/70">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-lg font-medium text-white transition group-hover:text-accent-light">
          {item.q}
        </span>
        <span
          className={`relative h-5 w-5 shrink-0 text-accent-light transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden
        >
          <span className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-1/2 h-4 w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-current" />
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-6 pl-9 text-sm leading-relaxed text-dim">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const { t } = useT();
  const FAQS = t.faq.items;
  return (
    <section id="faq" className="relative z-10 px-4 pt-16 sm:px-6">
      {/* shape divider: rounded-top panel with a strong "light hitting" glow */}
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-t-[44px] border-x border-t border-white/15 shadow-[inset_0_2px_0_rgba(255,255,255,0.6)]">
        {/* gradient glow — near-white hot core fading through violet to dark */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          style={{
            background:
              "radial-gradient(50% 75% at 50% -10%, rgba(255,255,255,0.95) 0%, rgba(205,180,255,0.75) 20%, rgba(139,92,246,0.5) 40%, transparent 66%), linear-gradient(180deg, #cdb8ff 0%, #8b5cf6 12%, #4c1d95 30%, transparent 62%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-28 sm:pt-36">
          <div className="mb-12 text-center">
            <span className="mono-label text-white/85">{t.faq.label}</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] sm:text-5xl">
              {t.faq.title}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-white/80">
              {t.faq.blurb}
            </p>
          </div>

          <div className="border-b border-border">
            {FAQS.map((item, i) => (
              <FaqItem key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
