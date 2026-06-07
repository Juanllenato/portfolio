import type { Metadata } from "next";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: "Juan Perez — CV",
  description:
    "Curriculum Vitae of Juan Perez, AI-First Software Engineer building production AI systems across Colombia & Peru.",
};

const printStyles = `
  @media print {
    @page { margin: 14mm; }
    html, body { background: #ffffff !important; }
    .no-print { display: none !important; }
    .cv-root { background: #ffffff !important; color: #111111 !important; padding: 0 !important; }
    .cv-sheet {
      background: #ffffff !important;
      border: none !important;
      box-shadow: none !important;
      max-width: 100% !important;
      padding: 0 !important;
    }
    .cv-name { color: #111111 !important; -webkit-text-fill-color: #111111 !important; }
    .cv-muted { color: #444444 !important; }
    .cv-text { color: #1a1a1a !important; }
    .cv-label { color: #6d28d9 !important; }
    .cv-accent { color: #6d28d9 !important; }
    .cv-rule { border-color: #d4d4d4 !important; }
    .cv-chip {
      background: #f4f1fb !important;
      border-color: #d8cdf5 !important;
      color: #3b2a66 !important;
    }
    a { color: #6d28d9 !important; text-decoration: none !important; }
  }
`;

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="mono-label cv-label mb-3 border-b cv-rule border-border pb-2">
        {label}
      </h2>
      {children}
    </section>
  );
}

const experience = [
  {
    role: "AI-First Software Engineer",
    org: "AINEATECH",
    period: "Colombia & Peru",
    bullets: [
      "Built an AI CRM in production: LLM assistant for natural-language queries and reporting, OCR-based document ingestion, and automated report generation.",
      "Designed an agentic mobile health application orchestrating 13 tools for multi-step user workflows.",
      "Delivered enterprise automations with n8n connecting internal systems and third-party services.",
      "Built an LLM evaluation harness to benchmark prompts, models, and agent behavior before release.",
    ],
  },
];

const skills = [
  "Python",
  "FastAPI",
  "PostgreSQL / pgvector",
  "LLM",
  "RAG",
  "Agentic / LangGraph",
  "OCR",
  "n8n",
  "React / Next.js",
  "React Native",
  "Docker",
];

const education = [
  {
    school: "UTS — Unidades Tecnológicas de Santander",
    detail: "Technologist in Software Systems Development",
    status: "Completed",
  },
  {
    school: "UTS — Unidades Tecnológicas de Santander",
    detail: "Systems Engineering",
    status: "In progress",
  },
];

const production = [
  "crm.prevensalud.pe",
  "prevensalud.pe",
  "grupoalianzavital.com",
  "pontebela.com.co",
];

export default function CvPage() {
  return (
    <main className="cv-root min-h-screen bg-background px-4 py-10 text-foreground sm:px-6">
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      <div className="mx-auto mb-6 flex max-w-3xl items-center justify-between no-print">
        <a
          href="/"
          className="font-mono text-xs uppercase tracking-widest text-dim transition-colors hover:text-accent-light"
        >
          ← Back
        </a>
        <div className="flex items-center gap-3">
          <a
            href="/Juan_Perez_AI_Engineer_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent-light"
          >
            Download PDF
          </a>
          <PrintButton />
        </div>
      </div>

      <article className="cv-sheet surface mx-auto max-w-3xl rounded-xl p-8 sm:p-10">
        {/* Header */}
        <header>
          <h1 className="cv-name text-gradient text-3xl font-bold tracking-tight sm:text-4xl">
            Juan Perez
          </h1>
          <p className="cv-accent mt-1 font-mono text-sm uppercase tracking-widest text-accent-light">
            AI-First Software Engineer
          </p>
          <p className="cv-text mt-4 text-sm leading-relaxed text-dim">
            Software engineer with 5+ years of experience building and shipping
            production software, now focused on AI-first systems: LLM
            assistants, retrieval, agentic orchestration, and automation.
            Working across Colombia &amp; Peru, delivering end-to-end products
            from backend and data to web and mobile.
          </p>

          <div className="cv-text mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-dim">
            <a href="https://github.com/Juanllenato" className="cv-accent hover:text-accent-light">
              github.com/Juanllenato
            </a>
            <a
              href="https://linkedin.com/in/juan-perez-ai-engineer"
              className="cv-accent hover:text-accent-light"
            >
              linkedin.com/in/juan-perez-ai-engineer
            </a>
            <a href="mailto:juans.perezc@gmail.com" className="cv-accent hover:text-accent-light">
              juans.perezc@gmail.com
            </a>
            <span>Colombia &amp; Peru</span>
          </div>
        </header>

        {/* Experience */}
        <Section label="Experience">
          {experience.map((job) => (
            <div key={job.role} className="mb-5 last:mb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="cv-text text-base font-semibold text-foreground">
                  {job.role}{" "}
                  <span className="cv-accent font-normal text-accent-light">
                    @ {job.org}
                  </span>
                </h3>
                <span className="cv-muted font-mono text-xs text-dim">
                  {job.period}
                </span>
              </div>
              <ul className="mt-2 space-y-1.5">
                {job.bullets.map((b) => (
                  <li
                    key={b}
                    className="cv-text relative pl-4 text-sm leading-relaxed text-dim before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-accent"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* Skills */}
        <Section label="Skills">
          <ul className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <li
                key={s}
                className="cv-chip cv-text rounded-md border border-border bg-background/40 px-2.5 py-1 font-mono text-xs text-dim"
              >
                {s}
              </li>
            ))}
          </ul>
        </Section>

        {/* Education */}
        <Section label="Education">
          {education.map((e) => (
            <div
              key={e.detail}
              className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 last:mb-0"
            >
              <div>
                <h3 className="cv-text text-sm font-semibold text-foreground">
                  {e.detail}
                </h3>
                <p className="cv-muted text-xs text-dim">{e.school}</p>
              </div>
              <span className="cv-accent font-mono text-xs text-accent-light">
                {e.status}
              </span>
            </div>
          ))}
        </Section>

        {/* Production */}
        <Section label="Production Systems">
          <ul className="flex flex-wrap gap-2">
            {production.map((p) => (
              <li
                key={p}
                className="cv-chip cv-text rounded-md border border-border bg-background/40 px-2.5 py-1 font-mono text-xs text-dim"
              >
                {p}
              </li>
            ))}
          </ul>
        </Section>
      </article>
    </main>
  );
}
