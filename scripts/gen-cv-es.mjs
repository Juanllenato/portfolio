// Genera el CV en ESPAÑOL (ATS-friendly, una columna, sin gráficos) en public/.
// Ejecutar: node scripts/gen-cv-es.mjs
// OBSOLETO (oct 2026): el PDF de public/ ahora sale de C:\projects\busqueda-empleo-5k\cv (HTML → PDF).
// Correr este script lo sobrescribe con el contenido viejo.
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const OUT = path.join(process.cwd(), "public", "Juan_Perez_Ingeniero_IA_CV_ES.pdf");
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

// Encabezado
doc.fillColor(DARK).font("Helvetica-Bold").fontSize(22).text("Juan Perez");
doc.fillColor(VIOLET).font("Helvetica-Bold").fontSize(11).text("Ingeniero de IA Aplicada · Sistemas de IA y Automatización · Remoto");
doc.moveDown(0.15);
doc.fillColor(GRAY).font("Helvetica").fontSize(8.5).text(
  "Radicado en Colombia · Remoto (EE. UU. y LatAm) · juans.perezc@gmail.com · github.com/Juanllenato · linkedin.com/in/juan-perez-ai-engineer · juan-perez-ai.vercel.app"
);

heading("Resumen Profesional");
body(
  "Ingeniero de IA Aplicada / Sistemas de IA con más de 5 años construyendo software de producción, especializado en llevar aplicaciones LLM de punta a punta. Desarrollo productos de IA de forma remota para AINEATECH (Houston, TX, EE. UU.), donde diseñé un CRM con IA multi-tenant hoy en producción con más de 120 usuarios activos en varias empresas de Colombia y Perú. Diseño y despliego sistemas de IA agéntica, pipelines RAG, automatización con OCR/Document AI y backends async multi-tenant, siendo dueño de todo el stack: desde el modelo de datos y el pipeline de inferencia hasta el despliegue, el hardening de seguridad y la observabilidad. Enfocado en la ejecución y listo para startups: convierto LLMs en sistemas confiables y críticos para el negocio, no en demos."
);

heading("Logros Clave");
bullet("Diseñé y desplegué un CRM con IA multi-tenant en producción con más de 120 usuarios activos en varias empresas de Colombia y Perú: asistente RAG contextual, automatización con OCR y reportería automática que reemplazó operaciones manuales de back-office.");
bullet("Construí un asistente de IA agéntico totalmente autónomo que opera una app móvil completa por conversación, orquestando 13 herramientas (RAG, visión, predicción) en un loop de tool-calling LLM.");
bullet("Trabajo de forma remota como ingeniero para una empresa de software de EE. UU. (Houston, TX), colaborando async entre zonas horarias de EE. UU. y LatAm.");
bullet("Trabajo respaldado por referencias de clientes verificables que avalan públicamente los sistemas entregados.");

heading("Experiencia");
doc.fillColor(DARK).font("Helvetica-Bold").fontSize(10).text("Ingeniero de IA Aplicada — AINEATECH (Houston, TX, EE. UU.)", { continued: true });
doc.font("Helvetica").fillColor(GRAY).fontSize(8.5).text("    2023–Presente · Remoto");
doc.moveDown(0.15);
bullet("Diseñé y llevé a producción un CRM con IA multi-tenant con más de 120 usuarios activos en varias empresas de Colombia y Perú: un asistente LLM contextual (RAG sobre datos reales del negocio, sin PII) para reportería en lenguaje natural, un pipeline de OCR por WhatsApp que eliminó ~100% de la captura manual de facturas, y flujos de reportería automática, aislado por empresa con row-level security de PostgreSQL.");
bullet("Construí un coach móvil de IA agéntico que opera toda una aplicación por conversación, orquestando 13 herramientas (RAG sobre pgvector, registro por visión, proyección predictiva) en un loop de tool-calling LLM: un agente totalmente autónomo con human-in-the-loop en producción.");
bullet("Diseñé flujos de automatización empresarial con IA (n8n) con decisión por LLM, validación de salidas estructuradas y aprobación human-in-the-loop en soporte, ventas y finanzas, reemplazando operaciones manuales y ahorrando horas de trabajo repetitivo por día.");
bullet("Construí un harness de evaluación y observabilidad de LLMs (datasets versionados, métricas, LLM-as-judge, CI gating) para detectar regresiones de calidad antes del release, elevando la consistencia de las salidas de IA.");
bullet("Fui dueño de la infraestructura de producción: integré APIs de LLM, OCR, correo, mensajería y pagos; entregué servicios async contenerizados con Docker y CI/CD; endurecí endpoints con rate limiting, validación de entradas y security headers.");
bullet("Entregué más de 4 plataformas web/e-commerce en producción y un pipeline creativo con IA generativa (Gemini / Nano Banana) produciendo todo el material publicitario de marca internamente.");

heading("Habilidades Técnicas");
body("IA Aplicada: aplicaciones LLM (OpenAI/Claude/Llama), IA agéntica y agentes autónomos, orquestación de IA, RAG y pipelines de recuperación, tool/function calling, salidas estructuradas, context engineering, optimización de prompts, evaluación y observabilidad de LLM, multimodal/Document AI, OCR, embeddings, bases de datos vectoriales, pgvector, LangChain, LangGraph.");
body("Backend y Datos: Python, FastAPI, pipelines async/inferencia, APIs REST, PostgreSQL, Redis, arquitectura multi-tenant (RLS), JWT/RBAC, Celery.");
body("Automatización e Integraciones: n8n, orquestación de flujos, sistemas human-in-the-loop, integraciones de APIs, webhooks, APIs de pagos/mensajería/correo.");
body("Cloud y DevOps: Docker, CI/CD (GitHub Actions), despliegue serverless/cloud (Vercel), nginx, Linux/VPS, hardening de seguridad.");
body("Frontend/Móvil: React, Next.js, React Native, TypeScript, Tailwind.");
body("Idiomas: Español (nativo), Inglés (B1–B2, en mejora).");

heading("Proyectos Destacados");
bullet("PrevenSalud AI CRM — CRM con IA en producción, +120 usuarios activos en LatAm (asistente LLM, OCR, reportería). github.com/Juanllenato/prevensalud-ai-crm");
bullet("App de Salud con IA Agéntica — orquestación de 13 herramientas (RAG, visión). github.com/Juanllenato/plataforma-bienestar-ai");
bullet("Automatizaciones Empresariales con IA (n8n) — decisión + human-in-the-loop. github.com/Juanllenato/n8n-workflows");
bullet("Harness de Evaluación y Observabilidad de LLM — métricas, LLM-as-judge, CI gating. github.com/Juanllenato/llm-eval-harness");

heading("Educación");
body("Unidades Tecnológicas de Santander (UTS), Colombia");
bullet("Ingeniería de Sistemas — en curso");
bullet("Tecnólogo en Desarrollo de Sistemas Informáticos — completado");

heading("Palabras Clave");
doc.fillColor(GRAY).font("Helvetica").fontSize(8).text(
  "Ingeniero de IA, IA Aplicada, Ingeniero de Sistemas de IA, IA Agéntica, Automatización con IA, LLM, RAG, Agentes de IA, Tool Calling, LangChain, LangGraph, Bases de Datos Vectoriales, OCR, Document AI, Python, FastAPI, PostgreSQL, n8n, Orquestación de Flujos, Integración de APIs, Next.js, React, Docker, CI/CD, Despliegue en la Nube, IA en Producción, GenAI."
);

doc.end();
console.log("CV (ES) escrito en", OUT);
