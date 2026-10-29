"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { home } from "@/config/home";
import { Button } from "@/components/ui/Button";

const INTERVAL_MS = 6000;
const FADE_MS = 1200;

// True once the page has fully loaded, so clips never compete with it.
function subscribeToLoad(callback: () => void) {
  document.addEventListener("readystatechange", callback);
  return () => document.removeEventListener("readystatechange", callback);
}
const isPageLoaded = () => document.readyState === "complete";
const isServer = () => false;

// Full-screen background slideshow of looping, muted video clips. Slides
// crossfade; only the visible clip plays. With reduced motion, or when paused,
// the clips stay on their still poster frame.
export function Hero() {
  const t = useTranslations("home.hero");
  const tagline = useTranslations("brand")("tagline");
  const reduceMotion = useReducedMotion();
  const videos = home.hero.videos;
  const total = videos.length;
  const [index, setIndex] = useState(0);
  const loaded = useSyncExternalStore(subscribeToLoad, isPageLoaded, isServer);
  // The next clip is only fetched a few seconds after load, so the visible
  // clip and the page's own files are not slowed down by it.
  const [warm, setWarm] = useState(false);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const zoom = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 1.15]);
  const lift = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -80]);
  const playing = !reduceMotion && loaded;

  useEffect(() => {
    if (!loaded) return;
    const id = setTimeout(() => setWarm(true), 4000);
    return () => clearTimeout(id);
  }, [loaded]);

  // Advance to the next slide on a timer.
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), INTERVAL_MS);
    return () => clearInterval(id);
  }, [playing, index, total]);

  // Play the visible clip from the start; stop the others once they have faded.
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    refs.current.forEach((video, i) => {
      if (!video) return;
      video.muted = true;
      if (i === index && playing) {
        video.currentTime = 0;
        void video.play().catch(() => {
          // Autoplay can be refused (for example in low-power mode); the
          // poster frame stays visible instead.
        });
      } else if (i === index) {
        video.pause();
      } else {
        timers.push(setTimeout(() => video.pause(), FADE_MS + 100));
      }
    });
    return () => timers.forEach(clearTimeout);
  }, [index, playing]);

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label={t("slideshow")}
      className="relative isolate flex min-h-dvh items-end overflow-hidden"
    >
      <motion.div aria-hidden style={{ scale: zoom }} className="absolute inset-0 -z-10 bg-ink">
        {videos.map((video, i) => (
          <video
            key={video.src}
            ref={(el) => {
              refs.current[i] = el;
            }}
            src={video.src}
            poster={i === index || warm ? video.poster : undefined}
            muted
            loop
            playsInline
            tabIndex={-1}
            preload={
              loaded && (i === index || (warm && i === (index + 1) % total))
                ? "auto"
                : "none"
            }
            className={`absolute inset-0 size-full object-cover transition-opacity ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: `${FADE_MS}ms` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_100%,rgb(255_106_0/0.18),transparent_60%)]" />
      </motion.div>

      <motion.div
        style={{ y: lift }}
        className="mx-auto w-full max-w-7xl px-5 pb-16 pt-[calc(var(--header-h)+2rem)] sm:px-8 sm:pb-24"
      >
        <p className="hero-in font-mono text-xs font-bold uppercase tracking-[0.25em] text-accent" style={{ animationDelay: "calc(var(--hero-delay) + 0ms)" }}>
          {tagline}
        </p>
        <div className="mt-4 overflow-hidden pb-2">
          <h1
            className="hero-rise max-w-5xl font-display text-[clamp(2rem,8.5vw,3rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "calc(var(--hero-delay) + 100ms)" }}
          >
            {t("title")}
          </h1>
        </div>
        <p
          className="hero-in mt-6 max-w-2xl text-base leading-relaxed text-light sm:text-lg"
          style={{ animationDelay: "calc(var(--hero-delay) + 350ms)" }}
        >
          {t("body")}
        </p>
        <div
          className="hero-in mt-8 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "calc(var(--hero-delay) + 500ms)" }}
        >
          <Button href="/get-involved">{t("getInvolved")}</Button>
          <Button href="/contact" variant="secondary">
            {t("contact")}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
