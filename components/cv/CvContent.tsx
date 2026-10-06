"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

type Job = { role: string; org: string; period: string; bullets: string[] };
type Proj = { name: string; desc: string; url?: string; status?: string };
type Edu = { school: string; detail: string; status: string };

type CvDict = {
  back: string;
  download: string;
  role: string;
  contactRemote: string;
  sections: {
    summary: string;
    highlights: string;
    experience: string;
    skills: string;
    projects: string;
    education: string;
    keywords: string;
  };
  summary: string;
  highlights: string[];
  experience: Job[];
  projects: Proj[];
  education: Edu[];
  keywords: string;
};

const skills = [
  "LLM Applications", "Agentic AI", "AI Agents", "Tool / Function Calling", "Structured Outputs",
  "Context Engineering", "Prompt Caching", "RAG Pipelines", "Hybrid Search (FTS + Vectors + RRF)",
  "LLM Evaluation", "LLM-as-Judge", "Guardrails", "Prompt-Injection Defense", "AI Observability",
  "Speech-to-Text", "OCR / Document AI", "Multimodal AI", "pgvector", "Embeddings",
  "Claude", "OpenAI", "Together AI", "DeepSeek", "LangChain", "LangGraph",
  "TypeScript", "Node.js", "Fastify", "Zod", "Drizzle", "Python", "FastAPI", "Celery",
  "PostgreSQL", "Supabase", "Row-Level Security", "Redis", "pg-boss",
  "WhatsApp Cloud API", "Meta CAPI", "Shopify", "Stripe", "n8n", "Webhooks & Idempotency",
  "Docker", "GitHub Actions CI/CD", "Linux / VPS",
  "React", "Next.js", "React Native", "Tailwind",
];

const en: CvDict = {
  back: "← Back",
  download: "Download PDF",
  role: "Senior AI Engineer · LLM Agents & Production AI Systems",
  contactRemote: "Based in Colombia · Working remotely with US & LatAm teams",
  sections: {
    summary: "Professional Summary",
    highlights: "Key Achievements",
    experience: "Experience",
    skills: "Technical Skills",
    projects: "Selected AI Products",
    education: "Education",
    keywords: "Keywords",
  },
  summary:
    "Senior AI Engineer with 5+ years building software and 3+ years shipping LLM systems to production. I lead AI product engineering at AINEATECH (Houston, TX), where I designed and built 7 AI products for businesses in Colombia and Peru: WhatsApp AI sales agents for real estate, car dealerships and restaurants, a multi-tenant AI sales SaaS, and two AI CRMs (one with 120+ active users). I build reliable agents, not demos: strict tool schemas, deterministic guardrails, eval suites with LLM-as-judge, multi-tenant security and cost-aware model routing.",
  highlights: [
    "Designed a reusable production agent architecture (tool-use loop, strict-schema tools, deterministic guards, human handoff, Postgres RLS multi-tenancy, eval harness) and reused it across 4 verticals. Launched a new vertical (car dealerships) on it in 2 days.",
    "Architected a production AI CRM with 120+ active users across multiple companies in Colombia and Peru (RAG assistant, OCR invoices over WhatsApp, automated reporting).",
    "Eval-first engineering: 1,500+ automated tests and 75+ eval scenarios (simulated customers, deterministic graders, LLM-as-judge). The real-estate agent's baseline showed 0 data leaks and 0 ungrounded figures.",
  ],
  experience: [
    {
      role: "Senior AI Engineer — Lead, AI Products",
      org: "AINEATECH — Houston, TX, USA (Remote)",
      period: "2023 – Present",
      bullets: [
        "Lead the end-to-end delivery of the company's AI products: architecture, LLM and prompt design, evals, security, CI/CD and production operations.",
        "Build agents as systems, not prompts: custom tool-use loops on the Claude Messages API with Zod strict-schema tools, structured outputs, versioned prompts and prompt caching. The agent cannot confirm an order or booking unless the tool call succeeded.",
        "Built deterministic output guards (data-leak canaries, price grounding against the catalog, policy checks) with one regeneration and a safe fallback, plus rule-based escalation to humans.",
        "Cost-aware LLM routing across Anthropic Claude (Opus/Sonnet) and open-weight models on Together AI (DeepSeek, Kimi, GLM), with fallbacks, per-turn cost tracking and benchmark-based model selection.",
        "Multi-tenant Postgres row-level security, AES-256-GCM encrypted credentials and \"new client = configuration, not code\" onboarding. Deep Meta integration: WhatsApp Cloud API, Coexistence, Embedded Signup, Conversions API, Marketing API.",
        "Production ops: Docker + Caddy on Hetzner, GitHub Actions CI/CD with automatic rollback, pg-boss queues, shadow-mode pilots with human review, ADRs and runbooks for every product.",
        "Also delivered 4+ production web and e-commerce platforms and n8n AI automations for clients (Pontebela, PrevenSalud, Grupo Alianza Vital).",
      ],
    },
  ],
  projects: [
    { name: "Sin Frontera — AI Sales Agent for B2B Real Estate (Colombia)", status: "Pilot", url: "sinfrontera.aineatech.com", desc: "WhatsApp agent for an industrial real-estate firm (about 100 properties, 1,200–1,500 leads/month) that qualifies leads and books site visits. Hybrid retrieval (SQL filters + Spanish full-text + pgvector/Voyage embeddings, fused with RRF), 11 agent tools plus a 12-tool internal assistant for the team. 43 eval scenarios with an LLM judge, 540+ tests, 30 ADRs. Running as a supervised shadow-mode pilot." },
    { name: "Ainea — WhatsApp AI Sales Agent SaaS", status: "Deployed", url: "app.aineatech.com", desc: "Multi-tenant SaaS for LatAm SMBs covering the full loop: Meta ad → WhatsApp chat → AI sales agent → store order → CAPI purchase event → repurchase. Embedded Signup onboarding, WhatsApp Coexistence, Shopify draft orders, Marketing API campaigns, Stripe Billing. 760+ tests." },
    { name: "Ainea CRM — Sales Team CRM", status: "Live", url: "app.aineatech.com", desc: "Leads with round-robin routing, clients, Google Meet scheduling, email campaigns with automatic follow-up, metrics and commissions. \"The app decides, n8n executes\" through an HMAC-signed transactional outbox; Google SSO and 3 roles." },
    { name: "Ainea Autos — AI Platform for Used-Car Dealerships (Colombia & Peru)", status: "Deployed", url: "autos.aineatech.com", desc: "Multi-tenant platform: a 24/7 WhatsApp buyer agent (inventory search, server-side financing calculator, trade-in, test-drive booking), a web CRM and a 27-tool assistant for owners and salespeople with propose-then-confirm actions and proactive alerts." },
    { name: "Restaurant AI Agent — BACCA, 3 locations (Bucaramanga, Colombia)", status: "Pilot", desc: "Multi-tenant WhatsApp agent on Claude for orders and table reservations: 13 strict tools, 4 deterministic guards (every price must match the menu), seat-capacity booking with Postgres advisory locks, voice notes and menu extraction from photos/PDF. 240+ tests, 13 eval scenarios." },
    { name: "PrevenSalud AI CRM (Peru)", status: "Live · 120+ users", url: "crm.prevensalud.pe", desc: "Production multi-tenant AI CRM: RAG assistant over live business data (PII-free), cost-first OCR invoice pipeline over WhatsApp and AI-written nightly PDF reports. Python, FastAPI, PostgreSQL RLS, Celery." },
    { name: "Agentic AI Health Coach (mobile)", url: "github.com/Juanllenato/plataforma-bienestar-ai", desc: "AI coach that runs an entire React Native app through chat, orchestrating 13 tools (RAG on pgvector, vision meal logging, health projection)." },
    { name: "Open source: LLM Eval Harness · n8n AI Automations", url: "github.com/Juanllenato", desc: "LLM evaluation harness with versioned datasets, LLM-as-judge and CI gating; n8n workflows for support triage, BANT lead scoring and invoice approval with human-in-the-loop." },
  ],
  education: [
    { school: "UTS — Unidades Tecnológicas de Santander", detail: "Systems Engineering", status: "In progress" },
    { school: "UTS — Unidades Tecnológicas de Santander", detail: "Technologist in Software Systems Development", status: "Completed" },
  ],
  keywords:
    "Senior AI Engineer · AI Engineer · Applied AI Engineer · Agentic AI Engineer · LLM Engineer · AI Automation Engineer · GenAI Engineer · Full-Stack AI Engineer · LLM · AI Agents · WhatsApp AI Agents · Tool Calling · Structured Outputs · RAG · Hybrid Search · pgvector · Embeddings · LLM Evaluation · LLM-as-Judge · Guardrails · Prompt Caching · Context Engineering · OCR · Document AI · Speech-to-Text · Claude · OpenAI · Together AI · LangChain · LangGraph · TypeScript · Node.js · Fastify · Python · FastAPI · PostgreSQL · Supabase · Row-Level Security · Redis · Multi-tenant SaaS · WhatsApp Cloud API · Meta CAPI · Shopify · Stripe · n8n · Docker · CI/CD · Production AI · Remote",
};

const es: CvDict = {
  back: "← Volver",
  download: "Descargar PDF",
  role: "Ingeniero de IA Senior · Agentes LLM y Sistemas de IA en Producción",
  contactRemote: "Radicado en Colombia · Trabajo remoto con equipos de EE. UU. y LatAm",
  sections: {
    summary: "Resumen Profesional",
    highlights: "Logros Clave",
    experience: "Experiencia",
    skills: "Habilidades Técnicas",
    projects: "Productos de IA Destacados",
    education: "Educación",
    keywords: "Palabras Clave",
  },
  summary:
    "Ingeniero de IA Senior con más de 5 años construyendo software y más de 3 años llevando sistemas con LLM a producción. Lidero la ingeniería de productos de IA en AINEATECH (Houston, TX), donde diseñé y construí 7 productos de IA para empresas de Colombia y Perú: agentes de ventas con IA por WhatsApp para inmobiliarias, concesionarios y restaurantes, un SaaS multi-tenant de ventas con IA y dos CRM con IA (uno con más de 120 usuarios activos). Construyo agentes confiables, no demos: herramientas con esquemas estrictos, guardas deterministas, evaluaciones con LLM como juez, seguridad multi-tenant y selección de modelos según costo.",
  highlights: [
    "Diseñé una arquitectura de agentes reutilizable en producción (loop de herramientas, esquemas estrictos, guardas deterministas, traspaso a humanos, multi-tenancy con RLS en Postgres, harness de evaluación) y la reutilicé en 4 verticales. Sobre ella lancé una vertical nueva (concesionarios) en 2 días.",
    "Diseñé un CRM con IA en producción con más de 120 usuarios activos en varias empresas de Colombia y Perú (asistente RAG, OCR de facturas por WhatsApp, reportes automáticos).",
    "Ingeniería guiada por evaluaciones: más de 1.500 pruebas automatizadas y más de 75 escenarios de evaluación (clientes simulados, evaluadores deterministas, LLM como juez). La línea base del agente inmobiliario dio 0 fugas de datos y 0 cifras sin fuente.",
  ],
  experience: [
    {
      role: "Ingeniero de IA Senior — Líder de Productos de IA",
      org: "AINEATECH — Houston, TX, EE. UU. (Remoto)",
      period: "2023 – Actualidad",
      bullets: [
        "Lidero de punta a punta la entrega de los productos de IA de la empresa: arquitectura, diseño de LLM y prompts, evaluaciones, seguridad, CI/CD y operación en producción.",
        "Construyo agentes como sistemas, no como prompts: loops de herramientas propios sobre la Messages API de Claude, con herramientas Zod de esquema estricto, salidas estructuradas, prompts versionados y prompt caching. El agente no puede confirmar un pedido o una reserva si la herramienta no se ejecutó con éxito.",
        "Construí guardas de salida deterministas (canarios de fuga de datos, precios validados contra el catálogo, reglas de política) con una regeneración y respuesta segura, además de escalamiento a humanos por reglas.",
        "Enrutamiento de LLM según costo entre Anthropic Claude (Opus/Sonnet) y modelos abiertos en Together AI (DeepSeek, Kimi, GLM), con fallbacks, costo medido por turno y selección de modelos con benchmarks.",
        "Multi-tenancy con row-level security en Postgres, credenciales cifradas con AES-256-GCM y alta de clientes como \"configuración, no código\". Integración profunda con Meta: WhatsApp Cloud API, Coexistencia, Embedded Signup, Conversions API, Marketing API.",
        "Operación en producción: Docker + Caddy en Hetzner, CI/CD en GitHub Actions con rollback automático, colas pg-boss, pilotos en modo sombra con revisión humana, ADRs y runbooks por producto.",
        "Además entregué más de 4 plataformas web y de e-commerce en producción y automatizaciones con IA en n8n para clientes (Pontebela, PrevenSalud, Grupo Alianza Vital).",
      ],
    },
  ],
  projects: [
    { name: "Sin Frontera — Agente de ventas con IA para inmobiliaria B2B (Colombia)", status: "Piloto", url: "sinfrontera.aineatech.com", desc: "Agente de WhatsApp para una firma de inmuebles industriales (unos 100 activos, 1.200–1.500 leads al mes) que califica leads y agenda visitas. Búsqueda híbrida (filtros SQL + texto completo en español + embeddings pgvector/Voyage, fusionados con RRF), 11 herramientas más un asistente interno de 12 herramientas para el equipo. 43 escenarios de evaluación con LLM juez, más de 540 pruebas, 30 ADRs. En piloto supervisado en modo sombra." },
    { name: "Ainea — SaaS de agente de ventas con IA por WhatsApp", status: "Desplegado", url: "app.aineatech.com", desc: "SaaS multi-tenant para pymes de LatAm con el ciclo completo: anuncio en Meta → chat de WhatsApp → agente de ventas con IA → pedido en la tienda → evento de compra en CAPI → recompra. Alta con Embedded Signup, Coexistencia de WhatsApp, pedidos en Shopify, campañas por Marketing API, Stripe Billing. Más de 760 pruebas." },
    { name: "Ainea CRM — CRM del equipo comercial", status: "En vivo", url: "app.aineatech.com", desc: "Leads con reparto round-robin, clientes, agenda con Google Meet, campañas de correo con seguimiento automático, métricas y comisiones. \"La app decide, n8n ejecuta\" mediante un outbox transaccional firmado con HMAC; inicio de sesión con Google y 3 roles." },
    { name: "Ainea Autos — Plataforma de IA para concesionarios de usados (Colombia y Perú)", status: "Desplegado", url: "autos.aineatech.com", desc: "Plataforma multi-tenant: agente comprador 24/7 por WhatsApp (inventario, simulador de financiación en el servidor, retoma, test drive), CRM web y un asistente de 27 herramientas para dueños y vendedores que propone acciones para confirmar y envía alertas proactivas." },
    { name: "Agente de IA para restaurantes — BACCA, 3 sedes (Bucaramanga, Colombia)", status: "Piloto", desc: "Agente multi-tenant de WhatsApp sobre Claude para pedidos y reservas: 13 herramientas estrictas, 4 guardas deterministas (todo precio debe coincidir con la carta), reservas con aforo usando advisory locks de Postgres, notas de voz y extracción de la carta desde fotos/PDF. Más de 240 pruebas, 13 escenarios de evaluación." },
    { name: "PrevenSalud AI CRM (Perú)", status: "En vivo · +120 usuarios", url: "crm.prevensalud.pe", desc: "CRM con IA multi-tenant en producción: asistente RAG sobre datos reales del negocio (sin datos personales), OCR de facturas por WhatsApp con enfoque de costo y reportes PDF redactados por IA cada noche. Python, FastAPI, PostgreSQL RLS, Celery." },
    { name: "Coach de salud con IA agéntica (app móvil)", url: "github.com/Juanllenato/plataforma-bienestar-ai", desc: "Coach de IA que opera toda una app React Native por chat, orquestando 13 herramientas (RAG sobre pgvector, registro de comidas por visión, proyección de salud)." },
    { name: "Código abierto: harness de evaluación de LLM · automatizaciones n8n con IA", url: "github.com/Juanllenato", desc: "Harness de evaluación de LLM con datasets versionados, LLM como juez y bloqueo en CI; flujos n8n de triage de soporte, calificación de leads BANT y aprobación de facturas con aprobación humana." },
  ],
  education: [
    { school: "UTS — Unidades Tecnológicas de Santander", detail: "Ingeniería de Sistemas", status: "En curso" },
    { school: "UTS — Unidades Tecnológicas de Santander", detail: "Tecnólogo en Desarrollo de Sistemas Informáticos", status: "Completado" },
  ],
  keywords:
    "Ingeniero de IA Senior · Ingeniero de IA · IA Aplicada · IA Agéntica · Ingeniero LLM · Automatización con IA · GenAI · LLM · Agentes de IA · Agentes de WhatsApp con IA · Tool Calling · Salidas Estructuradas · RAG · Búsqueda Híbrida · pgvector · Embeddings · Evaluación de LLM · LLM como Juez · Guardas · Prompt Caching · Context Engineering · OCR · Document AI · Voz a Texto · Claude · OpenAI · Together AI · LangChain · LangGraph · TypeScript · Node.js · Fastify · Python · FastAPI · PostgreSQL · Supabase · Row-Level Security · Redis · SaaS Multi-tenant · WhatsApp Cloud API · Meta CAPI · Shopify · Stripe · n8n · Docker · CI/CD · IA en Producción · Remoto",
};

const CV = { en, es };

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mono-label cv-label mb-3 border-b cv-rule border-border pb-2">{label}</h2>
      {children}
    </section>
  );
}

export default function CvContent() {
  const { lang } = useLang();
  const c = CV[lang];

  return (
    <main className="cv-root min-h-screen bg-background px-4 py-10 text-foreground sm:px-6">
      <div className="mx-auto mb-6 flex max-w-3xl items-center justify-between no-print">
        <Link href="/" className="font-mono text-xs uppercase tracking-widest text-dim transition-colors hover:text-accent-light">
          {c.back}
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent-light"
            aria-label={c.download}
          >
            {c.download}
          </button>
        </div>
      </div>

      <article className="cv-sheet surface mx-auto max-w-3xl rounded-xl p-8 sm:p-10">
        {/* Header */}
        <header className="flex items-start gap-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/profile.png"
            alt="Juan Perez"
            className="h-20 w-20 shrink-0 rounded-full border border-border object-cover sm:h-24 sm:w-24"
          />
          <div>
            <h1 className="cv-name text-gradient text-3xl font-bold tracking-tight sm:text-4xl">Juan Perez</h1>
            <p className="cv-accent mt-1 font-mono text-sm uppercase tracking-widest text-accent-light">
              {c.role}
            </p>
            <div className="cv-text mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-dim">
              <a href="https://github.com/Juanllenato" className="cv-accent hover:text-accent-light">github.com/Juanllenato</a>
              <a href="https://linkedin.com/in/juan-perez-ai-engineer" className="cv-accent hover:text-accent-light">linkedin.com/in/juan-perez-ai-engineer</a>
              <a href="mailto:juans.perezc@gmail.com" className="cv-accent hover:text-accent-light">juans.perezc@gmail.com</a>
              <a href="https://juan-perez-ai.vercel.app" className="cv-accent hover:text-accent-light">juan-perez-ai.vercel.app</a>
              <span>{c.contactRemote}</span>
            </div>
          </div>
        </header>

        {/* Summary */}
        <Section label={c.sections.summary}>
          <p className="cv-text text-sm leading-relaxed text-dim">{c.summary}</p>
        </Section>

        {/* Key Achievements */}
        <Section label={c.sections.highlights}>
          <ul className="space-y-1.5">
            {c.highlights.map((h) => (
              <li key={h} className="cv-text relative pl-4 text-sm leading-relaxed text-dim before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
                {h}
              </li>
            ))}
          </ul>
        </Section>

        {/* Experience */}
        <Section label={c.sections.experience}>
          {c.experience.map((job) => (
            <div key={job.role} className="mb-5 last:mb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="cv-text text-base font-semibold text-foreground">
                  {job.role} <span className="cv-accent font-normal text-accent-light">@ {job.org}</span>
                </h3>
                <span className="cv-muted font-mono text-xs text-dim">{job.period}</span>
              </div>
              <ul className="mt-2 space-y-1.5">
                {job.bullets.map((b) => (
                  <li key={b} className="cv-text relative pl-4 text-sm leading-relaxed text-dim before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-accent">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* Skills */}
        <Section label={c.sections.skills}>
          <ul className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <li key={s} className="cv-chip cv-text rounded-md border border-border bg-background/40 px-2.5 py-1 font-mono text-xs text-dim">{s}</li>
            ))}
          </ul>
        </Section>

        {/* Selected AI Products */}
        <Section label={c.sections.projects}>
          {c.projects.map((p) => (
            <div key={p.name} className="mb-3 last:mb-0">
              <h3 className="cv-text text-sm font-semibold text-foreground">
                {p.name}
                {p.status && (
                  <span className="cv-chip ml-2 inline-block rounded border border-border px-1.5 py-0.5 align-middle font-mono text-[10px] font-normal uppercase tracking-wider text-accent-light">
                    {p.status}
                  </span>
                )}
                {p.url && (
                  <>
                    {" — "}
                    <a href={`https://${p.url}`} className="cv-accent font-normal text-accent-light">{p.url}</a>
                  </>
                )}
              </h3>
              <p className="cv-muted text-xs leading-relaxed text-dim">{p.desc}</p>
            </div>
          ))}
        </Section>

        {/* Education */}
        <Section label={c.sections.education}>
          {c.education.map((e) => (
            <div key={e.detail} className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 last:mb-0">
              <div>
                <h3 className="cv-text text-sm font-semibold text-foreground">{e.detail}</h3>
                <p className="cv-muted text-xs text-dim">{e.school}</p>
              </div>
              <span className="cv-accent font-mono text-xs text-accent-light">{e.status}</span>
            </div>
          ))}
        </Section>

        {/* Keywords (ATS) */}
        <Section label={c.sections.keywords}>
          <p className="cv-muted font-mono text-[11px] leading-relaxed text-dim">{c.keywords}</p>
        </Section>
      </article>
    </main>
  );
}
