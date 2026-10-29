"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "@/i18n/navigation";

// Reference-site curve (design.md): cubic-bezier(0.8, 0, 0.2, 1), ~700ms total.
const EASE = [0.8, 0, 0.2, 1] as const;
const HALF = 0.35;
const FALLBACK_MS = 4000;

type TransitionContextValue = { navigate: (href: string) => void };

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("usePageTransition needs <PageTransitionProvider>");
  return ctx;
}

const pathOnly = (href: string) =>
  href.split(/[?#]/)[0].replace(/\/$/, "") || "/";

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const busy = useRef(false);
  const fallback = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [blocking, setBlocking] = useState(false);

  const reveal = useCallback(async () => {
    if (fallback.current) clearTimeout(fallback.current);
    await controls.start("reveal");
    controls.set("hidden");
    busy.current = false;
    setBlocking(false);
  }, [controls]);

  const navigate = useCallback(
    async (href: string) => {
      if (busy.current) return;
      if (reduceMotion || pathOnly(href) === pathOnly(pathname)) {
        router.push(href);
        return;
      }
      busy.current = true;
      setBlocking(true);
      await controls.start("cover");
      router.push(href);
      fallback.current = setTimeout(reveal, FALLBACK_MS);
    },
    [controls, pathname, reduceMotion, reveal, router],
  );

  // The new route has rendered: slide the cover away.
  const previousPath = useRef(pathname);
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    if (busy.current) void reveal();
  }, [pathname, reveal]);

  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <motion.div
        aria-hidden
        className="fixed inset-0 z-[100] bg-ink"
        style={{ pointerEvents: blocking ? "auto" : "none" }}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { transform: "translateY(100%)" },
          cover: {
            transform: "translateY(0%)",
            transition: { duration: HALF, ease: EASE },
          },
          reveal: {
            transform: "translateY(-100%)",
            transition: { duration: HALF, ease: EASE },
          },
        }}
      />
    </TransitionContext.Provider>
  );
}
