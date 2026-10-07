// Emails the site owner when something breaks (e.g. the chatbot's LLM is down).
// Throttled per server instance so a burst of failing requests sends one email, not hundreds.
const THROTTLE_MS = 6 * 60 * 60 * 1000;
let lastSent = 0;

export async function alertOwner(subject: string, details: string[], { force = false } = {}) {
  const key = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_EMAIL?.trim();
  if (!key || !to) return false;
  if (!force && Date.now() - lastSent < THROTTLE_MS) return false;
  lastSent = Date.now();

  const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] as string);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM?.trim() || "Portfolio <onboarding@resend.dev>",
        to: [to],
        subject: `[Portfolio] ${subject}`,
        html:
          `<p>${esc(subject)}</p><ul>${details.map((d) => `<li><code>${esc(d)}</code></li>`).join("")}</ul>` +
          `<p>Visitors are getting the offline answers meanwhile. Check GROQ_API_KEY / GROQ_MODELS in Vercel, ` +
          `or the provider's model list.</p>`,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
