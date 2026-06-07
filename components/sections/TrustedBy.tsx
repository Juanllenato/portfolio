import ScrambleCard from "@/components/effects/ScrambleCard";

type Company = {
  name: string;
  sector: string;
  logo: string;
  url?: string;
};

const COMPANIES: Company[] = [
  {
    name: "PrevenSalud",
    sector: "Healthcare · AI CRM",
    logo: "/logos/prevensalud.png",
    url: "https://prevensalud.pe",
  },
  {
    name: "Grupo Alianza Vital",
    sector: "Healthcare · Platform",
    logo: "/logos/alianza-vital.png",
    url: "https://grupoalianzavital.com",
  },
  {
    name: "AINEA Technology",
    sector: "Software & AI studio",
    logo: "/logos/aineatechnology.png",
  },
  {
    name: "Pontebela",
    sector: "E-commerce · Supplements",
    logo: "/logos/pontebela.png",
    url: "https://pontebela.com.co",
  },
  {
    name: "Vida Total Plus",
    sector: "Health & wellness",
    logo: "/logos/vida-total-plus.png",
  },
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
  return (
    <section id="trusted" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 text-center">
        <span className="mono-label">SECTION_03 // TRUSTED BY</span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Companies that trusted my work
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-dim">
          Real businesses across Colombia &amp; Peru running software I designed,
          built and deployed.
        </p>
      </div>

      {/* blueprint grid */}
      <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
        {COMPANIES.map((c) => (
          <div key={c.name} className="relative border-b border-r border-border">
            <Crosshairs />
            <ScrambleCard logo={c.logo} name={c.name} sector={c.sector} url={c.url} />
          </div>
        ))}
        {/* filler keeps the grid complete (5 + 1 = 6) */}
        <div className="relative hidden border-b border-r border-border sm:block">
          <Crosshairs />
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs text-dim/30">
            // and counting
          </span>
        </div>
      </div>
    </section>
  );
}
