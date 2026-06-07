// Generates a clean, ATS-friendly one-page CV PDF into public/.
// Run: node scripts/gen-cv.mjs
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const OUT = path.join(process.cwd(), "public", "Juan_Perez_AI_Engineer_CV.pdf");
fs.mkdirSync(path.dirname(OUT), { recursive: true });

const doc = new PDFDocument({ size: "A4", margin: 48 });
doc.pipe(fs.createWriteStream(OUT));

const VIOLET = "#7c3aed";
const DARK = "#111114";
const GRAY = "#555555";
const W = doc.page.width - 96;

function heading(t) {
  doc.moveDown(0.6);
  doc.fillColor(VIOLET).font("Helvetica-Bold").fontSize(11).text(t.toUpperCase(), { characterSpacing: 1 });
  const y = doc.y + 2;
  doc.moveTo(48, y).lineTo(48 + W, y).strokeColor("#dddddd").lineWidth(1).stroke();
  doc.moveDown(0.4);
}
function body(t, opts = {}) {
  doc.fillColor(DARK).font("Helvetica").fontSize(9.5).text(t, opts);
}
function bullet(t) {
  doc.fillColor(DARK).font("Helvetica").fontSize(9.5).text("•  " + t, { indent: 2, paragraphGap: 2 });
}

// Header
doc.fillColor(DARK).font("Helvetica-Bold").fontSize(24).text("Juan Perez");
doc.fillColor(VIOLET).font("Helvetica-Bold").fontSize(12).text("AI-First Software Engineer");
doc.moveDown(0.2);
doc.fillColor(GRAY).font("Helvetica").fontSize(9).text(
  "Remote (LatAm) · juans.perezc@gmail.com · github.com/Juanllenato · linkedin.com/in/juan-perez-ai-engineer · crm.prevensalud.pe"
);

heading("Summary");
body(
  "Applied AI Engineer who ships production AI systems — not demos. 5+ years building software and automations, with multiple AI platforms running in production for real companies across Colombia & Peru. Strong in LLM application development (RAG, agentic tool-calling), document AI (OCR), Python/FastAPI backends and multi-tenant architecture."
);

heading("Experience");
doc.fillColor(DARK).font("Helvetica-Bold").fontSize(10).text("AI-First Software Engineer — AINEATECH", { continued: true });
doc.font("Helvetica").fillColor(GRAY).fontSize(9).text("   Remote · 2023–Present");
doc.moveDown(0.2);
bullet("Built a multi-tenant AI CRM (crm.prevensalud.pe): contextual LLM assistant (RAG, PII-free), OCR-over-WhatsApp invoice pipeline, automated PDF reporting and Celery automation. PostgreSQL row-level security.");
bullet("Built an agentic mobile health app whose AI coach operates the whole product via chat, orchestrating 13 tools (RAG over pgvector, vision meal logging, health projection).");
bullet("Built enterprise n8n automations with AI decisioning: support triage, lead scoring, invoice approval with fraud checks and human-in-the-loop.");
bullet("Implemented an LLM evaluation & observability harness (versioned datasets, metrics, LLM-as-judge, CI gating).");
bullet("Delivered production web & e-commerce platforms (prevensalud.pe, grupoalianzavital.com, pontebela.com.co).");

heading("Technical Skills");
body("AI/LLM: LLMs (Claude/GPT) · RAG · Agentic AI / tool calling (LangChain/LangGraph) · Prompt engineering · LLM evaluation · OCR / Document AI · Vector DBs (pgvector) · Embeddings");
body("Backend: Python · FastAPI (async) · REST APIs · PostgreSQL · Redis · Multi-tenant (RLS) · JWT/RBAC · Celery");
body("Frontend/Mobile: React · Next.js · React Native · TypeScript · Tailwind");
body("DevOps: Docker · CI/CD (GitHub Actions) · nginx · Linux/VPS");
body("Languages: Spanish (native) · English (B1–B2, improving)");

heading("Projects");
bullet("PrevenSalud AI CRM — github.com/Juanllenato/prevensalud-ai-crm");
bullet("Agentic AI Health App — github.com/Juanllenato/plataforma-bienestar-ai");
bullet("Enterprise AI Automations (n8n) — github.com/Juanllenato/n8n-workflows");
bullet("LLM Eval & Observability Harness — github.com/Juanllenato/llm-eval-harness");

heading("Education");
body("Unidades Tecnológicas de Santander (UTS), Colombia");
bullet("Systems Engineering — in progress");
bullet("Technologist in Software Systems Development — completed");

doc.end();
console.log("CV written to", OUT);
