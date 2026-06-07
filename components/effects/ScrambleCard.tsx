"use client";

import { useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]#%&*+=";

function randStr(len: number) {
  let s = "";
  for (let i = 0; i < len; i++) s += CHARS[(Math.random() * CHARS.length) | 0];
  return s;
}

// Vignette: hide the cipher in the center (behind the logo), show it around.
const VIGNETTE =
  "radial-gradient(ellipse 82% 82% at 50% 45%, transparent 0%, transparent 30%, #000 64%)";

export default function ScrambleCard({
  logo,
  name,
  sector,
  url,
}: {
  logo: string;
  name: string;
  sector: string;
  url?: string;
}) {
  const visualRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual) return;

    const fill = () => {
      const s = randStr(1800);
      if (dimRef.current) dimRef.current.innerText = s;
      if (glowRef.current) glowRef.current.innerText = s;
    };
    fill();

    const onEnter = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(fill, 45);
      visual.style.setProperty("--glow-op", "1");
    };
    const onMove = (e: MouseEvent) => {
      const r = visual.getBoundingClientRect();
      visual.style.setProperty("--mx", `${e.clientX - r.left}px`);
      visual.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const onLeave = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      visual.style.setProperty("--glow-op", "0");
    };

    visual.addEventListener("mouseenter", onEnter);
    visual.addEventListener("mousemove", onMove);
    visual.addEventListener("mouseleave", onLeave);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      visual.removeEventListener("mouseenter", onEnter);
      visual.removeEventListener("mousemove", onMove);
      visual.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const mouseMask =
    "radial-gradient(180px circle at var(--mx, 50%) var(--my, 50%), #000 0%, transparent 70%)";

  return (
    <div className="flex h-full flex-col">
      {/* visual (square, cipher fills it, logo centered) */}
      <div
        ref={visualRef}
        className="relative aspect-square overflow-hidden bg-white/[0.015]"
        style={{ ["--glow-op" as string]: "0" }}
      >
        {/* dim cipher layer (vignette around logo) */}
        <div
          ref={dimRef}
          aria-hidden
          className="absolute inset-0 select-none break-all p-3 font-mono text-[11px] leading-[1.15] tracking-tight text-white/10"
          style={{
            WebkitMaskImage: VIGNETTE,
            maskImage: VIGNETTE,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />
        {/* purple spotlight cipher layer — mouse spotlight AND vignette (never over the logo) */}
        <div
          ref={glowRef}
          aria-hidden
          className="absolute inset-0 select-none break-all p-3 font-mono text-[11px] leading-[1.15] tracking-tight text-[#a06fff] transition-opacity duration-300"
          style={{
            opacity: "var(--glow-op)",
            WebkitMaskImage: `${mouseMask}, ${VIGNETTE}`,
            maskImage: `${mouseMask}, ${VIGNETTE}`,
            WebkitMaskRepeat: "no-repeat, no-repeat",
            maskRepeat: "no-repeat, no-repeat",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
        />
        {/* logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={name}
          className="absolute left-1/2 top-[45%] z-10 max-h-[48%] max-w-[80%] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.7)]"
        />
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col border-t border-border p-6">
        <p className="font-mono text-xs text-dim">{sector}</p>
        <h3 className="mt-2 text-lg font-semibold leading-tight text-white">{name}</h3>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="group/link mt-4 inline-flex items-center gap-1 text-sm text-accent-light"
          >
            Visit site
            <span className="transition-transform group-hover/link:translate-x-1">→</span>
          </a>
        ) : (
          <span className="mt-4 font-mono text-xs text-dim/60">Private / internal</span>
        )}
      </div>
    </div>
  );
}
