# CLAUDE.md — Portfolio "Confidential Dossier" · Juan Perez

> Instrucciones de proyecto para el portafolio personal de Juan Perez (AI-First Software Engineer).
> Concepto: un **dossier confidencial que se desclasifica**, con estética inspirada en Evervault.

---

## 1. IDENTIDAD DEL PROYECTO

Portafolio web personal, **front protagonista**, backend mínimo. Objetivo: impresionar a recruiters/clientes internacionales de IA y demostrar nivel senior. Desplegado gratis en **Vercel**. Idioma: **inglés**.

**Frase rectora:** *"I turn LLMs into production systems that run real businesses."*
**Owner:** Juan Perez · github.com/Juanllenato · AI-First Software Engineer.

---

## 2. EL CONCEPTO NARRATIVO ("Confidential Dossier")

La metáfora: el trabajo de Juan está en producción para empresas reales (bajo confidencialidad) → el portafolio es un **expediente clasificado que el visitante desclasifica**.

### Acto 1 — Hero "in the dark" (spotlight/flashlight)
- Pantalla casi negra. Un **foco circular sigue el cursor** (radial-gradient mask) revelando contenido oculto solo donde ilumina.
- Bajo la luz aparecen: `JUAN PEREZ`, `AI-FIRST SOFTWARE ENGINEER`, un sello `CONFIDENTIAL DOSSIER`, marcas de "clasificado" (líneas censuradas tipo ▒▒▒▒).
- Microcopy: *"Move the light. Some things are easier to find in the dark."* + hint de scroll.
- En móvil (sin mouse): el foco sigue el touch o hace un barrido automático suave.

### Acto 2 — Scroll "Declassify" (el dossier se abre)
- Al hacer scroll, una **carpeta/dossier se abre** (animación ligada al scroll) y revela el CV.
- El CV aparece con un **sello rojo "CONFIDENTIAL"** que, al completarse la animación, se **tacha y cambia a "DECLASSIFIED"** (verde/cyan).
- Transición hacia el resto del sitio (el "expediente abierto").

### Acto 3 — El sitio (estilo Evervault)
- Secciones normales pero con la estética del dossier desclasificado: bordes de grid, monospace en labels, acentos cyan, mucho negro.

---

## 3. SISTEMA DE DISEÑO

### Paleta (dark)
```
--bg:            #0A0A0B   /* casi negro */
--bg-elevated:   #111114
--text:          #E5E7EB
--text-dim:      #8A8F98   /* gris labels */
--white:         #FFFFFF
--accent:        #7C3AED   /* violeta IA (PRIMARIO) */
--accent-light:  #A78BFA   /* violeta claro para hovers/glow */
--accent-2:      #22D3EE   /* cyan (uso puntual / declassified) */
--confidential:  #EF4444   /* rojo sello */
--declassified:  #A78BFA
--border:        rgba(255,255,255,0.08)
--glow:          rgba(124,58,237,0.30)
```

### Tipografía
- **Sans (UI/títulos):** `Geist` o `Inter` (geométrica, moderna).
- **Mono (labels, código, "clasificado"):** `Geist Mono` / `JetBrains Mono`.
- Labels en mono mayúsculas con tracking (`SECTION_01 // PROJECTS`).

### Motion (Framer Motion)
- Spotlight: actualizar variable CSS `--x/--y` con `mousemove` (throttle/rAF).
- Scroll-linked: `useScroll` + `useTransform` para abrir el dossier.
- Entradas: fade + translateY al entrar en viewport.
- Hover en tarjetas: glow cyan + leve tilt. Rápido (150-250ms), nunca lento.
- Respeta `prefers-reduced-motion`.

### Estilo Evervault a replicar
- Fondo casi negro, alto contraste, **bordes finos de grid**, tarjetas con `border` sutil + `backdrop-blur`.
- Code snippets / monospace como decoración técnica.
- Logos de clientes en blanco/grayscale.
- Minimalista, mucho aire, profesional/enterprise.

---

## 4. ARQUITECTURA DE LA PÁGINA

1. **Hero** — spotlight interactivo (Acto 1).
2. **Declassify** — dossier se abre + CV "CONFIDENTIAL → DECLASSIFIED" (Acto 2).
3. **Trust bar** — "In production across LatAm" + logos (Pontebela, Alianza Vital, PrevenSalud) + dominios.
4. **About** — bio corta + stats (proyectos en prod, 2 países, stack) + foto.
5. **Projects** — bento de case studies (CRM y coach agéntico destacados) con video/thumbnail, impacto, stack tags, links (live + GitHub).
6. **Stack** — grid de íconos por categoría (AI · Backend · Frontend · Infra).
7. **How I build** — AI-first · eval-first · production-grade · ownership.
8. **🤖 Ask my portfolio** — chatbot IA (widget flotante + sección).
9. **Contact** — CTA + email + GitHub + LinkedIn + Download CV.
10. **Footer** — "Built with Next.js · Deployed on Vercel".

---

## 5. STACK TÉCNICO

```
Next.js 14 (App Router) + TypeScript
Tailwind CSS + shadcn/ui
Framer Motion (animaciones)
lucide-react + simple-icons (íconos/logos tech)
Vercel AI SDK (`ai`) para el chatbot streaming
Deploy: Vercel (free) · CI desde GitHub · Vercel Analytics
```

### Chatbot "Ask my portfolio" (back mínimo)
- 1 API route: `app/api/chat/route.ts`.
- Todo el contenido de Juan (CV + proyectos + stack) va en un **system prompt** (cabe en un contexto; no requiere vector DB).
- LLM vía OpenAI/Anthropic/Groq (free tier). Streaming con Vercel AI SDK.
- Rate limit básico + prompt acotado a hablar solo de Juan.
- Documentar en README: "RAG-lite sobre mi CV" (coherente con su perfil).

---

## 6. CONVENCIONES

- Componentes en `components/` (PascalCase). Secciones en `components/sections/`.
- Contenido (proyectos, bio, stack) en `content/` como datos tipados (TS) → fácil de editar.
- Mobile-first y responsive obligatorio. Accesibilidad: foco visible, `aria-*`, `prefers-reduced-motion`.
- Performance: imágenes optimizadas (`next/image`), lazy-load de video, Lighthouse > 90.
- Nada de secretos en el repo: API key del LLM en variables de entorno de Vercel.

---

## 7. ESTRUCTURA DE CARPETAS (objetivo)

```
portfolio/
├── app/
│   ├── page.tsx              # one-page (compone las secciones)
│   ├── layout.tsx
│   └── api/chat/route.ts     # chatbot
├── components/
│   ├── sections/             # Hero, Declassify, Projects, ...
│   ├── ui/                   # shadcn
│   └── effects/              # Spotlight, GridBackground, etc.
├── content/
│   ├── projects.ts           # los 5 proyectos
│   ├── profile.ts            # bio, stats, stack
│   └── cv.ts                 # texto del CV para el dossier + chatbot
├── public/
│   ├── logos/                # logos de clientes
│   ├── videos/               # demos (CRM, app)
│   └── cv/Juan_Perez_CV.pdf
├── CLAUDE.md
└── package.json
```

---

## 8. ASSETS NECESARIOS (los provee Juan)

Ver sección "Qué necesito de ti" en el chat. Resumen: logos de clientes, foto, CV en PDF, videos (ya existen), email/links finales, y la API key del LLM (para el chatbot, fase final).

---

## 9. FASES DE CONSTRUCCIÓN

- **F1 Base:** Next.js + Tailwind + shadcn + paleta/tipografía + deploy inicial a Vercel.
- **F2 Hero spotlight (Acto 1):** efecto foco-sigue-mouse + reveal.
- **F3 Declassify (Acto 2):** dossier abre + CV CONFIDENTIAL→DECLASSIFIED en scroll.
- **F4 Secciones:** Trust bar, About, Projects (bento), Stack, How I build, Contact.
- **F5 Chatbot:** API route + Vercel AI SDK + UI.
- **F6 Pulido:** motion fino, responsive, SEO/OG, dominio, analytics.

---

*CLAUDE.md v1 — Portfolio "Confidential Dossier". El front es el protagonista; el back, mínimo.*
