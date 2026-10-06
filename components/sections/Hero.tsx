"use client";

import GridScan from "@/components/effects/GridScan";
import DecryptedText from "@/components/effects/DecryptedText";
import AskAi from "@/components/sections/AskAi";
import { useT } from "@/lib/i18n";

export default function Hero() {
  const { t, lang } = useT();
  // re-mount the decrypt animations when the language changes
  const k = lang;
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <GridScan className="z-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-b from-transparent to-background"
      />

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-gradient text-6xl font-bold leading-[0.95] tracking-tighter drop-shadow-[0_4px_40px_rgba(139,92,246,0.35)] sm:text-8xl lg:text-[10rem]">
          <DecryptedText
            key={`title-${k}`}
            text={t.hero.title}
            animateOn="view"
            sequential
            speed={70}
            revealDirection="center"
            startDelay={200}
          />
        </h1>

        <p className="mt-6 text-xl font-semibold tracking-wide text-foreground sm:text-3xl">
          <DecryptedText
            key={`sub-${k}`}
            text={t.hero.subtitle}
            animateOn="view"
            speed={40}
            maxIterations={16}
            startDelay={1100}
          />
        </p>

        <p className="mt-6 max-w-xl text-balance text-sm leading-relaxed text-dim sm:text-base">
          <DecryptedText
            key={`l1-${k}`}
            text={t.hero.line1}
            animateOn="view"
            speed={26}
            maxIterations={12}
            startDelay={1900}
          />
          <br className="hidden sm:block" />
          <span className="text-foreground/80">
            <DecryptedText
              key={`l2-${k}`}
              text={t.hero.line2}
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
              key={`gh-${k}`}
              text={t.hero.github}
              animateOn="view"
              speed={28}
              maxIterations={10}
              startDelay={3000}
            />
          </a>
        </div>
      </div>

      <p className="mono-label absolute bottom-8 z-10 animate-pulse">{t.hero.scroll}</p>
    </section>
  );
}
