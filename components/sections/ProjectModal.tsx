"use client";

import { useEffect } from "react";

export type Project = {
  name: string;
  url: string;
  domain: string;
  tagline: string;
  badge: string;
  image: string;
  role: string;
  description: string;
  stack: string[];
  github?: string;
};

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
    >
      <div
        className="absolute inset-0 bg-[#06040a]/97 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative z-10 flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-[0_30px_120px_rgba(0,0,0,0.7)]">
        {/* sticky header bar */}
        <div className="flex shrink-0 items-center gap-3 border-b border-border bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 truncate font-mono text-xs text-dim">
            {project.domain}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-border px-3 py-1 font-mono text-xs text-foreground transition hover:border-accent-light"
            >
              Open ↗
            </a>
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-md border border-border px-3 py-1 font-mono text-xs text-foreground transition hover:border-accent-light"
            >
              ✕
            </button>
          </div>
        </div>

        {/* scrollable content: full-width screenshot + case study */}
        <div className="scrollbar-slim flex-1 overflow-y-auto">
          {/* screenshot — full width, real proportions, no zoom */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.name} screenshot`}
            className="block w-full"
          />

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[11px] text-accent-light">
                {project.badge}
              </span>
              <span className="mono-label">{project.domain}</span>
            </div>

            <h3 className="mt-4 text-2xl font-bold text-white">{project.name}</h3>
            <p className="mt-1 text-sm text-accent-light">{project.role}</p>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/85">
              {project.description}
            </p>

            <div className="mt-6">
              <span className="mono-label">Stack</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border px-3 py-1 font-mono text-xs text-dim"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-light hover:shadow-[0_0_30px_var(--glow)]"
              >
                Open live site ↗
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent-light"
                >
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
