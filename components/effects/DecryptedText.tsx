"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion } from "framer-motion";

const styles = {
  wrapper: { display: "inline-block", whiteSpace: "pre-wrap" as const },
  srOnly: {
    position: "absolute" as const,
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    border: 0,
  },
};

type Props = {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover" | "inViewHover" | "click";
  startDelay?: number;
};

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  startDelay = 0,
}: Props) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [isDecrypted, setIsDecrypted] = useState(true);
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const availableChars = useMemo(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((c) => c !== " ")
      : characters.split("");
  }, [useOriginalCharsOnly, text, characters]);

  const shuffleText = useCallback(
    (original: string, revealed: Set<number>) =>
      original
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (revealed.has(i)) return original[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join(""),
    [availableChars]
  );

  const triggerDecrypt = useCallback(() => {
    setRevealedIndices(new Set());
    setIsDecrypted(false);
    setIsAnimating(true);
  }, []);

  useEffect(() => {
    if (!isAnimating) return;
    let iteration = 0;

    const getNextIndex = (revealed: Set<number>) => {
      const len = text.length;
      switch (revealDirection) {
        case "end":
          return len - 1 - revealed.size;
        case "center": {
          const middle = Math.floor(len / 2);
          const offset = Math.floor(revealed.size / 2);
          const next = revealed.size % 2 === 0 ? middle + offset : middle - offset - 1;
          if (next >= 0 && next < len && !revealed.has(next)) return next;
          for (let i = 0; i < len; i++) if (!revealed.has(i)) return i;
          return 0;
        }
        default:
          return revealed.size;
      }
    };

    intervalRef.current = setInterval(() => {
      setRevealedIndices((prev) => {
        if (sequential) {
          if (prev.size < text.length) {
            const next = new Set(prev);
            next.add(getNextIndex(prev));
            setDisplayText(shuffleText(text, next));
            return next;
          }
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsAnimating(false);
          setIsDecrypted(true);
          return prev;
        }
        setDisplayText(shuffleText(text, prev));
        iteration++;
        if (iteration >= maxIterations) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsAnimating(false);
          setDisplayText(text);
          setIsDecrypted(true);
        }
        return prev;
      });
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAnimating, text, speed, maxIterations, sequential, revealDirection, shuffleText]);

  // hover handlers
  const onEnter = useCallback(() => {
    if (isAnimating) return;
    triggerDecrypt();
  }, [isAnimating, triggerDecrypt]);
  const onLeave = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsAnimating(false);
    setRevealedIndices(new Set());
    setDisplayText(text);
    setIsDecrypted(true);
  }, [text]);

  // view mode: start as ciphertext, then decrypt after the stagger delay
  useEffect(() => {
    if (animateOn !== "view" && animateOn !== "inViewHover") return;
    setIsDecrypted(false);
    setRevealedIndices(new Set());
    setDisplayText(shuffleText(text, new Set()));
    const timer = setTimeout(() => triggerDecrypt(), startDelay);
    return () => clearTimeout(timer);
  }, [animateOn, text, shuffleText, startDelay, triggerDecrypt]);

  const hoverProps =
    animateOn === "hover" || animateOn === "inViewHover"
      ? { onMouseEnter: onEnter, onMouseLeave: onLeave }
      : {};

  return (
    <motion.span ref={containerRef} className={parentClassName} style={styles.wrapper} {...hoverProps}>
      <span style={styles.srOnly}>{text}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const revealed = revealedIndices.has(index) || (!isAnimating && isDecrypted);
          return (
            <span key={index} className={revealed ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
