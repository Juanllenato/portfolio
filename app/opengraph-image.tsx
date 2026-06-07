import { ImageResponse } from "next/og";

export const alt = "Juan Perez — AI-First Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0a0a0b",
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 25% 30%, rgba(139,92,246,0.35), transparent 70%)",
          padding: "96px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#abb2c2",
            marginBottom: 28,
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 132,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1,
          }}
        >
          Juan Perez
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            color: "#b794ff",
            marginTop: 24,
          }}
        >
          AI-First Software Engineer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#abb2c2",
            marginTop: 28,
          }}
        >
          Production AI systems · LLM · RAG · Automation
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 64,
            left: 96,
            fontSize: 26,
            color: "#abb2c2",
          }}
        >
          github.com/Juanllenato
        </div>
      </div>
    ),
    { ...size }
  );
}
