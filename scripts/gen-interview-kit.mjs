// Generates the interview prep kit PDF (pitch + Q&A, ES/EN) onto the Desktop.
// Run: node scripts/gen-interview-kit.mjs
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import os from "os";

const OUT = path.join(os.homedir(), "OneDrive", "Escritorio", "Juan_Perez_Interview_Kit.pdf");
const fallback = path.join(os.homedir(), "Desktop", "Juan_Perez_Interview_Kit.pdf");
const target = fs.existsSync(path.dirname(OUT)) ? OUT : fallback;

const doc = new PDFDocument({ size: "A4", margin: 50 });
doc.pipe(fs.createWriteStream(target));

const VIOLET = "#6d28d9";
const DARK = "#111114";
const GRAY = "#555555";
const BLUE = "#1d4ed8";
const W = doc.page.width - 100;

function h1(t) {
  doc.moveDown(0.4);
  doc.fillColor(VIOLET).font("Helvetica-Bold").fontSize(15).text(t);
  const y = doc.y + 2;
  doc.moveTo(50, y).lineTo(50 + W, y).strokeColor("#ddd").lineWidth(1).stroke();
  doc.moveDown(0.4);
}
function q(n, t) {
  doc.moveDown(0.25);
  doc.fillColor(DARK).font("Helvetica-Bold").fontSize(10.5).text(`${n}. ${t}`);
}
function es(t) {
  doc.fillColor(GRAY).font("Helvetica-Oblique").fontSize(9).text("ES  ", { continued: true });
  doc.fillColor(DARK).font("Helvetica").fontSize(9).text(t, { lineGap: 1 });
}
function en(t) {
  doc.fillColor(BLUE).font("Helvetica-BoldOblique").fontSize(9).text("EN  ", { continued: true });
  doc.fillColor(DARK).font("Helvetica").fontSize(9).text(t, { lineGap: 1 });
}
function note(t) {
  doc.fillColor(VIOLET).font("Helvetica-Oblique").fontSize(8.5).text(t, { lineGap: 1 });
}
function bullet(t) {
  doc.fillColor(DARK).font("Helvetica").fontSize(9).text("•  " + t, { indent: 2, paragraphGap: 2, lineGap: 1 });
}

// Header
doc.fillColor(DARK).font("Helvetica-Bold").fontSize(20).text("Interview Kit — Juan Perez");
doc.fillColor(VIOLET).font("Helvetica-Bold").fontSize(10).text("Applied AI Engineer · Pitch + Q&A (ES / EN)");
doc.fillColor(GRAY).font("Helvetica").fontSize(8.5).text("juan-perez-ai.vercel.app · linkedin.com/in/juan-perez-ai-engineer");

// PITCH
h1("Pitch de 30 segundos");
es("Soy Juan, ingeniero de IA aplicada. Trabajo de forma remota para AINEATECH, una empresa de software de Houston, y construyo sistemas de inteligencia artificial que ya estan en produccion: asistentes con LLM, automatizaciones y un CRM con IA que usan a diario empresas en Colombia y Peru. Me especializo en convertir modelos de lenguaje en productos reales y confiables, no en demos. Tengo mas de 5 anos en desarrollo y un portafolio en vivo donde se puede ver y probar todo lo que hago.");
doc.moveDown(0.2);
en("Hi, I'm Juan, an Applied AI Engineer. I work remotely for AINEATECH, a software company in Houston. I build AI systems that are already running in production - LLM assistants, automations, and an AI CRM used every day by companies in Colombia and Peru. I'm good at turning language models into real, reliable products, not just demos. I have more than 5 years in software, and I have a live portfolio where you can see and test my work.");

// Q&A
h1("10 preguntas frecuentes + respuestas");

q(1, "Tell me about yourself / Hablame de ti");
es("Soy ingeniero de IA aplicada. Llevo mas de 5 anos en desarrollo y ahora me enfoco en sistemas con LLMs. Actualmente trabajo remoto para una empresa de Houston, construyendo IA que ya esta en produccion.");
en("I'm an Applied AI Engineer. I have over 5 years in software, and now I focus on LLM systems. I work remotely for a company in Houston, building AI that is already in production.");

q(2, "What's your experience with AI/LLMs?");
en("I build production LLM features: RAG over real business data, AI agents with tool calling, OCR pipelines, and automations. For example, I built an AI assistant that answers business questions, and an agent that uses 13 tools to run a whole mobile app by chat.");

q(3, "What's your tech stack?");
en("My main stack is Python and FastAPI on the backend, with PostgreSQL and pgvector. For AI, I use LLM APIs like Claude and GPT, RAG, LangChain and LangGraph. On the frontend, React, Next.js and React Native. I deploy with Docker and CI/CD.");

q(4, "Are these real production systems?");
en("Yes, 100%. They are used by real companies every day, not demos. You can open the live sites, see the code on my GitHub, and I also have client testimonials on my portfolio.");

q(5, "How do you ensure AI quality/reliability?");
en("I work eval-first. I test AI features with versioned datasets, metrics, and LLM-as-judge. I also gate changes in CI, so quality does not drop in silence between releases.");

q(6, "Tell me about a hard problem you solved");
en("A client entered invoices by hand every day. I built an OCR pipeline over WhatsApp: they send a photo, the system reads it, extracts the data, and saves it automatically. This removed almost all the manual work.");

q(7, "How do you work in a remote team?");
en("I already work remotely for a US company, so I'm used to async work and US time zones. I communicate clearly in writing, I document my work, and I take ownership of my tasks.");

q(8, "What's your English level? (be honest)");
en("My English is intermediate, around B2. I read and write technical English very well, and I'm improving my speaking every week. I'm comfortable with async written work, and I learn fast.");
note("Tip: dilo con calma y seguridad. La honestidad + actitud de mejora suma mas que fingir.");

q(9, "Why should we hire you?");
en("Because I don't just know AI in theory - I ship it to production. I already do this remotely for a US company, my work is backed by real clients, and you can test everything yourself on my live portfolio.");

q(10, "Do you have questions for us? (SIEMPRE ten 2)");
en("What does the AI stack look like on your team?");
en("What would success look like in the first 3 months?");

// Tips
h1("4 tips de oro");
bullet("Comparte el link del portafolio en la entrevista - deja que el chat IA hable por ti. Es tu mejor prueba.");
bullet("En ingles: habla LENTO y claro. Mejor frases simples bien dichas que frases complejas trabadas.");
bullet("Si no entiendes algo en ingles: \"Could you repeat that, please?\" - es normal y profesional.");
bullet("Siempre aterriza con un ejemplo real (CRM, agente, OCR). Los ejemplos venden mas que adjetivos.");

doc.end();
console.log("Interview kit written to", target);
