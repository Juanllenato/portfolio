import Spotlight from "@/components/effects/Spotlight";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Mouse-following spotlight (Act 1 — Phase 1 version) */}
      <Spotlight />

      {/* Technical grid background */}
      <div className="grid-bg absolute inset-0 z-0" aria-hidden />

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <span className="mono-label mb-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
          Confidential Dossier
        </span>

        <h1 className="text-gradient text-5xl font-bold tracking-tight sm:text-7xl">
          Juan Perez
        </h1>

        <p className="mt-4 text-lg font-medium text-foreground sm:text-2xl">
          AI-First Software Engineer
        </p>

        <p className="mt-6 max-w-xl text-balance text-sm leading-relaxed text-dim sm:text-base">
          I turn LLMs into production systems that run real businesses — LLM
          assistants, RAG, agentic apps &amp; intelligent automation.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/Juanllenato"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-light hover:shadow-[0_0_30px_var(--glow)]"
          >
            View GitHub
          </a>
          <a
            href="#projects"
            className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent-light"
          >
            See projects
          </a>
        </div>

        <p className="mono-label absolute bottom-8 animate-pulse">
          ↓ scroll to declassify
        </p>
      </section>

      {/* Placeholder next section (built in later phases) */}
      <section
        id="projects"
        className="relative z-10 mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center px-6 py-24"
      >
        <span className="mono-label">SECTION_01 // DECLASSIFIED</span>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
          More coming as we build —{" "}
          <span className="text-accent-light">phase by phase.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-dim">
          Next: the dossier-opening reveal, the production case studies, the live
          trust bar, and the &ldquo;Ask my portfolio&rdquo; AI assistant.
        </p>
      </section>
    </main>
  );
}
