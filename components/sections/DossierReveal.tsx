"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Act 2 — "Declassify".
 * A tall scroll section: as the user scrolls, the dossier cover lifts open
 * (rotateX) revealing a classified CV that transitions from CONFIDENTIAL to
 * DECLASSIFIED. Driven by scroll progress via Framer Motion.
 */
export default function DossierReveal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Cover lifts open
  const coverRotate = useTransform(scrollYProgress, [0.05, 0.45], [0, -118]);
  const coverShadow = useTransform(scrollYProgress, [0.05, 0.45], [0.6, 0]);
  // CV reveal
  const cvY = useTransform(scrollYProgress, [0.25, 0.6], [40, 0]);
  const cvOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const cvScale = useTransform(scrollYProgress, [0.25, 0.6], [0.96, 1]);
  // Stamp: CONFIDENTIAL -> DECLASSIFIED
  const strikeScaleX = useTransform(scrollYProgress, [0.68, 0.86], [0, 1]);
  const confidentialOpacity = useTransform(scrollYProgress, [0.7, 0.86], [1, 0.3]);
  const declassOpacity = useTransform(scrollYProgress, [0.82, 1], [0, 1]);
  const declassY = useTransform(scrollYProgress, [0.82, 1], [10, 0]);

  return (
    <section ref={ref} id="dossier" className="relative h-[280vh] bg-background">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <span className="mono-label mb-8">SECTION_01 // CLASSIFIED DOSSIER</span>

        <div
          className="relative h-[460px] w-full max-w-[640px]"
          style={{ perspective: 1600 }}
        >
          {/* CV document (revealed underneath the cover) */}
          <motion.article
            style={{ y: cvY, opacity: cvOpacity, scale: cvScale }}
            className="absolute inset-0 overflow-hidden rounded-lg border border-border bg-bg-elevated p-6 sm:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <p className="mono-label">Dossier 001 // Subject</p>
                <h3 className="mt-1 text-2xl font-bold text-white">Juan Perez</h3>
                <p className="text-sm text-accent-light">
                  AI-First Software Engineer
                </p>
              </div>
              {/* Stamp */}
              <div className="relative mt-1 select-none">
                <motion.span
                  style={{ opacity: confidentialOpacity }}
                  className="block -rotate-12 rounded border-2 border-confidential px-3 py-1 font-mono text-sm font-bold tracking-widest text-confidential"
                >
                  CONFIDENTIAL
                </motion.span>
                <motion.span
                  aria-hidden
                  style={{ scaleX: strikeScaleX }}
                  className="absolute left-0 top-1/2 h-[2px] w-full origin-left -rotate-12 bg-confidential"
                />
                <motion.span
                  style={{ opacity: declassOpacity, y: declassY }}
                  className="absolute -bottom-7 right-0 -rotate-12 rounded border-2 border-accent-light px-3 py-1 font-mono text-sm font-bold tracking-widest text-accent-light"
                >
                  DECLASSIFIED
                </motion.span>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm leading-relaxed text-foreground/90">
              <p>
                Builds <span className="text-accent-light">production AI systems</span>{" "}
                — LLM assistants, RAG, agentic apps &amp; intelligent automation.
              </p>
              <ul className="space-y-2 font-mono text-xs text-dim">
                <li>▸ AI CRM live in production across Colombia &amp; Peru</li>
                <li>▸ Agentic mobile coach — 13-tool orchestration (RAG, vision)</li>
                <li>▸ Enterprise n8n automations · LLM eval &amp; observability</li>
                {/* redacted lines for effect */}
                <li className="text-dim/60">
                  ▸ <span className="rounded bg-white/10 px-12 text-transparent">redacted</span>
                </li>
              </ul>
              <p className="mono-label pt-2">
                Stack // Python · FastAPI · LLM · RAG · pgvector · n8n · Docker
              </p>
            </div>
          </motion.article>

          {/* Folder cover (lifts open) */}
          <motion.div
            style={{ rotateX: coverRotate, transformOrigin: "top center" }}
            className="absolute inset-0 rounded-lg border border-border bg-gradient-to-b from-[#16161a] to-[#0d0d10]"
          >
            <div className="flex h-full flex-col items-center justify-center gap-3">
              <span className="mono-label">// RESTRICTED ACCESS</span>
              <span className="rounded border-2 border-confidential px-5 py-2 font-mono text-lg font-bold tracking-[0.3em] text-confidential">
                CONFIDENTIAL
              </span>
              <span className="text-xs text-dim">Dossier No. 001 — J. PEREZ</span>
            </div>
            {/* shadow that fades as it opens */}
            <motion.div
              style={{ opacity: coverShadow }}
              className="pointer-events-none absolute inset-0 rounded-lg bg-black"
            />
          </motion.div>
        </div>

        <p className="mono-label mt-10 animate-pulse">↓ keep scrolling</p>
      </div>
    </section>
  );
}
