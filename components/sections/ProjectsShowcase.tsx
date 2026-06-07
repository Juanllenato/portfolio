"use client";

import { useState } from "react";
import CardSwap, { Card } from "@/components/effects/CardSwap";
import ProjectModal, { type Project } from "./ProjectModal";

const PROJECTS: Project[] = [
  {
    name: "PrevenSalud AI CRM",
    url: "https://crm.prevensalud.pe",
    domain: "crm.prevensalud.pe",
    tagline: "Contextual LLM assistant · OCR · automated reporting",
    badge: "Production · AI",
    image: "/projects/crm-prevensalud.png",
    role: "Design, architecture & full-stack development",
    description:
      "Replaced manual finance, reporting and customer-management work with a multi-tenant AI CRM deployed in production. A contextual LLM assistant (RAG over live business data, PII-free) answers questions by conversation, an OCR-over-WhatsApp pipeline replaces manual invoice entry, and a Celery layer automates nightly PDF reporting — all isolated per company via PostgreSQL row-level security.",
    stack: ["Python", "FastAPI", "PostgreSQL (RLS)", "LLM", "RAG", "OCR", "Celery", "Docker"],
    github: "https://github.com/Juanllenato/prevensalud-ai-crm",
  },
  {
    name: "PrevenSalud",
    url: "https://prevensalud.pe",
    domain: "prevensalud.pe",
    tagline: "Healthcare platform · custom build",
    badge: "Production",
    image: "/projects/prevensalud.png",
    role: "Full-stack web development & deployment",
    description:
      "Deployed and maintained in production as the public face of a preventive-health company. Built from scratch as a custom Astra child theme with bespoke page templates (booking, treatments catalog), a design-token system, GSAP motion and a fully responsive, mobile-first layout.",
    stack: ["WordPress", "Custom Astra child theme", "PHP", "GSAP", "CSS", "Responsive"],
  },
  {
    name: "Grupo Alianza Vital",
    url: "https://grupoalianzavital.com",
    domain: "grupoalianzavital.com",
    tagline: "Corporate platform · WhatsApp-first commerce",
    badge: "Production",
    image: "/projects/alianza-vital.png",
    role: "Design system & full-stack development",
    description:
      "Live corporate/commerce platform that replaces the traditional cart with a WhatsApp-first ordering flow. Built on a hand-designed “Liquid Glass” system with a section-based modular architecture (isolated PHP + CSS + JS per section) and custom WooCommerce styling.",
    stack: ["WordPress", "WooCommerce", "PHP", "Custom design system", "JavaScript", "CSS"],
    github: "https://github.com/Juanllenato/wordpress-astra-themes",
  },
  {
    name: "Pontebela",
    url: "https://pontebela.com.co",
    domain: "pontebela.com.co",
    tagline: "Shopify store · AI-generated creatives",
    badge: "E-commerce · AI",
    image: "/projects/pontebela.png",
    role: "Shopify build & AI creative direction",
    description:
      "Shopify storefront for a supplements brand, deployed and running in production with a custom catalog and sales flows. I also produced all of the brand's advertising imagery end-to-end using AI image generation (Nano Banana / Gemini), from concept to final creative.",
    stack: ["Shopify", "Liquid", "E-commerce", "AI Image Generation (Nano Banana)", "Creative Direction"],
  },
];

export default function ProjectsShowcase() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-12 px-6 py-24 lg:flex-row lg:items-center"
    >
      {/* Left — copy */}
      <div className="lg:w-1/2">
        <span className="mono-label">SECTION_01 // IN PRODUCTION</span>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Live systems,
          <br />
          <span className="text-accent-light">real businesses.</span>
        </h2>
        <p className="mt-6 max-w-md text-dim">
          Not demos — software running in production for real companies across
          Colombia &amp; Peru. Click a card to open the live site.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {["AI / LLM", "RAG", "OCR", "Automation", "Full-stack"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-border px-3 py-1 font-mono text-xs text-dim"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile — tappable grid (CardSwap is desktop-only) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {PROJECTS.map((p) => (
          <button
            key={p.domain}
            onClick={() => setActive(p)}
            className="group overflow-hidden rounded-xl border border-border bg-[#0e0e12] text-left transition active:scale-[0.98]"
          >
            <div className="relative aspect-video overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 to-transparent p-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-white">{p.name}</h3>
                  <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent-light">
                    {p.badge}
                  </span>
                </div>
                <p className="mt-0.5 font-mono text-[11px] text-dim">{p.domain}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Desktop — card stack */}
      <div className="relative hidden h-[640px] lg:block lg:w-1/2">
        <CardSwap
          width={620}
          height={440}
          cardDistance={64}
          verticalDistance={68}
          delay={3800}
          skewAmount={5}
          pauseOnHover={false}
          easing="elastic"
          onCardClick={(i) => setActive(PROJECTS[i])}
        >
          {PROJECTS.map((p) => (
            <Card key={p.domain}>
              <div className="flex h-full w-full flex-col">
                {/* browser chrome */}
                <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 truncate font-mono text-[11px] text-dim">
                    {p.domain}
                  </span>
                </div>
                {/* screenshot */}
                <div className="relative flex-1 overflow-hidden bg-[#0b0b0f]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top opacity-95"
                  />
                  {/* overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-bold text-white">{p.name}</h3>
                      <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[11px] text-accent-light">
                        {p.badge}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-foreground/75">{p.tagline}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>

      {/* Live preview modal (iframe, no leaving the portfolio) */}
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
