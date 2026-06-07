"use client";

import ScrollStack, { ScrollStackItem } from "@/components/effects/ScrollStack";

type SkillCard = {
  index: string;
  title: string;
  blurb: string;
  skills: string[];
};

const CARDS: SkillCard[] = [
  {
    index: "01",
    title: "AI & LLM Engineering",
    blurb: "Turning language models into reliable, production features.",
    skills: [
      "LLMs (Claude / GPT)",
      "RAG",
      "Agentic AI / Tool calling",
      "LangChain · LangGraph",
      "Prompt engineering",
      "OCR / Document AI",
      "Embeddings · pgvector",
      "LLM evaluation",
    ],
  },
  {
    index: "02",
    title: "Backend Engineering",
    blurb: "Secure, scalable, multi-tenant systems.",
    skills: [
      "Python",
      "FastAPI (async)",
      "REST APIs",
      "PostgreSQL",
      "Redis",
      "Row-Level Security",
      "JWT / RBAC",
      "Celery",
    ],
  },
  {
    index: "03",
    title: "Frontend & Mobile",
    blurb: "Shipping the whole product, end to end.",
    skills: [
      "Next.js",
      "React",
      "React Native",
      "TypeScript",
      "Tailwind CSS",
      "Responsive UI",
    ],
  },
  {
    index: "04",
    title: "Automation & DevOps",
    blurb: "Replacing manual processes; deploying reliably.",
    skills: [
      "n8n",
      "Workflow automation",
      "Docker",
      "CI/CD (GitHub Actions)",
      "Linux / VPS",
      "nginx",
    ],
  },
  {
    index: "05",
    title: "AI for Creative & Tooling",
    blurb: "Using AI across the whole workflow, not just code.",
    skills: [
      "AI image generation (Nano Banana / Gemini)",
      "AI-assisted development",
      "LLM API integration",
      "Creative direction",
    ],
  },
];

export default function SkillsStack() {
  return (
    <section id="skills" className="relative z-10 bg-background">
      {/* heading */}
      <div className="mx-auto max-w-6xl px-6 pt-24 text-center">
        <span className="mono-label">SECTION_04 // CAPABILITIES</span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Technical skills &amp; knowledge
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-dim">
          Scroll through what I work with — from AI systems to backends,
          frontend, automation and beyond.
        </p>
      </div>

      <ScrollStack itemDistance={80} itemStackDistance={28} baseScale={0.86}>
        {CARDS.map((c) => (
          <ScrollStackItem key={c.index}>
            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-3xl font-bold text-accent/40">
                  {c.index}
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-sm text-dim">{c.blurb}</p>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-2.5">
                {c.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-sm text-foreground/85"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
