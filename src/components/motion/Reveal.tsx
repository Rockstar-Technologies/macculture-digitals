"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  /** Position in a group; each step adds a 60ms stagger. */
  index?: number;
  className?: string;
};

// Scroll reveal (design.md): 550ms, 24px rise + fade, 60ms stagger, once.
// Uses the full transform string so it stays on the compositor.
export function Reveal({ children, index = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        transform: reduceMotion ? "translateY(0px)" : "translateY(24px)",
      }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{
        duration: reduceMotion ? 0.2 : 0.55,
        delay: reduceMotion ? 0 : index * 0.06,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
