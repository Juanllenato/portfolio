"use client";

import { useState } from "react";
import CardSwap, { Card } from "@/components/effects/CardSwap";
import ProjectModal, { type Project } from "./ProjectModal";
import { useT } from "@/lib/i18n";

type ItemKey = "crm" | "sinfrontera" | "ainea" | "autos" | "bacca" | "prevensalud" | "alianza" | "pontebela";

const BASE: { key: ItemKey; name: string; url?: string; domain: string; image: string; stack: string[]; github?: string }[] = [
  {
    key: "crm",
    name: "PrevenSalud AI CRM",
    url: "https://crm.prevensalud.pe",
    domain: "crm.prevensalud.pe",
    image: "/projects/crm-prevensalud.png",
    stack: ["Python", "FastAPI", "PostgreSQL (RLS)", "LLM", "RAG", "OCR", "Celery", "Docker"],
    github: "https://github.com/Juanllenato/prevensalud-ai-crm",
  },
  {
    key: "sinfrontera",
    name: "Sin Frontera — AI Sales Agent",
    url: "https://sinfrontera.aineatech.com",
    domain: "sinfrontera.aineatech.com",
    image: "/projects/ai-sinfrontera.png",
    stack: ["TypeScript", "Node.js", "Fastify", "React", "Supabase Postgres", "pgvector", "pg-boss", "Claude", "Together AI", "WhatsApp Cloud API"],
  },
  {
    key: "ainea",
    name: "Ainea — AI Sales Platform & CRM",
    url: "https://app.aineatech.com",
    domain: "app.aineatech.com",
    image: "/projects/ai-ainea.png",
    stack: ["TypeScript", "Fastify", "PostgreSQL (RLS)", "pgvector", "Redis", "Meta Graph API", "Shopify", "Stripe", "n8n"],
  },
  {
    key: "autos",
    name: "Ainea Autos",
    url: "https://autos.aineatech.com",
    domain: "autos.aineatech.com",
    image: "/projects/ai-autos.png",
    stack: ["TypeScript", "Fastify", "React", "PostgreSQL (RLS)", "DeepSeek", "Together AI", "WhatsApp Cloud API", "Google Sheets"],
  },
  {
    key: "bacca",
    name: "BACCA — Restaurant AI Agent",
    domain: "WhatsApp · Bucaramanga, CO",
    image: "/projects/ai-bacca.png",
    stack: ["TypeScript", "Fastify", "Drizzle", "PostgreSQL (RLS)", "pg-boss", "Claude", "Deepgram", "WhatsApp Cloud API"],
  },
  {
    key: "prevensalud",
    name: "PrevenSalud",
    url: "https://prevensalud.pe",
    domain: "prevensalud.pe",
    image: "/projects/prevensalud.png",
    stack: ["WordPress", "Custom Astra child theme", "PHP", "GSAP", "CSS", "Responsive"],
  },
  {
    key: "alianza",
    name: "Grupo Alianza Vital",
    url: "https://grupoalianzavital.com",
    domain: "grupoalianzavital.com",
    image: "/projects/alianza-vital.png",
    stack: ["WordPress", "WooCommerce", "PHP", "Custom design system", "JavaScript", "CSS"],
    github: "https://github.com/Juanllenato/wordpress-astra-themes",
  },
  {
    key: "pontebela",
    name: "Pontebela",
    url: "https://pontebela.com.co",
    domain: "pontebela.com.co",
    image: "/projects/pontebela.png",
    stack: ["Shopify", "Liquid", "E-commerce", "AI Image Generation (Nano Banana)", "Creative Direction"],
  },
];

export default function ProjectsShowcase() {
  const { t } = useT();
  const PROJECTS: Project[] = BASE.map((b) => ({
    ...b,
    tagline: t.projects.items[b.key].tagline,
    badge: t.projects.items[b.key].badge,
    role: t.projects.items[b.key].role,
    description: t.projects.items[b.key].description,
    labels: {
      stack: t.projects.stackLabel,
      role: t.projects.roleLabel,
      openLive: t.projects.openLive,
      viewGithub: t.projects.viewGithub,
      open: t.projects.open,
    },
  }));
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-12 px-6 py-24 lg:flex-row lg:items-center"
    >
      {/* Left — copy */}
      <div className="lg:w-1/2">
        <span className="mono-label">{t.projects.label}</span>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {t.projects.titleA}
          <br />
          <span className="text-accent-light">{t.projects.titleB}</span>
        </h2>
        <p className="mt-6 max-w-md text-dim">
          {t.projects.blurb}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {t.projects.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 font-mono text-xs text-dim"
            >
              {tag}
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
          cardDistance={36}
          verticalDistance={32}
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
