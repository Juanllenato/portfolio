import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Juan Perez — AI-First Software Engineer",
  description:
    "I build production AI systems — LLM assistants, RAG, agentic apps & intelligent automation. AI CRM live across LatAm.",
  metadataBase: new URL("https://juanperez.vercel.app"),
  openGraph: {
    title: "Juan Perez — AI-First Software Engineer",
    description:
      "Production AI systems: LLM assistants, RAG, agentic apps & automation.",
    type: "website",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
