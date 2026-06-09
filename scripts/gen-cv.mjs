// Generates a clean, ATS-friendly one-page CV PDF into public/.
// ATS-safe: single column, no tables, no graphics, no photo. Run: node scripts/gen-cv.mjs
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const OUT = path.join(process.cwd(), "public", "Juan_Perez_AI_Engineer_CV.pdf");
fs.mkdirSync(path.dirname(OUT), { recursive: true });

const doc = new PDFDocument({ size: "A4", margin: 46 });
doc.pipe(fs.createWriteStream(OUT));

const VIOLET = "#6d28d9";
const DARK = "#111114";
const GRAY = "#555555";
const W = doc.page.width - 92;

function heading(t) {
  doc.moveDown(0.5);
  doc.fillColor(VIOLET).font("Helvetica-Bold").fontSize(10.5).text(t.toUpperCase(), { characterSpacing: 1 });
  const y = doc.y + 2;
  doc.moveTo(46, y).lineTo(46 + W, y).strokeColor("#dddddd").lineWidth(1).stroke();
  doc.moveDown(0.35);
}
function body(t) {
  doc.fillColor(DARK).font("Helvetica").fontSize(9).text(t, { lineGap: 1 });
}
function bullet(t) {
  doc.fillColor(DARK).font("Helvetica").fontSize(9).text("•  " + t, { indent: 2, paragraphGap: 2.5, lineGap: 1 });
}

// Header
doc.fillColor(DARK).font("Helvetica-Bold").fontSize(22).text("Juan Perez");
doc.fillColor(VIOLET).font("Helvetica-Bold").fontSize(11).text("AI-First Software Engineer");
doc.moveDown(0.15);
doc.fillColor(GRAY).font("Helvetica").fontSize(8.5).text(
  "Remote (Colombia & Peru) · juans.perezc@gmail.com · github.com/Juanllenato · linkedin.com/in/juan-perez-ai-engineer · juan-perez-ai.vercel.app"
);

heading("Professional Summary");
body(
  "Applied AI Engineer with 5+ years building and shipping production software, now specialized in AI-first systems. I design and deploy LLM applications, RAG pipelines, agentic AI workflows, OCR/document automation and backend integrations that run real businesses — currently in production for multiple companies across Colombia & Peru. Execution-focused, full-stack and startup-ready: I take products from data model to deployment."
);

heading("Experience");
doc.fillColor(DARK).font("Helvetica-Bold").fontSize(10).text("AI-First Software Engineer — AINEATECH", { continued: true });
doc.font("Helvetica").fillColor(GRAY).fontSize(8.5).text("    2023–Present · Remote");
doc.moveDown(0.15);
bullet("Architected and shipped a multi-tenant AI CRM to production: contextual LLM assistant (RAG, PII-free) for natural-language queries, OCR-over-WhatsApp pipeline that eliminated manual invoice entry, and automated nightly PDF reporting — isolated per company with PostgreSQL row-level security.");
bullet("Engineered an agentic mobile AI coach that operates an entire app through conversation, orchestrating 13 tools (RAG over pgvector, vision logging, predictive projection) via an LLM tool-calling loop.");
bullet("Designed enterprise automation workflows (n8n) with AI decisioning, validation and human-in-the-loop approval across support, sales and finance — replacing manual operations end to end.");
bullet("Built an LLM evaluation & observability harness (versioned datasets, metrics, LLM-as-judge, CI gating) to catch quality regressions before release.");
bullet("Integrated LLM, OCR, email, messaging and payment APIs; deployed containerized services with Docker and CI/CD; hardened endpoints (rate limiting, input validation, security headers).");
bullet("Delivered 4+ production web/e-commerce platforms and produced AI-generated brand creatives (Gemini / Nano Banana).");

heading("Technical Skills");
body("AI/LLM: LLMs (OpenAI/Claude/Llama), RAG, AI agents, agentic workflows, LangChain, LangGraph, tool calling, prompt engineering, LLM evaluation, OCR/Document AI, vector databases, pgvector, embeddings.");
body("Backend: Python, FastAPI, REST APIs, async, PostgreSQL, Redis, multi-tenant (RLS), JWT/RBAC, Celery.");
body("Automation & Integrations: n8n, workflow orchestration, API integrations, webhooks.");
body("Frontend/Mobile: React, Next.js, React Native, TypeScript, Tailwind.");
body("DevOps: Docker, CI/CD (GitHub Actions), cloud deployment (Vercel), nginx, Linux/VPS.");
body("Languages: Spanish (native), English (B1–B2, improving).");

heading("Selected Projects");
bullet("PrevenSalud AI CRM — production AI CRM (LLM assistant, OCR, reporting). github.com/Juanllenato/prevensalud-ai-crm");
bullet("Agentic AI Health App — 13-tool agent orchestration (RAG, vision). github.com/Juanllenato/plataforma-bienestar-ai");
bullet("Enterprise AI Automations (n8n) — decisioning + human-in-the-loop. github.com/Juanllenato/n8n-workflows");
bullet("LLM Eval & Observability Harness — metrics, LLM-as-judge, CI gating. github.com/Juanllenato/llm-eval-harness");

heading("Education");
body("Unidades Tecnológicas de Santander (UTS), Colombia");
bullet("Systems Engineering — in progress");
bullet("Technologist in Software Systems Development — completed");

heading("Keywords");
doc.fillColor(GRAY).font("Helvetica").fontSize(8).text(
  "AI Engineer, Applied AI Engineer, Agentic AI Engineer, AI Automation Engineer, AI Integrations Engineer, Full-Stack AI Engineer, LLM, RAG, AI Agents, Tool Calling, LangChain, LangGraph, Prompt Engineering, Vector Databases, OCR, Document AI, Python, FastAPI, PostgreSQL, n8n, Workflow Orchestration, Automation, API Integration, Next.js, React, Docker, CI/CD, Cloud Deployment, Production AI, GenAI."
);

doc.end();
console.log("CV written to", OUT);
