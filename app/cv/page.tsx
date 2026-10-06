import type { Metadata } from "next";
import CvContent from "@/components/cv/CvContent";

export const metadata: Metadata = {
  title: "Juan Perez — CV",
  description:
    "Curriculum Vitae of Juan Perez, Senior AI Engineer building production LLM agents, RAG and agentic AI systems.",
};

const printStyles = `
  @media print {
    @page { margin: 14mm; }
    html, body { background: #ffffff !important; }
    .no-print { display: none !important; }
    .cv-root { background: #ffffff !important; color: #111111 !important; padding: 0 !important; }
    .cv-sheet { background: #ffffff !important; border: none !important; box-shadow: none !important; max-width: 100% !important; padding: 0 !important; }
    .cv-name { color: #111111 !important; -webkit-text-fill-color: #111111 !important; }
    .cv-muted { color: #444444 !important; }
    .cv-text { color: #1a1a1a !important; }
    .cv-label { color: #6d28d9 !important; }
    .cv-accent { color: #6d28d9 !important; }
    .cv-rule { border-color: #d4d4d4 !important; }
    .cv-chip { background: #f4f1fb !important; border-color: #d8cdf5 !important; color: #3b2a66 !important; }
    a { color: #6d28d9 !important; text-decoration: none !important; }
  }
`;

export default function CvPage() {
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />
      <CvContent />
    </>
  );
}
