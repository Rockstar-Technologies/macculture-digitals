"use client";

import { motion, useReducedMotion } from "framer-motion";

// Heading slides up out of a mask when it scrolls into view.
export function SectionHeading({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={className}>
      {eyebrow && (
        <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </p>
      )}
      {/* The mask is the observed element: a child hidden below an overflow
          clip would never register as in view. */}
      <motion.div
        className="mt-3 overflow-hidden pb-1"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        <motion.h2
          className="font-display text-[clamp(1.5rem,5.5vw,2.25rem)] font-extrabold uppercase leading-none tracking-tight text-white sm:text-5xl"
          variants={{
            hidden: { transform: reduce ? "translateY(0%)" : "translateY(110%)" },
            shown: { transform: "translateY(0%)" },
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h2>
      </motion.div>
    </div>
  );
}
