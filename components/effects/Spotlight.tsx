"use client";

import { useEffect, useRef } from "react";

/**
 * Mouse-following spotlight. Renders a radial glow that tracks the cursor,
 * giving the "search in the dark" feel of Act 1. Updates a CSS variable via
 * requestAnimationFrame for smooth, cheap movement. On touch devices it idles
 * centered. This is the lightweight Phase-1 version; the full reveal mask
 * comes in Phase 2.
 */
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const move = (x: number, y: number) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.setProperty("--x", `${x}px`);
        el.style.setProperty("--y", `${y}px`);
      });
    };

    const onMouse = (e: MouseEvent) => move(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) move(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(420px circle at var(--x, 50%) var(--y, 30%), rgba(124,58,237,0.18), transparent 70%)",
      }}
    />
  );
}
