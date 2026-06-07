"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print rounded-md border border-border bg-bg-elevated px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent-light"
      aria-label="Print or save this CV as PDF"
    >
      Print / Save as PDF
    </button>
  );
}
