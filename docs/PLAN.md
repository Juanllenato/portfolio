# Plan — Portafolio web de Juan Perez (AI-First Software Engineer)

> Objetivo: un portafolio **visualmente imponente** (front protagonista) que demuestre nivel senior y enfoque AI-first, desplegable gratis en Vercel. Backend mínimo (incluye un chatbot "Ask my portfolio" sencillo de implementar).

---

## 1. Concepto & posicionamiento

**Frase rectora:** *"I turn LLMs into production systems that run real businesses."*
**Sensación que debe transmitir:** moderno, técnico, seguro, internacional. Cero plantilla genérica.
**Idioma:** inglés (audiencia internacional).
**Dominio:** empezar con `juanperez.vercel.app`; luego dominio propio (`juanperez.dev` / `juanllenato.dev`).

---

## 2. Dirección de diseño (elige 1 estilo)

| Estilo | Vibe | Referencia |
|---|---|---|
| **A. Dark + glow (recomendado)** | Fondo oscuro, acentos neón/violeta, glassmorphism, gradientes sutiles. "AI/tech premium". | linear.app · vercel.com · godly.website |
| **B. Minimal editorial** | Mucho blanco, tipografía grande, retícula limpia, foco en contenido. | read.cv · brittanychiang.com |
| **C. Bento + motion** | Tarjetas tipo "bento grid", animaciones al scroll, interactivo. | dribbble (bento portfolio) |

> Recomendado: **A (Dark + glow)** con detalles **bento** del C. Es el look que un recruiter de IA asocia con producto moderno.

**Paleta sugerida (dark):**
- Fondo: `#0A0A0F` / `#0F172A`
- Texto: `#E5E7EB` (suave), títulos `#FFFFFF`
- Acento primario: `#7C3AED` (violeta IA) + `#06B6D4` (cyan)
- Bordes/glass: `rgba(255,255,255,0.08)` + `backdrop-blur`

**Tipografía:** títulos `Inter`/`Geist`/`Space Grotesk`; código/mono `JetBrains Mono`.

**Motion:** Framer Motion — entradas al scroll (fade+slide), hover en tarjetas (tilt/glow), cursor sutil, transición de secciones. Sin exagerar (rápido y elegante).

---

## 3. Arquitectura de la página (secciones, en orden)

1. **Hero** — nombre + título (AI-First Software Engineer) + frase rectora + CTAs (Ver proyectos / GitHub / LinkedIn). Fondo animado sutil (gradiente/partículas/grid). Badge "Open to remote roles" pequeño.
2. **Trust bar** — "In production across LatAm" + logos (Pontebela, Alianza Vital, PrevenSalud) + dominios.
3. **Sobre mí (About)** — 3-4 líneas potentes + foto + stats rápidos (X proyectos en producción, 2 países, stack).
4. **Proyectos destacados** — los 5, como **case study cards** con: thumbnail/video, 1 línea de impacto, stack tags, links (live + GitHub). El CRM y el coach agéntico arriba/grandes (bento).
5. **Stack tecnológico** — grid de íconos por categoría (AI, Backend, Frontend, DevOps).
6. **El proceso / cómo construyo** — 3-4 puntos (AI-first, eval-first, production-grade, ownership). Refuerza seniority.
7. **🤖 Ask my portfolio (chatbot IA)** — sección o widget flotante. Demuestra tus skills *en vivo*.
8. **Contacto** — CTA fuerte + email + GitHub + LinkedIn + botón "Download CV".
9. **Footer** — links, "Built with Next.js · deployed on Vercel".

---

## 4. Especificación por sección (ideas de diseño)

- **Hero:** título con gradiente de texto, sub con efecto typewriter rotando roles ("Applied AI Engineer" / "RAG systems" / "Agentic apps"). Fondo: grid animado o gradiente que se mueve con el mouse.
- **Proyectos (bento):** tarjetas de distinto tamaño; la del CRM ocupa 2 columnas con el video en loop muted; hover → glow + "View case study". Cada tag de stack es un chip.
- **Trust bar:** logos en grayscale → color al hover; texto "Live in production · Colombia & Peru".
- **Stack:** íconos que brillan al hover, agrupados (AI / Backend / Frontend / Infra).
- **Chatbot:** burbuja flotante abajo-derecha + sección dedicada con sugerencias de preguntas ("What did he build?", "Explain his RAG work", "Is he senior?").

---

## 5. 🤖 Chatbot "Ask my portfolio" (back mínimo)

**UX:** input + respuestas en streaming + chips de preguntas sugeridas.
**Implementación ligera (sin DB vectorial pesada):**
- Todo tu contenido (CV, proyectos, stack) cabe en **un solo contexto** → no necesitas vector DB real.
- Opción simple: un **system prompt con tu info embebida** + llamada a un LLM (OpenAI/Anthropic/Groq free tier) vía un **API route de Next.js** (`/api/chat`).
- Opción "RAG-lite": si quieres mostrar RAG real, embeddings de tus ~10 documentos en un JSON + búsqueda por similitud en memoria (sin servicio externo).
- **Seguridad/costo:** rate limit básico + system prompt que lo acota a hablar solo de ti.
- **Narrativa de portafolio:** documenta en el repo que "este chat usa RAG sobre mi CV" → coherente con tu perfil.

> Mantiene el back simple (1 API route) pero el efecto "wow" es enorme: un portafolio de AI Engineer que ES una app de IA.

---

## 6. Stack técnico

```
Framework:  Next.js 14 (App Router) + TypeScript
Estilos:    Tailwind CSS + shadcn/ui
Motion:     Framer Motion
Iconos:     lucide-react / simple-icons (logos de tech)
Chat IA:    API route Next.js → LLM (OpenAI/Anthropic/Groq free tier) · streaming (Vercel AI SDK)
Deploy:     Vercel (gratis, CI desde GitHub)
Analytics:  Vercel Analytics (gratis)
```

> **Vercel AI SDK** (`ai` package) facilita el streaming del chat en pocas líneas → back mínimo, front pulido.

---

## 7. Referencias para inspirarte (mirar antes de construir)

**Portafolios de ingenieros (estructura/contenido):**
- cofolios.com  · bestfolios.com  · brittanychiang.com  · read.cv

**Diseño premium (estética/motion):**
- godly.website  · awwwards.com (Portfolio)  · linear.app  · vercel.com

**Plantillas para arrancar rápido:**
- vercel.com/templates (filtro "Portfolio")  · GitHub topic `developer-portfolio`
- Magic UI / Aceternity UI (componentes animados premium, gratis) → aceternity.com, magicui.design

**Componentes/efectos listos (clave para "imponente" sin sufrir):**
- **Aceternity UI** y **Magic UI** → hero animados, bento grids, beams, spotlight, etc. Copias y pegas.

---

## 8. Roadmap de construcción (cuando arranquemos)

- **Fase 1 — Base:** Next.js + Tailwind + shadcn + layout + paleta/tipografía + deploy inicial a Vercel (que se vea algo en vivo desde el día 1).
- **Fase 2 — Secciones estáticas:** Hero, About, Proyectos (con tu contenido real), Trust bar, Stack, Contacto.
- **Fase 3 — Motion & pulido:** Framer Motion, bento, hover/glow, responsive, dark mode, performance.
- **Fase 4 — Chatbot IA:** API route + Vercel AI SDK + system prompt con tu info + UI del chat.
- **Fase 5 — Final:** SEO/meta, OpenGraph image, dominio propio, analytics, CV descargable.

---

## 9. Contenido ya listo (lo tenemos del trabajo previo)
- Bio/About (varias versiones) · 5 proyectos con descripción y stack · Trust bar (3 empresas) · Skills · Links GitHub · Headline. → Todo reutilizable, no hay que escribir de cero.

---

*Plan v1 — listo para ejecutar por fases cuando decidamos construir.*
