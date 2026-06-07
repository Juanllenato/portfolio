const STACK = ["Python", "FastAPI", "LLM / RAG", "Agentic AI", "React / Next.js", "Automation"];
const STRENGTHS = ["Problem solving", "Ownership", "Self-directed", "Clear communication"];

const STATS = [
  { value: "5+ yrs", label: "Building software" },
  { value: "Colombia & Peru", label: "Production deployments" },
  { value: "UTS", label: "Systems Engineering" },
];

export default function AboutCTA() {
  return (
    <section id="about" className="relative z-10 px-4 py-24 sm:px-6">
      <div
        className="relative mx-auto flex max-w-7xl flex-col items-center overflow-hidden rounded-[44px] border border-white/10 px-6 py-24 text-center sm:px-16"
        style={{ background: "#06040a" }}
      >
        {/* Organic bottom glow — layered light: violet diffuse → bright violet → near-white hot core */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-90px] left-1/2 z-0 h-[320px] w-[130%] -translate-x-1/2 rounded-[50%]"
          style={{ background: "#3b1c9b", filter: "blur(120px)", opacity: 0.7 }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-60px] left-1/2 z-0 h-[220px] w-[60%] -translate-x-1/2 rounded-[50%]"
          style={{ background: "#8a4fff", filter: "blur(80px)", opacity: 0.9 }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-40px] left-1/2 z-0 h-[150px] w-[34%] -translate-x-1/2 rounded-[50%]"
          style={{ background: "#f1e9ff", filter: "blur(70px)", opacity: 0.75 }}
        />

        {/* Content */}
        <div className="relative z-10 flex w-full flex-col items-center">
          <span className="mono-label text-white/60">SECTION_02 // WHO I AM</span>

          <h2 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Let&rsquo;s build something real.
          </h2>

          <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/70 sm:text-lg">
            AI-First Software Engineer with 5+ years building production software
            and automations. I&rsquo;ve shipped systems for companies across
            Colombia &amp; Peru — AI platforms, backends and e-commerce, end to end.
          </p>

          {/* stats */}
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-0">
            {STATS.map((s, i) => (
              <div key={s.value} className="flex items-center">
                <div className="px-8 text-center">
                  <div className="text-xl font-bold text-white">{s.value}</div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                    {s.label}
                  </div>
                </div>
                {i < STATS.length - 1 && (
                  <span className="hidden h-8 w-px bg-white/15 sm:block" />
                )}
              </div>
            ))}
          </div>

          {/* skills */}
          <div className="mt-12 grid w-full max-w-3xl gap-8 sm:grid-cols-2">
            <div>
              <span className="mono-label text-white/50">Stack</span>
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                {STACK.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-white/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="mono-label text-white/50">Strengths</span>
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                {STRENGTHS.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-white/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/juan-perez-ai-engineer"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#1e1140] transition hover:shadow-[0_0_40px_rgba(255,255,255,0.35)]"
            >
              Get in touch
              <span aria-hidden>→</span>
            </a>
            <a
              href="https://github.com/Juanllenato"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 bg-[#2d235c]/50 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/40"
            >
              View GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
