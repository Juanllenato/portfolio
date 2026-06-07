import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://juanperez.vercel.app"),
  title: {
    default: "Juan Perez — AI-First Software Engineer",
    template: "%s — Juan Perez",
  },
  description:
    "AI-First Software Engineer building production AI systems — LLM assistants, RAG pipelines, agentic AI and intelligent automation on FastAPI and Python. AI CRM live across LatAm at PrevenSalud, Grupo Alianza Vital, Pontebela and Vida Total Plus.",
  keywords: [
    "AI Engineer",
    "AI-First Software Engineer",
    "Applied AI",
    "LLM",
    "Large Language Models",
    "RAG",
    "Retrieval Augmented Generation",
    "agentic AI",
    "AI agents",
    "FastAPI",
    "Python",
    "Next.js",
    "TypeScript",
    "intelligent automation",
    "machine learning",
    "AI CRM",
    "full stack engineer",
    "Juan Perez",
  ],
  authors: [{ name: "Juan Perez", url: "https://github.com/Juanllenato" }],
  creator: "Juan Perez",
  publisher: "Juan Perez",
  openGraph: {
    type: "website",
    url: "https://juanperez.vercel.app",
    siteName: "Juan Perez — AI-First Software Engineer",
    title: "Juan Perez — AI-First Software Engineer",
    description:
      "Production AI systems: LLM assistants, RAG, agentic AI and intelligent automation on FastAPI and Python. AI CRM live across LatAm.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Perez — AI-First Software Engineer",
    description:
      "Production AI systems: LLM assistants, RAG, agentic AI and intelligent automation. AI CRM live across LatAm.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
