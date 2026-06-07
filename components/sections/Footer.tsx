import Link from "next/link";

const links = [
  { label: "GitHub", href: "https://github.com/Juanllenato", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/juan-perez-ai-engineer",
    external: true,
  },
  { label: "Email", href: "mailto:juans.perezc@gmail.com", external: false },
  { label: "CV", href: "/cv", external: false },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight text-foreground">
              Juan Perez
            </p>
            <p className="mt-1 text-sm text-dim">
              AI-First Software Engineer · Remote
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-dim transition hover:text-accent-light"
                >
                  {link.label}
                </a>
              ) : link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-dim transition hover:text-accent-light"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-dim transition hover:text-accent-light"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-label">Built with Next.js · Deployed on Vercel</p>
          <p className="text-sm text-dim">© 2026 Juan Perez</p>
        </div>
      </div>
    </footer>
  );
}
