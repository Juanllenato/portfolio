"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useT } from "@/lib/i18n";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function Testimonials() {
  const { t } = useT();
  const [proof, setProof] = useState<{ src: string; name: string } | null>(null);

  useEffect(() => {
    if (!proof) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setProof(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [proof]);

  return (
    <section id="testimonials" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 text-center">
        <span className="mono-label">{t.testimonials.label}</span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t.testimonials.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-dim">{t.testimonials.blurb}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {t.testimonials.items.map((it) => (
          <figure
            key={it.name}
            className="surface relative flex flex-col rounded-2xl border border-border p-7"
          >
            {/* verified badge */}
            <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[11px] text-accent-light">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden>
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {t.testimonials.verified}
            </div>

            <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-accent/30" aria-hidden>
              <path d="M9.5 6C6.5 6 4 8.5 4 11.5V18h6v-6H7c0-1.7 1.1-3 2.5-3V6zm10 0c-3 0-5.5 2.5-5.5 5.5V18h6v-6h-3c0-1.7 1.1-3 2.5-3V6z" />
            </svg>

            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
              &ldquo;{it.quote}&rdquo;
            </blockquote>

            <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-mono text-sm font-bold text-white">
                {initials(it.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{it.name}</p>
                <p className="truncate text-xs text-dim">
                  {it.role} · {it.company}
                </p>
              </div>
              <button
                onClick={() => setProof({ src: it.image, name: it.name })}
                className="shrink-0 rounded-full border border-border px-3 py-1.5 font-mono text-[11px] text-dim transition hover:border-accent-light hover:text-accent-light"
              >
                {t.testimonials.proof}
              </button>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-8 text-center font-mono text-xs text-dim/70">
        {t.testimonials.referenceNote}
      </p>

      {/* proof modal */}
      {proof && typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-[#06040a]/95 backdrop-blur-md" onClick={() => setProof(null)} aria-hidden />
            <div className="relative z-10 flex max-h-[90vh] flex-col overflow-hidden rounded-xl border border-border bg-bg-elevated">
              <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                <span className="mono-label">{proof.name} · WhatsApp</span>
                <button onClick={() => setProof(null)} aria-label="Close" className="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-foreground transition hover:border-accent-light">
                  ✕
                </button>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={proof.src} alt={`Testimonio de ${proof.name}`} className="max-h-[78vh] w-auto object-contain" />
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
