// Generates a clean, ATS-friendly one-page CV PDF into public/.
// ATS-safe: single column, no tables, no graphics, no photo. Run: node scripts/gen-cv.mjs
// OUTDATED (Oct 2026): the public/ PDF is now exported from C:\projects\busqueda-empleo-5k\cv (HTML → PDF).
// Running this script overwrites it with the old content.
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
doc.fillColor(VIOLET).font("Helvetica-Bold").fontSize(11).text("Applied AI Engineer · AI Systems & Automation · Remote");
doc.moveDown(0.15);
doc.fillColor(GRAY).font("Helvetica").fontSize(8.5).text(
  "Based in Colombia · Remote (US & LatAm) · juans.perezc@gmail.com · github.com/Juanllenato · linkedin.com/in/juan-perez-ai-engineer · juan-perez-ai.vercel.app"
);

heading("Professional Summary");
body(
  "Applied AI / AI Systems Engineer with 5+ years building production software, specialized in shipping LLM applications end-to-end. I build AI products remotely for AINEATECH (Houston, TX, USA), where I architected a multi-tenant AI CRM now in production with 120+ active users across multiple companies in Colombia & Peru. I design and deploy agentic AI systems, RAG pipelines, document-AI/OCR automation and async multi-tenant backends — owning the full stack from data model and inference pipeline to deployment, security hardening and observability. Execution-focused and startup-ready: I turn LLMs into reliable, business-critical systems, not demos."
);

heading("Key Achievements");
bullet("Architected and deployed a production multi-tenant AI CRM serving 120+ active users across multiple companies in Colombia & Peru — contextual RAG assistant, OCR automation and automated reporting that replaced manual back-office operations.");
bullet("Built a fully autonomous agentic AI assistant that operates an entire mobile app through conversation, orchestrating 13 tools (RAG, vision, prediction) in an LLM tool-calling loop.");
bullet("Engineer remotely for a US-based software company (Houston, TX), collaborating async across US & LatAm time zones.");
bullet("Work backed by verifiable client references who publicly vouch for the systems delivered.");

heading("Experience");
doc.fillColor(DARK).font("Helvetica-Bold").fontSize(10).text("Applied AI Engineer — AINEATECH (Houston, TX, USA)", { continued: true });
doc.font("Helvetica").fillColor(GRAY).fontSize(8.5).text("    2023–Present · Remote");
doc.moveDown(0.15);
bullet("Architected and shipped a production multi-tenant AI CRM serving 120+ active users across multiple companies in Colombia & Peru: a contextual LLM assistant (RAG over live business data, PII-free) for natural-language reporting, an OCR-over-WhatsApp pipeline that eliminated ~100% of manual invoice entry, and automated reporting workflows — tenant-isolated with PostgreSQL row-level security.");
bullet("Engineered an agentic mobile AI coach that drives an entire application through conversation, orchestrating 13 tools (RAG over pgvector, vision-based logging, predictive projection) in an LLM tool-calling loop — a fully autonomous, human-in-the-loop agent in production.");
bullet("Designed enterprise AI automation workflows (n8n) with LLM decisioning, structured-output validation and human-in-the-loop approval across support, sales and finance, replacing manual back-office operations and cutting hours of repetitive work per day.");
bullet("Built an LLM evaluation & observability harness (versioned datasets, metrics, LLM-as-judge, CI gating) to catch quality and reliability regressions before release, raising AI output consistency across deploys.");
bullet("Owned production infrastructure: integrated LLM, OCR, email, messaging and payment APIs; shipped containerized async services with Docker and CI/CD; hardened endpoints with distributed rate limiting, input validation, same-origin checks and security headers.");
bullet("Delivered 4+ production web/e-commerce platforms and a generative-AI creative pipeline (Gemini / Nano Banana) producing all brand advertising imagery in-house.");

heading("Technical Skills");
body("Applied AI: LLM applications (OpenAI/Claude/Llama), agentic AI & autonomous agents, AI orchestration, RAG & retrieval pipelines, tool/function calling, structured outputs, context engineering, prompt optimization, LLM evaluation & observability, AI reliability, multimodal/Document AI, OCR, embeddings, vector databases, pgvector, LangChain, LangGraph.");
body("Backend & Data: Python, FastAPI, async/inference pipelines, REST APIs, PostgreSQL, Redis, multi-tenant architecture (RLS), JWT/RBAC, Celery.");
body("Automation & Integrations: n8n, workflow orchestration, human-in-the-loop systems, API integrations, webhooks, payment/messaging/email APIs.");
body("Cloud & DevOps: Docker, CI/CD (GitHub Actions), serverless/cloud deployment (Vercel), nginx, Linux/VPS, security hardening (rate limiting, security headers).");
body("Frontend/Mobile: React, Next.js, React Native, TypeScript, Tailwind.");
body("Languages: Spanish (native), English (B1–B2, improving).");

heading("Selected Projects");
bullet("PrevenSalud AI CRM — production AI CRM, 120+ active users across LatAm (LLM assistant, OCR, reporting). github.com/Juanllenato/prevensalud-ai-crm");
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
