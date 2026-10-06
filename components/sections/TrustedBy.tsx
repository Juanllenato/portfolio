"use client";

import ScrambleCard from "@/components/effects/ScrambleCard";
import { useT } from "@/lib/i18n";

type Company = {
  name: string;
  sectorKey: "prevensalud" | "alianza" | "ainea" | "pontebela" | "vida";
  logo: string;
  url?: string;
};

const COMPANIES: Company[] = [
  { name: "PrevenSalud", sectorKey: "prevensalud", logo: "/logos/prevensalud.png", url: "https://prevensalud.pe" },
  { name: "Grupo Alianza Vital", sectorKey: "alianza", logo: "/logos/alianza-vital.png", url: "https://grupoalianzavital.com" },
  { name: "AINEA Technology", sectorKey: "ainea", logo: "/logos/aineatechnology.png" },
  { name: "Pontebela", sectorKey: "pontebela", logo: "/logos/pontebela.png", url: "https://pontebela.com.co" },
  { name: "Vida Total Plus", sectorKey: "vida", logo: "/logos/vida-total-plus.png" },
];

/** + marks centered on each corner → align across the grid for symmetry. */
function Crosshairs() {
  const base =
    "pointer-events-none absolute z-20 font-mono text-sm text-white/25 select-none";
  return (
    <>
      <span className={`${base} left-0 top-0 -translate-x-1/2 -translate-y-1/2`}>+</span>
      <span className={`${base} right-0 top-0 translate-x-1/2 -translate-y-1/2`}>+</span>
      <span className={`${base} left-0 bottom-0 -translate-x-1/2 translate-y-1/2`}>+</span>
      <span className={`${base} right-0 bottom-0 translate-x-1/2 translate-y-1/2`}>+</span>
    </>
  );
}

export default function TrustedBy() {
  const { t } = useT();
  return (
    <section id="trusted" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 text-center">
        <span className="mono-label">{t.trusted.label}</span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t.trusted.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-dim">
          {t.trusted.blurb}
        </p>
      </div>

      {/* blueprint grid */}
      <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
        {COMPANIES.map((c) => (
          <div key={c.name} className="relative border-b border-r border-border">
            <Crosshairs />
            <ScrambleCard logo={c.logo} name={c.name} sector={t.trusted.sectors[c.sectorKey]} url={c.url} />
          </div>
        ))}
        {/* filler keeps the grid complete (5 + 1 = 6) */}
        <div className="relative hidden border-b border-r border-border sm:block">
          <Crosshairs />
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs text-dim/30">
            {t.trusted.counting}
          </span>
        </div>
      </div>
    </section>
  );
}
