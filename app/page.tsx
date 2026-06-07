import GridScan from "@/components/effects/GridScan";
import DecryptedText from "@/components/effects/DecryptedText";
import AskAi from "@/components/sections/AskAi";
import ProjectsShowcase from "@/components/sections/ProjectsShowcase";
import TrustedBy from "@/components/sections/TrustedBy";
import AboutCTA from "@/components/sections/AboutCTA";
import SkillsStack from "@/components/sections/SkillsStack";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Animated grid-scan background (no mouse parallax) */}
        <GridScan className="z-0" />
        {/* smooth fade into the page background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-b from-transparent to-background"
        />

        <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-gradient text-6xl font-bold leading-[0.95] tracking-tighter drop-shadow-[0_4px_40px_rgba(139,92,246,0.35)] sm:text-8xl lg:text-[10rem]">
          <DecryptedText
            text="Juan Perez"
            animateOn="view"
            sequential
            speed={70}
            revealDirection="center"
            startDelay={200}
          />
        </h1>

        <p className="mt-6 text-xl font-semibold tracking-wide text-foreground sm:text-3xl">
          <DecryptedText
            text="AI-First Software Engineer"
            animateOn="view"
            speed={40}
            maxIterations={16}
            startDelay={1100}
          />
        </p>

        <p className="mt-6 max-w-xl text-balance text-sm leading-relaxed text-dim sm:text-base">
          <DecryptedText
            text="I turn LLMs into production systems that run real businesses — LLM assistants, RAG, agentic apps & intelligent automation."
            animateOn="view"
            speed={26}
            maxIterations={12}
            startDelay={1900}
          />
          <br className="hidden sm:block" />
          <span className="text-foreground/80">
            <DecryptedText
              text="Curious? Ask my AI assistant anything about my work."
              animateOn="view"
              speed={26}
              maxIterations={12}
              startDelay={2500}
            />
          </span>
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <AskAi startDelay={3000} />
          <a
            href="https://github.com/Juanllenato"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent-light"
          >
            <DecryptedText
              text="View GitHub"
              animateOn="view"
              speed={28}
              maxIterations={10}
              startDelay={3000}
            />
          </a>
        </div>
        </div>

        <p className="mono-label absolute bottom-8 z-10 animate-pulse">
          ↓ scroll to explore
        </p>
      </section>

      {/* Projects — CardSwap of live production sites */}
      <ProjectsShowcase />

      {/* Trusted by — blueprint grid with scramble-reveal logos */}
      <TrustedBy />

      {/* About + CTA (Evervault-style glowing panel) */}
      <AboutCTA />

      {/* Skills — scroll stack */}
      <SkillsStack />

      {/* FAQ — accordion */}
      <Faq />

      {/* Footer */}
      <Footer />
    </main>
  );
}
