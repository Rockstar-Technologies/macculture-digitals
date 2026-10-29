"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Eased, inertial page scrolling. Off for reduced-motion visitors and for
// touch devices, which already have native momentum scrolling.
export function SmoothScroll() {
  useEffect(() => {
    const skip = window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)");
    if (skip.matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
