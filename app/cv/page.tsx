import type { Metadata } from "next";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: "Juan Perez — CV",
  description:
    "Curriculum Vitae of Juan Perez, AI-First Software Engineer building production LLM, RAG and agentic AI systems.",
};

const printStyles = `
  @media print {
    @page { margin: 14mm; }
    html, body { background: #ffffff !important; }
    .no-print { display: none !important; }
    .cv-root { background: #ffffff !important; color: #111111 !important; padding: 0 !important; }
    .cv-sheet { background: #ffffff !important; border: none !important; box-shadow: none !important; max-width: 100% !important; padding: 0 !important; }
    .cv-name { color: #111111 !important; -webkit-text-fill-color: #111111 !important; }
    .cv-muted { color: #444444 !important; }
    .cv-text { color: #1a1a1a !important; }
    .cv-label { color: #6d28d9 !important; }
    .cv-accent { color: #6d28d9 !important; }
    .cv-rule { border-color: #d4d4d4 !important; }
    .cv-chip { background: #f4f1fb !important; border-color: #d8cdf5 !important; color: #3b2a66 !important; }
    a { color: #6d28d9 !important; text-decoration: none !important; }
  }
`;

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mono-label cv-label mb-3 border-b cv-rule border-border pb-2">{label}</h2>
      {children}
    </section>
  );
}

const experience = [
  {
    role: "AI-First Software Engineer",
    org: "AINEATECH",
    period: "2023 – Present · Remote · Colombia & Peru",
    bullets: [
      "Architected and shipped a multi-tenant AI CRM to production: a contextual LLM assistant (RAG over live business data, PII-free) for natural-language queries, an OCR-over-WhatsApp pipeline that eliminated manual invoice entry, and automated nightly PDF reporting — isolated per company with PostgreSQL row-level security.",
      "Engineered an agentic mobile AI coach that operates an entire application through conversation, orchestrating 13 tools (RAG over pgvector, vision-based logging, predictive projection) via an LLM tool-calling loop.",
      "Designed enterprise automation workflows (n8n) with AI decisioning, validation and human-in-the-loop approval across support, sales and finance — replacing manual operations end to end.",
      "Built an LLM evaluation & observability harness (versioned datasets, metrics, LLM-as-judge, CI gating) to catch quality regressions before release.",
      "Integrated LLM, OCR, email, messaging and payment APIs; deployed containerized services with Docker and CI/CD; hardened endpoints with rate limiting, input validation and security headers.",
      "Delivered 4+ production web and e-commerce platforms and produced AI-generated brand creatives (Gemini / Nano Banana).",
    ],
  },
];

const skills = [
  "Python", "FastAPI", "REST APIs", "PostgreSQL", "pgvector", "Redis",
  "LLMs (OpenAI / Claude / Llama)", "RAG", "AI Agents", "Agentic Workflows",
  "LangChain", "LangGraph", "Tool Calling", "Prompt Engineering", "LLM Evaluation",
  "OCR / Document AI", "Vector Databases", "Embeddings",
  "n8n", "Workflow Orchestration", "Automation", "API Integrations",
  "Next.js", "React", "React Native", "TypeScript", "Docker", "CI/CD", "Cloud Deployment",
];

const projects = [
  { name: "PrevenSalud AI CRM", desc: "Production multi-tenant AI CRM — LLM assistant (RAG), OCR pipeline, automated reporting.", url: "github.com/Juanllenato/prevensalud-ai-crm" },
  { name: "Agentic AI Health App", desc: "Mobile AI coach orchestrating 13 tools (RAG, vision, projection) via tool calling.", url: "github.com/Juanllenato/plataforma-bienestar-ai" },
  { name: "Enterprise AI Automations", desc: "n8n workflows with AI decisioning, fraud checks and human-in-the-loop approval.", url: "github.com/Juanllenato/n8n-workflows" },
  { name: "LLM Eval & Observability Harness", desc: "Versioned datasets, metrics, LLM-as-judge and CI gating for AI quality.", url: "github.com/Juanllenato/llm-eval-harness" },
];

const education = [
  { school: "UTS — Unidades Tecnológicas de Santander", detail: "Systems Engineering", status: "In progress" },
  { school: "UTS — Unidades Tecnológicas de Santander", detail: "Technologist in Software Systems Development", status: "Completed" },
];

const keywords =
  "AI Engineer · Applied AI Engineer · Agentic AI Engineer · AI Automation Engineer · AI Integrations Engineer · Full-Stack AI Engineer · LLM · Large Language Models · RAG · Retrieval-Augmented Generation · AI Agents · Tool Calling · LangChain · LangGraph · Prompt Engineering · Vector Databases · pgvector · Embeddings · OCR · Document AI · Python · FastAPI · REST APIs · PostgreSQL · Redis · n8n · Workflow Orchestration · Automation · API Integration · Next.js · React · React Native · TypeScript · Docker · CI/CD · Cloud Deployment · Multi-tenant · Production AI · GenAI";

export default function CvPage() {
  return (
    <main className="cv-root min-h-screen bg-background px-4 py-10 text-foreground sm:px-6">
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      <div className="mx-auto mb-6 flex max-w-3xl items-center justify-between no-print">
        <a href="/" className="font-mono text-xs uppercase tracking-widest text-dim transition-colors hover:text-accent-light">
          ← Back
        </a>
        <div className="flex items-center gap-3">
          <a href="/Juan_Perez_AI_Engineer_CV.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent-light">
            Download PDF
          </a>
          <PrintButton />
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
              AI-First Software Engineer
            </p>
            <div className="cv-text mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-dim">
              <a href="https://github.com/Juanllenato" className="cv-accent hover:text-accent-light">github.com/Juanllenato</a>
              <a href="https://linkedin.com/in/juan-perez-ai-engineer" className="cv-accent hover:text-accent-light">linkedin.com/in/juan-perez-ai-engineer</a>
              <a href="mailto:juans.perezc@gmail.com" className="cv-accent hover:text-accent-light">juans.perezc@gmail.com</a>
              <a href="https://juan-perez-ai.vercel.app" className="cv-accent hover:text-accent-light">juan-perez-ai.vercel.app</a>
              <span>Remote · Colombia &amp; Peru</span>
            </div>
          </div>
        </header>

        {/* Summary */}
        <Section label="Professional Summary">
          <p className="cv-text text-sm leading-relaxed text-dim">
            Applied AI Engineer with 5+ years building and shipping production software, now specialized in
            AI-first systems. I design and deploy LLM applications, RAG pipelines, agentic AI workflows,
            OCR/document automation and backend integrations that run real businesses — currently in
            production for multiple companies across Colombia &amp; Peru. Execution-focused, full-stack and
            startup-ready: I take products from data model to deployment.
          </p>
        </Section>

        {/* Experience */}
        <Section label="Experience">
          {experience.map((job) => (
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
        <Section label="Technical Skills">
          <ul className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <li key={s} className="cv-chip cv-text rounded-md border border-border bg-background/40 px-2.5 py-1 font-mono text-xs text-dim">{s}</li>
            ))}
          </ul>
        </Section>

        {/* Selected Projects */}
        <Section label="Selected Projects">
          {projects.map((p) => (
            <div key={p.name} className="mb-3 last:mb-0">
              <h3 className="cv-text text-sm font-semibold text-foreground">
                {p.name} — <a href={`https://${p.url}`} className="cv-accent font-normal text-accent-light">{p.url}</a>
              </h3>
              <p className="cv-muted text-xs leading-relaxed text-dim">{p.desc}</p>
            </div>
          ))}
        </Section>

        {/* Education */}
        <Section label="Education">
          {education.map((e) => (
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
        <Section label="Keywords">
          <p className="cv-muted font-mono text-[11px] leading-relaxed text-dim">{keywords}</p>
        </Section>
      </article>
    </main>
  );
}
