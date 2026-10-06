"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "es";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void };

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // hydrate from localStorage / browser language on mount
  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      window.localStorage.getItem("lang")) as Lang | null;
    if (saved === "en" || saved === "es") {
      setLangState(saved);
      document.documentElement.lang = saved;
      return;
    }
    const nav = typeof navigator !== "undefined" ? navigator.language : "en";
    const initial: Lang = nav.toLowerCase().startsWith("es") ? "es" : "en";
    setLangState(initial);
    document.documentElement.lang = initial;
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", l);
      document.documentElement.lang = l;
    }
  };

  const toggle = () => setLang(lang === "en" ? "es" : "en");

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

/** Convenience hook: returns the dictionary for the active language. */
export function useT() {
  const { lang } = useLang();
  return { t: dict[lang] as Dict, lang };
}

// ─────────────────────────────────────────────────────────────────────────────
// DICTIONARY — every user-facing string, EN + ES
// ─────────────────────────────────────────────────────────────────────────────

const en = {
  hero: {
    title: "Juan Perez",
    subtitle: "AI-First Software Engineer",
    line1:
      "I turn LLMs into production systems that run real businesses — LLM assistants, RAG, agentic apps & intelligent automation.",
    line2: "Curious? Ask my AI assistant anything about my work.",
    askAi: "Ask my AI",
    github: "View GitHub",
    scroll: "↓ scroll to explore",
  },
  projects: {
    label: "SECTION_01 // IN PRODUCTION",
    titleA: "Real systems,",
    titleB: "real businesses.",
    blurb:
      "Not demos — AI agents, platforms and websites built for real companies across Colombia & Peru. Each badge says what's live and what's in pilot. Click a card to open the case study.",
    tags: ["AI agents", "WhatsApp", "RAG", "Evals", "OCR", "Full-stack"],
    roleLabel: "Role",
    stackLabel: "Stack",
    openLive: "Open live site ↗",
    viewGithub: "View on GitHub",
    open: "Open ↗",
    items: {
      crm: {
        tagline: "Contextual LLM assistant · OCR · automated reporting",
        badge: "Production · 120+ users",
        role: "Design, architecture & full-stack development",
        description:
          "Replaced manual finance, reporting and customer-management work with a multi-tenant AI CRM deployed in production. A contextual LLM assistant (RAG over live business data, PII-free) answers questions by conversation, an OCR-over-WhatsApp pipeline replaces manual invoice entry, and a Celery layer automates nightly PDF reporting — all isolated per company via PostgreSQL row-level security.",
      },
      sinfrontera: {
        tagline: "WhatsApp AI sales agent · hybrid search · evals",
        badge: "AI agent · Pilot",
        role: "Architecture, AI engineering & full-stack development",
        description:
          "WhatsApp sales agent for an industrial real-estate firm in Colombia (about 100 properties, 1,200–1,500 leads a month). It qualifies leads and books site visits for the general manager, using hybrid retrieval (SQL filters + Spanish full-text + pgvector embeddings fused with RRF) and 11 strict-schema tools. A 12-tool internal assistant lets the team query and update data in natural language, with a person confirming every change. Deterministic guards block data leaks and ungrounded numbers, and 43 eval scenarios with simulated prospects and an LLM judge check every prompt change. Running as a supervised shadow-mode pilot.",
      },
      ainea: {
        tagline: "WhatsApp AI sales SaaS + sales-team CRM",
        badge: "SaaS · Live",
        role: "Product architecture & full-stack AI engineering",
        description:
          "Multi-tenant SaaS that closes the loop for LatAm SMBs: Meta ad → WhatsApp chat → AI sales agent → store order → Conversions API purchase → repurchase. Self-serve onboarding with Embedded Signup and WhatsApp Coexistence, Shopify orders, Marketing API campaigns and Stripe Billing, on a Postgres turn queue with locks, retries and a dead-letter queue (760+ tests). The same app hosts the CRM the sales team runs on: lead routing, Google Meet scheduling, email follow-ups, metrics and commissions.",
      },
      autos: {
        tagline: "AI platform for used-car dealerships",
        badge: "SaaS · AI",
        role: "Architecture & AI engineering",
        description:
          "Multi-tenant platform for used-car dealers in Colombia and Peru: a 24/7 WhatsApp buyer agent (inventory search, server-side financing calculator, trade-in capture, test-drive booking), a web CRM and a 27-tool assistant that lets owners and salespeople run the business by chat, with propose-then-confirm actions and proactive alerts. Lead qualification runs on a deterministic rules engine. Built on the same agent architecture as Sin Frontera, which let the new vertical ship in 2 days.",
      },
      bacca: {
        tagline: "WhatsApp orders & reservations · 3 locations",
        badge: "AI agent · Pilot",
        role: "Architecture & AI engineering",
        description:
          "Multi-tenant WhatsApp agent for a steakhouse group with 3 locations in Bucaramanga, Colombia: menu, delivery and pickup orders, table reservations and handoff to staff. Built on Claude with 13 strict tools and 4 deterministic guards (every price must match the menu or computed totals), seat-capacity booking with Postgres advisory locks, voice-note transcription and menu extraction from photos and PDFs. A new restaurant is onboarded as configuration, not code. Preparing a supervised pilot.",
      },
      prevensalud: {
        tagline: "Healthcare platform · custom build",
        badge: "Production",
        role: "Full-stack web development & deployment",
        description:
          "Deployed and maintained in production as the public face of a preventive-health company. Built from scratch as a custom Astra child theme with bespoke page templates (booking, treatments catalog), a design-token system, GSAP motion and a fully responsive, mobile-first layout.",
      },
      alianza: {
        tagline: "Corporate platform · WhatsApp-first commerce",
        badge: "Production",
        role: "Design system & full-stack development",
        description:
          "Live corporate/commerce platform that replaces the traditional cart with a WhatsApp-first ordering flow. Built on a hand-designed “Liquid Glass” system with a section-based modular architecture (isolated PHP + CSS + JS per section) and custom WooCommerce styling.",
      },
      pontebela: {
        tagline: "Shopify store · AI-generated creatives",
        badge: "E-commerce · AI",
        role: "Shopify build & AI creative direction",
        description:
          "Shopify storefront for a supplements brand, deployed and running in production with a custom catalog and sales flows. I also produced all of the brand's advertising imagery end-to-end using AI image generation (Nano Banana / Gemini), from concept to final creative.",
      },
    },
  },
  trusted: {
    label: "SECTION_03 // TRUSTED BY",
    title: "Companies that trusted my work",
    blurb:
      "Real businesses across Colombia & Peru running software I designed, built and deployed.",
    counting: "// and counting",
    sectors: {
      prevensalud: "Healthcare · AI CRM",
      alianza: "Healthcare · Platform",
      ainea: "Software & AI studio",
      pontebela: "E-commerce · Supplements",
      vida: "Health & wellness",
    },
  },
  about: {
    label: "SECTION_02 // WHO I AM",
    title: "Let’s build something real.",
    blurb:
      "Senior AI Engineer with 5+ years building production software. I lead AI product engineering remotely for a US-based company (Houston, TX): WhatsApp AI agents, AI CRMs and SaaS platforms for clients across Colombia & Peru, end to end.",
    stats: [
      { value: "5+ yrs", label: "Building software" },
      { value: "Colombia & Peru", label: "Production deployments" },
      { value: "UTS", label: "Systems Engineering" },
    ],
    stackLabel: "Stack",
    strengthsLabel: "Strengths",
    stack: ["Python", "FastAPI", "LLM / RAG", "Agentic AI", "React / Next.js", "Automation"],
    strengths: ["Problem solving", "Ownership", "Self-directed", "Clear communication"],
    getInTouch: "Get in touch",
    viewGithub: "View GitHub",
  },
  skills: {
    label: "SECTION_04 // CAPABILITIES",
    title: "Technical skills & knowledge",
    blurb:
      "Scroll through what I work with — from AI systems to backends, frontend, automation and beyond.",
    cards: [
      { title: "AI & LLM Engineering", blurb: "Turning language models into reliable, production features." },
      { title: "Backend Engineering", blurb: "Secure, scalable, multi-tenant systems." },
      { title: "Frontend & Mobile", blurb: "Shipping the whole product, end to end." },
      { title: "Automation & DevOps", blurb: "Replacing manual processes; deploying reliably." },
      { title: "AI for Creative & Tooling", blurb: "Using AI across the whole workflow, not just code." },
    ],
  },
  faq: {
    label: "SECTION_05 // FAQ",
    title: "Frequently asked",
    blurb: "Quick answers for recruiters, founders and teams.",
    items: [
      {
        q: "What do you build?",
        a: "Production AI-first software end to end — LLM assistants, RAG systems, agentic apps, OCR/document pipelines, intelligent automation, backends and full-stack/mobile products. From the AI layer to deployment.",
      },
      {
        q: "Are these real production systems?",
        a: "Yes. The CRMs, platforms and websites run in production for real companies across Colombia & Peru, and the newest AI agents (real estate and restaurants) are in supervised pilots with real clients — each card's badge says which. None of it is a demo or course project. You can open the live sites and the engineering case studies on GitHub.",
      },
      {
        q: "Are you available for remote work?",
        a: "Yes — I work fully remote and I'm in a LatAm time zone that overlaps comfortably with US hours. Open to full-time, contract and freelance.",
      },
      {
        q: "What's your core stack?",
        a: "Python · FastAPI · PostgreSQL/pgvector · LLM APIs (Claude/GPT) · RAG · agentic tool-calling (LangChain/LangGraph) · OCR · n8n · React/Next.js · React Native · Docker.",
      },
      {
        q: "How do you ensure AI quality?",
        a: "I'm eval-first: I measure AI features with versioned test sets, metrics and LLM-as-judge, and gate changes in CI so quality never silently regresses. (See my llm-eval-harness on GitHub.)",
      },
      {
        q: "How do we start working together?",
        a: "Reach out on LinkedIn or by email — tell me what you're building and what you need. I'll get back to you quickly to scope it out.",
      },
    ],
  },
  testimonials: {
    label: "SECTION_06 // VERIFIED",
    title: "What clients say",
    blurb:
      "Real feedback from clients whose businesses run on software I built — verifiable, with their authorization.",
    verified: "Verified client",
    proof: "View proof (WhatsApp)",
    referenceNote:
      "References available on request — happy to connect you with them directly.",
    items: [
      {
        quote:
          "Juan developed the CRM with AI and the automations for Grupo Alianza Vital. He understood our business — he didn't just code: he replaced manual tasks with a reliable system we use every day. Responsible, clear in communication and highly capable technically. I recommend him without hesitation for any software or AI project.",
        name: "Linda Marcela Cárdenas",
        role: "Administrative Manager",
        company: "Grupo Alianza Vital",
        image: "/testimonials/alianza-vital.png",
      },
      {
        quote:
          "Juan built Pontebela's e-commerce store and produced all our advertising content using AI, from concept to the final piece. Committed, he solved everything we needed and kept excellent communication throughout the project. I recommend him for web development, e-commerce and AI automation.",
        name: "Marina Corzo",
        role: "Human Resources",
        company: "Pontebela",
        image: "/testimonials/pontebela.png",
      },
    ],
  },
  footer: {
    role: "AI-First Software Engineer · Remote",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
    cv: "CV",
    downloadCv: "Download CV (PDF)",
    built: "Built with Next.js · Deployed on Vercel",
    rights: "© 2026 Juan Perez",
  },
  chat: {
    greeting:
      "Hi — I'm Juan's AI assistant. Ask me anything about his work, skills or experience, or leave him a message and I'll send it over.",
    title: "Juan’s AI Assistant",
    subtitle: "agentic · voice · can email Juan",
    placeholder: "Ask anything about Juan…",
    listening: "Listening…",
    send: "Send",
    suggestions: [
      "What does Juan build?",
      "Are these real production systems?",
      "What's his tech stack?",
      "Is he available to hire?",
      "Leave him a message",
      "Book a call",
    ],
    voiceUnsupported: "Voice input isn't supported in this browser. Try Chrome.",
  },
  toggle: { label: "ES", aria: "Cambiar a español" },
};

type Dict = typeof en;

const es: Dict = {
  hero: {
    title: "Juan Perez",
    subtitle: "Ingeniero de Software AI-First",
    line1:
      "Convierto LLMs en sistemas de producción que mueven negocios reales — asistentes con IA, RAG, apps agénticas y automatización inteligente.",
    line2: "¿Con curiosidad? Pregúntale lo que quieras a mi asistente de IA sobre mi trabajo.",
    askAi: "Hablar con mi IA",
    github: "Ver GitHub",
    scroll: "↓ baja para explorar",
  },
  projects: {
    label: "SECTION_01 // EN PRODUCCIÓN",
    titleA: "Sistemas reales,",
    titleB: "negocios reales.",
    blurb:
      "No son demos: agentes de IA, plataformas y sitios web construidos para empresas reales en Colombia y Perú. Cada etiqueta indica qué está en vivo y qué está en piloto. Haz clic en una tarjeta para abrir el caso de estudio.",
    tags: ["Agentes de IA", "WhatsApp", "RAG", "Evals", "OCR", "Full-stack"],
    roleLabel: "Rol",
    stackLabel: "Stack",
    openLive: "Abrir sitio en vivo ↗",
    viewGithub: "Ver en GitHub",
    open: "Abrir ↗",
    items: {
      crm: {
        tagline: "Asistente LLM contextual · OCR · reportes automáticos",
        badge: "Producción · +120 usuarios",
        role: "Diseño, arquitectura y desarrollo full-stack",
        description:
          "Reemplacé el trabajo manual de finanzas, reportería y gestión de clientes con un CRM con IA multi-tenant desplegado en producción. Un asistente LLM contextual (RAG sobre datos reales del negocio, sin PII) responde por conversación, un pipeline de OCR por WhatsApp reemplaza la captura manual de facturas, y una capa con Celery automatiza los reportes PDF nocturnos — todo aislado por empresa con row-level security de PostgreSQL.",
      },
      sinfrontera: {
        tagline: "Agente de ventas con IA por WhatsApp · búsqueda híbrida · evals",
        badge: "Agente IA · Piloto",
        role: "Arquitectura, ingeniería de IA y desarrollo full-stack",
        description:
          "Agente de ventas por WhatsApp para una firma de inmuebles industriales en Colombia (unos 100 activos, 1.200–1.500 leads al mes). Califica leads y agenda visitas para el gerente general, con búsqueda híbrida (filtros SQL + texto completo en español + embeddings pgvector fusionados con RRF) y 11 herramientas con esquema estricto. Un asistente interno de 12 herramientas permite al equipo consultar y actualizar datos en lenguaje natural, con una persona confirmando cada cambio. Guardas deterministas bloquean fugas de datos y cifras sin fuente, y 43 escenarios de evaluación con prospectos simulados y un LLM juez revisan cada cambio de prompt. En piloto supervisado en modo sombra.",
      },
      ainea: {
        tagline: "SaaS de ventas con IA por WhatsApp + CRM del equipo comercial",
        badge: "SaaS · En vivo",
        role: "Arquitectura de producto e ingeniería de IA full-stack",
        description:
          "SaaS multi-tenant que cierra el ciclo para pymes de LatAm: anuncio en Meta → chat de WhatsApp → agente de ventas con IA → pedido en la tienda → compra en Conversions API → recompra. Alta autoservicio con Embedded Signup y Coexistencia de WhatsApp, pedidos en Shopify, campañas por Marketing API y Stripe Billing, sobre una cola de turnos en Postgres con bloqueos, reintentos y cola de errores (más de 760 pruebas). La misma app aloja el CRM con el que trabaja el equipo comercial: reparto de leads, agenda con Google Meet, seguimiento por correo, métricas y comisiones.",
      },
      autos: {
        tagline: "Plataforma de IA para concesionarios de usados",
        badge: "SaaS · IA",
        role: "Arquitectura e ingeniería de IA",
        description:
          "Plataforma multi-tenant para concesionarios de usados en Colombia y Perú: un agente comprador 24/7 por WhatsApp (búsqueda en inventario, simulador de financiación calculado en el servidor, registro de retoma, agenda de test drive), un CRM web y un asistente de 27 herramientas con el que dueños y vendedores manejan el negocio por chat, con acciones que una persona confirma y alertas proactivas. La calificación de leads usa un motor de reglas determinista. Está construida sobre la misma arquitectura de agentes de Sin Frontera, lo que permitió lanzar la nueva vertical en 2 días.",
      },
      bacca: {
        tagline: "Pedidos y reservas por WhatsApp · 3 sedes",
        badge: "Agente IA · Piloto",
        role: "Arquitectura e ingeniería de IA",
        description:
          "Agente multi-tenant de WhatsApp para un grupo de restaurantes de carnes con 3 sedes en Bucaramanga, Colombia: carta, pedidos a domicilio y para recoger, reservas de mesa y traspaso al personal. Construido sobre Claude con 13 herramientas estrictas y 4 guardas deterministas (todo precio debe coincidir con la carta o con totales calculados), reservas con aforo usando advisory locks de Postgres, transcripción de notas de voz y extracción de la carta desde fotos y PDF. Un restaurante nuevo se da de alta como configuración, no como código. Preparando un piloto supervisado.",
      },
      prevensalud: {
        tagline: "Plataforma de salud · desarrollo a medida",
        badge: "Producción",
        role: "Desarrollo web full-stack y despliegue",
        description:
          "Desplegada y mantenida en producción como la cara pública de una empresa de salud preventiva. Construida desde cero como un child theme de Astra a medida, con plantillas propias (reservas, catálogo de tratamientos), un sistema de design tokens, animación con GSAP y un diseño totalmente responsive, mobile-first.",
      },
      alianza: {
        tagline: "Plataforma corporativa · comercio WhatsApp-first",
        badge: "Producción",
        role: "Sistema de diseño y desarrollo full-stack",
        description:
          "Plataforma corporativa/comercial en vivo que reemplaza el carrito tradicional por un flujo de pedidos WhatsApp-first. Construida sobre un sistema “Liquid Glass” diseñado a mano, con arquitectura modular por secciones (PHP + CSS + JS aislados por sección) y estilizado personalizado de WooCommerce.",
      },
      pontebela: {
        tagline: "Tienda Shopify · creativos generados con IA",
        badge: "E-commerce · IA",
        role: "Desarrollo Shopify y dirección creativa con IA",
        description:
          "Tienda Shopify para una marca de suplementos, desplegada y corriendo en producción con catálogo y flujos de venta personalizados. Además produje todo el material publicitario de la marca de principio a fin usando generación de imágenes con IA (Nano Banana / Gemini), desde el concepto hasta el creativo final.",
      },
    },
  },
  trusted: {
    label: "SECTION_03 // CONFÍAN EN MÍ",
    title: "Empresas que confiaron en mi trabajo",
    blurb:
      "Negocios reales en Colombia y Perú corriendo software que diseñé, construí y desplegué.",
    counting: "// y sumando",
    sectors: {
      prevensalud: "Salud · CRM con IA",
      alianza: "Salud · Plataforma",
      ainea: "Estudio de software e IA",
      pontebela: "E-commerce · Suplementos",
      vida: "Salud y bienestar",
    },
  },
  about: {
    label: "SECTION_02 // QUIÉN SOY",
    title: "Construyamos algo real.",
    blurb:
      "Ingeniero de IA Senior con más de 5 años construyendo software de producción. Lidero de forma remota la ingeniería de productos de IA para una empresa de EE. UU. (Houston, TX): agentes de IA por WhatsApp, CRM con IA y plataformas SaaS para clientes en Colombia y Perú, de punta a punta.",
    stats: [
      { value: "5+ años", label: "Construyendo software" },
      { value: "Colombia y Perú", label: "Despliegues en producción" },
      { value: "UTS", label: "Ingeniería de Sistemas" },
    ],
    stackLabel: "Stack",
    strengthsLabel: "Fortalezas",
    stack: ["Python", "FastAPI", "LLM / RAG", "IA Agéntica", "React / Next.js", "Automatización"],
    strengths: ["Resolución de problemas", "Responsabilidad total", "Autonomía", "Comunicación clara"],
    getInTouch: "Hablemos",
    viewGithub: "Ver GitHub",
  },
  skills: {
    label: "SECTION_04 // CAPACIDADES",
    title: "Habilidades y conocimientos técnicos",
    blurb:
      "Recorre lo que manejo — desde sistemas de IA hasta backends, frontend, automatización y más.",
    cards: [
      { title: "Ingeniería de IA y LLMs", blurb: "Convertir modelos de lenguaje en funciones confiables de producción." },
      { title: "Ingeniería Backend", blurb: "Sistemas seguros, escalables y multi-tenant." },
      { title: "Frontend y Móvil", blurb: "Entregar el producto completo, de punta a punta." },
      { title: "Automatización y DevOps", blurb: "Reemplazar procesos manuales; desplegar con confianza." },
      { title: "IA para Creatividad y Tooling", blurb: "Usar IA en todo el flujo de trabajo, no solo en el código." },
    ],
  },
  faq: {
    label: "SECTION_05 // PREGUNTAS",
    title: "Preguntas frecuentes",
    blurb: "Respuestas rápidas para reclutadores, founders y equipos.",
    items: [
      {
        q: "¿Qué construyes?",
        a: "Software AI-first de producción de punta a punta — asistentes LLM, sistemas RAG, apps agénticas, pipelines de OCR/documentos, automatización inteligente, backends y productos full-stack/móviles. Desde la capa de IA hasta el despliegue.",
      },
      {
        q: "¿Son sistemas reales en producción?",
        a: "Sí. Los CRM, plataformas y sitios web corren en producción para empresas reales en Colombia y Perú, y los agentes de IA más nuevos (inmobiliaria y restaurantes) están en pilotos supervisados con clientes reales; la etiqueta de cada tarjeta indica cuál es cuál. Nada de esto es una demo ni un proyecto de curso. Puedes abrir los sitios en vivo y los casos de estudio de ingeniería en GitHub.",
      },
      {
        q: "¿Estás disponible para trabajo remoto?",
        a: "Sí — trabajo 100% remoto y estoy en una zona horaria de LatAm que se solapa cómodamente con horario de EE. UU. Abierto a tiempo completo, contrato y freelance.",
      },
      {
        q: "¿Cuál es tu stack principal?",
        a: "Python · FastAPI · PostgreSQL/pgvector · APIs LLM (Claude/GPT) · RAG · tool-calling agéntico (LangChain/LangGraph) · OCR · n8n · React/Next.js · React Native · Docker.",
      },
      {
        q: "¿Cómo aseguras la calidad de la IA?",
        a: "Soy eval-first: mido las funciones de IA con sets de prueba versionados, métricas y LLM-as-judge, y bloqueo cambios en CI para que la calidad nunca baje en silencio. (Mira mi llm-eval-harness en GitHub.)",
      },
      {
        q: "¿Cómo empezamos a trabajar juntos?",
        a: "Escríbeme por LinkedIn o correo — cuéntame qué estás construyendo y qué necesitas. Te respondo rápido para definir el alcance.",
      },
    ],
  },
  testimonials: {
    label: "SECTION_06 // VERIFICADO",
    title: "Lo que dicen mis clientes",
    blurb:
      "Testimonios reales de clientes cuyos negocios funcionan con software que construí — verificables y con su autorización.",
    verified: "Cliente verificado",
    proof: "Ver prueba (WhatsApp)",
    referenceNote:
      "Referencias disponibles a solicitud — con gusto te conecto directamente con ellas.",
    items: [
      {
        quote:
          "Trabajé con Juan en el desarrollo del CRM con IA y las automatizaciones de Grupo Alianza Vital. Entendió nuestro negocio, no solo programó: reemplazó tareas manuales por un sistema confiable que usamos a diario. Responsable, claro en la comunicación y muy capaz técnicamente. Lo recomiendo sin dudarlo para cualquier proyecto de software o IA.",
        name: "Linda Marcela Cárdenas",
        role: "Gerente Administrativa",
        company: "Grupo Alianza Vital",
        image: "/testimonials/alianza-vital.png",
      },
      {
        quote:
          "Juan desarrolló la tienda de e-commerce de Pontebela y produjo todo nuestro contenido publicitario usando inteligencia artificial, desde el concepto hasta la pieza final. Comprometido, resolvió todo lo que necesitábamos y mantuvo una comunicación excelente durante el proyecto. Lo recomiendo para desarrollo web, e-commerce y automatización con IA.",
        name: "Marina Corzo",
        role: "Recursos Humanos",
        company: "Pontebela",
        image: "/testimonials/pontebela.png",
      },
    ],
  },
  footer: {
    role: "Ingeniero de Software AI-First · Remoto",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Correo",
    cv: "CV",
    downloadCv: "Descargar CV (PDF)",
    built: "Hecho con Next.js · Desplegado en Vercel",
    rights: "© 2026 Juan Perez",
  },
  chat: {
    greeting:
      "¡Hola! Soy el asistente de IA de Juan. Cuéntame qué buscas: puedo contarte sobre su trabajo y experiencia, o conectarte directo con él. ¿En qué te ayudo?",
    title: "Asistente de IA de Juan",
    subtitle: "IA conversacional · voz · te conecta con Juan",
    placeholder: "Escríbeme lo que quieras saber de Juan…",
    listening: "Escuchando…",
    send: "Enviar",
    suggestions: [
      "¿Qué hace Juan?",
      "¿Son proyectos reales en producción?",
      "¿Con qué tecnologías trabaja?",
      "¿Está disponible para trabajar?",
      "Dejarle un mensaje",
      "Quiero hablar con él",
    ],
    voiceUnsupported: "La entrada por voz no está soportada en este navegador. Prueba con Chrome.",
  },
  toggle: { label: "EN", aria: "Switch to English" },
};

export const dict = { en, es };
