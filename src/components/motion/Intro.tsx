"use client";

import { useEffect, useRef } from "react";

const WORD = "MACULTURE DIGITALS";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+*#";
const SCRAMBLE_MS = 1300;
const TOTAL_MS = 2300;

// First-load intro: the name resolves out of scrambled characters, then the
// panel lifts away (CSS in globals.css). It is purely visual: the page content
// is already in the HTML underneath and the panel is aria-hidden. Hidden
// entirely for reduced motion.
export function Intro() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / SCRAMBLE_MS, 1);
      const settled = Math.floor(progress * WORD.length);
      el.textContent = WORD.split("")
        .map((ch, i) =>
          ch === " " || i < settled
            ? ch
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        )
        .join("");
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Let the hero text enter right as the panel lifts.
    const done = setTimeout(
      () => document.documentElement.style.setProperty("--hero-delay", "0.1s"),
      TOTAL_MS,
    );
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
    };
  }, []);

  return (
    <div aria-hidden className="intro">
      <span ref={ref} className="intro-word font-display">
        {WORD}
      </span>
      <span className="intro-tag font-mono">Empowering Independent Creatives</span>
    </div>
  );
}
