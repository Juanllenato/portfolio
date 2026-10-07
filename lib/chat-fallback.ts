// Keyword answers used when no LLM is reachable (server: all providers failed; client: network error).
// Keep the facts in sync with the system prompt in app/api/chat/route.ts.
export function fallbackAnswer(input: string, lang: "en" | "es"): string {
  const q = input.toLowerCase();
  const has = (...k: string[]) => k.some((w) => q.includes(w));

  if (lang === "es") {
    if (has("contact", "correo", "mensaje", "linkedin", "llamada", "agendar", "hablar", "contratar"))
      return "La forma más rápida de hablar con Juan es por LinkedIn: https://www.linkedin.com/in/juan-perez-ai-engineer";
    if (has("stack", "tecno", "herramienta", "lenguaje"))
      return "Juan trabaja con TypeScript/Node.js y Python (FastAPI), PostgreSQL/Supabase con pgvector, Claude y modelos abiertos, RAG, agentes con tool calling, evaluaciones con LLM como juez, WhatsApp Cloud API, n8n, React/Next.js y Docker.";
    if (has("dispon", "remoto", "trabajo", "empleo", "freelance"))
      return "Sí, Juan está disponible para roles remotos de AI Engineer (tiempo completo, contrato o freelance). Está en Colombia, con horario que se solapa con EE. UU.";
    if (has("proyecto", "constru", "hace", "experiencia", "producto", "agente"))
      return "Juan es Ingeniero de IA Senior en AINEATECH (Houston, TX). Ha construido agentes de ventas con IA por WhatsApp para inmobiliarias, concesionarios y restaurantes, un SaaS de ventas con IA, y dos CRM con IA, uno con más de 120 usuarios activos. Los detalles están en la sección de proyectos.";
    return "Puedo contarte sobre los proyectos, el stack, la experiencia o la disponibilidad de Juan. Si prefieres hablar con él directamente: https://www.linkedin.com/in/juan-perez-ai-engineer";
  }

  if (has("contact", "email", "message", "linkedin", "call", "book", "hire", "talk"))
    return "The fastest way to reach Juan is on LinkedIn: https://www.linkedin.com/in/juan-perez-ai-engineer";
  if (has("stack", "tech", "tools", "language"))
    return "Juan works with TypeScript/Node.js and Python (FastAPI), PostgreSQL/Supabase with pgvector, Claude and open-weight models, RAG, tool-calling agents, LLM-as-judge evals, the WhatsApp Cloud API, n8n, React/Next.js and Docker.";
  if (has("available", "remote", "job", "role", "freelance"))
    return "Yes, Juan is open to remote AI Engineer roles (full-time, contract or freelance). He's in Colombia, with hours that overlap US time zones.";
  if (has("project", "build", "built", "do", "experience", "product", "agent"))
    return "Juan is a Senior AI Engineer at AINEATECH (Houston, TX). He has built WhatsApp AI sales agents for real estate, car dealerships and restaurants, an AI sales SaaS, and two AI CRMs, one with 120+ active users. The projects section has the details.";
  return "I can tell you about Juan's projects, stack, experience or availability. If you'd rather talk to him directly: https://www.linkedin.com/in/juan-perez-ai-engineer";
}
