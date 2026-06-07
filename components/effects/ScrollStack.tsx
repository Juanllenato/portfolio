"use client";

import { useLayoutEffect, useRef, useCallback, type ReactNode } from "react";
import "./ScrollStack.css";

export const ScrollStackItem = ({
  children,
  itemClassName = "",
}: {
  children: ReactNode;
  itemClassName?: string;
}) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

// Per-card resting tilt (alternating) → "thrown / disorganized" stack look.
const TILT = [-5, 4, -3.5, 5, -4, 3];

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  blurAmount?: number;
};

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 90,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "22%",
  scaleEndPosition = "12%",
  baseScale = 0.86,
  blurAmount = 0,
}: ScrollStackProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const tickingRef = useRef(false);

  const parsePercentage = useCallback((value: string, h: number) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * h;
    }
    return parseFloat(value);
  }, []);

  const update = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length) return;

    const scrollTop = window.scrollY;
    const vh = window.innerHeight;
    const stackPx = parsePercentage(stackPosition, vh);
    const scaleEndPx = parsePercentage(scaleEndPosition, vh);

    // stable document offset of the scroller (not affected by card transforms)
    const base = scroller.getBoundingClientRect().top + window.scrollY;
    const endEl = scroller.querySelector(".scroll-stack-end") as HTMLElement | null;
    const endTop = endEl ? base + endEl.offsetTop : 0;

    const cards = cardsRef.current;
    cards.forEach((card, i) => {
      const cardTop = base + card.offsetTop;
      const triggerStart = cardTop - stackPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPx;
      const pinStart = triggerStart;
      const pinEnd = endTop - vh / 2;

      let progress = 0;
      if (scrollTop >= triggerStart && scrollTop <= triggerEnd) {
        progress = (scrollTop - triggerStart) / (triggerEnd - triggerStart);
      } else if (scrollTop > triggerEnd) {
        progress = 1;
      }

      const targetScale = baseScale + i * itemScale;
      const scale = 1 - progress * (1 - targetScale);
      const rotation = TILT[i % TILT.length] * progress;

      let blur = 0;
      if (blurAmount) {
        let top = 0;
        for (let j = 0; j < cards.length; j++) {
          const jTop = base + cards[j].offsetTop;
          if (scrollTop >= jTop - stackPx - itemStackDistance * j) top = j;
        }
        if (i < top) blur = Math.max(0, (top - i) * blurAmount);
      }

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPx + itemStackDistance * i;
      }

      card.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(
        3
      )}) rotate(${rotation.toFixed(2)}deg)`;
      card.style.filter = blur > 0 ? `blur(${blur}px)` : "";
    });
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    blurAmount,
    parsePercentage,
  ]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      scroller.querySelectorAll(".scroll-stack-card")
    ) as HTMLElement[];
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
    });

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      rafRef.current = requestAnimationFrame(() => {
        update();
        tickingRef.current = false;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cardsRef.current = [];
    };
  }, [itemDistance, update]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
