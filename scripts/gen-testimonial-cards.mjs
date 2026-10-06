// Generates square (1080x1080) testimonial card PNGs for LinkedIn onto the Desktop.
// Run: node scripts/gen-testimonial-cards.mjs
import sharp from "sharp";
import fs from "fs";
import path from "path";
import os from "os";

const deskA = path.join(os.homedir(), "OneDrive", "Escritorio");
const deskB = path.join(os.homedir(), "Desktop");
const OUTDIR = fs.existsSync(deskA) ? deskA : deskB;

const CARDS = [
  {
    file: "Testimonio_Alianza_Vital.png",
    quote:
      "Entendió nuestro negocio, no solo programó: reemplazó tareas manuales por un sistema confiable que usamos a diario. Responsable, claro en la comunicación y muy capaz técnicamente.",
    name: "Linda Marcela Cárdenas",
    role: "Gerente Administrativa",
    company: "Grupo Alianza Vital",
    initials: "LC",
  },
  {
    file: "Testimonio_Pontebela.png",
    quote:
      "Desarrolló nuestra tienda de e-commerce y produjo todo el contenido publicitario usando IA, del concepto a la pieza final. Comprometido y con una comunicación excelente.",
    name: "Marina Corzo",
    role: "Recursos Humanos",
    company: "Pontebela",
    initials: "MC",
  },
];

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// naive word-wrap to a max chars-per-line for the quote
function wrap(text, max) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > max) {
      lines.push(line.trim());
      line = w;
    } else {
      line += " " + w;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

function svg(card) {
  const lines = wrap(card.quote, 38);
  const startY = 470 - (lines.length * 30);
  const quoteTspans = lines
    .map((l, i) => `<tspan x="110" dy="${i === 0 ? 0 : 52}">${esc(l)}</tspan>`)
    .join("");

  return `<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0b"/>
      <stop offset="60%" stop-color="#120a22"/>
      <stop offset="100%" stop-color="#1a0f33"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="15%" r="60%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="av" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#34e0f0"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="1080" fill="url(#bg)"/>
  <rect width="1080" height="1080" fill="url(#glow)"/>
  <rect x="40" y="40" width="1000" height="1000" rx="40" fill="none" stroke="#ffffff" stroke-opacity="0.10" stroke-width="2"/>

  <!-- verified badge -->
  <g transform="translate(110,130)">
    <rect x="0" y="0" width="320" height="56" rx="28" fill="#8b5cf6" fill-opacity="0.14" stroke="#8b5cf6" stroke-opacity="0.5"/>
    <path d="M 28 28 l 10 10 l 18 -20" fill="none" stroke="#b794ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="72" y="37" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="700" fill="#b794ff" letter-spacing="1">CLIENTE VERIFICADO</text>
  </g>

  <!-- quote mark -->
  <text x="106" y="290" font-family="Georgia, serif" font-size="160" fill="#8b5cf6" fill-opacity="0.35">&#8220;</text>

  <!-- quote -->
  <text x="110" y="${startY}" font-family="Helvetica, Arial, sans-serif" font-size="40" font-weight="600" fill="#f2f2f5" letter-spacing="0.2" style="line-height:52px">${quoteTspans}</text>

  <!-- divider -->
  <rect x="110" y="850" width="860" height="2" fill="#ffffff" fill-opacity="0.12"/>

  <!-- author -->
  <g transform="translate(110,890)">
    <circle cx="50" cy="50" r="50" fill="url(#av)"/>
    <text x="50" y="64" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="38" font-weight="700" fill="#ffffff">${esc(card.initials)}</text>
    <text x="130" y="40" font-family="Helvetica, Arial, sans-serif" font-size="34" font-weight="700" fill="#ffffff">${esc(card.name)}</text>
    <text x="130" y="80" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#abb2c2">${esc(card.role)} · ${esc(card.company)}</text>
  </g>

  <!-- footer brand -->
  <text x="970" y="1010" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="600" fill="#8b5cf6">juan-perez-ai.vercel.app</text>
</svg>`;
}

for (const card of CARDS) {
  const out = path.join(OUTDIR, card.file);
  await sharp(Buffer.from(svg(card))).png().toFile(out);
  console.log("Wrote", out);
}
