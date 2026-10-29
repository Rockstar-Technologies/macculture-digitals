"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { navItems, donateHref } from "@/config/nav";
import { usePathname } from "@/i18n/navigation";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LogoMark } from "./Logo";
import { SocialIcons } from "./SocialIcons";

export function Header() {
  const t = useTranslations();
  const socialLabels = {
    linkedin: t("social.linkedin"),
    facebook: t("social.facebook"),
    instagram: t("social.instagram"),
    tiktok: t("social.tiktok"),
  };
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  // The menu is open only for the page it was opened on, so it closes by
  // itself when the route changes.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = (value: boolean | ((v: boolean) => boolean)) => {
    const next = typeof value === "function" ? value(open) : value;
    setOpenPath(next ? pathname : null);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenPath(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-200 ease-out ${
        scrolled || open
          ? "border-b border-white/10 bg-black/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <TransitionLink
          href="/"
          className={`flex min-w-0 items-center gap-3 transition-[padding] duration-200 ease-out ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <LogoMark
            className={`transition-[width,height] duration-200 ease-out ${
              scrolled ? "size-10 text-sm" : "size-11 text-sm sm:size-14 sm:text-lg"
            }`}
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-sm font-bold uppercase leading-none tracking-tight text-white sm:text-lg xl:text-xl">
              {t("brand.name")}
            </span>
            <span
              className={`hidden text-xs text-muted transition-opacity duration-200 ease-out sm:block ${
                scrolled ? "opacity-0" : "opacity-100"
              }`}
            >
              {t("brand.tagline")}
            </span>
          </span>
        </TransitionLink>

        <div className="hidden flex-col items-end xl:flex">
          <div
            className={`flex items-center gap-4 transition-[padding] duration-200 ease-out ${
              scrolled ? "py-4" : "pt-5 pb-1"
            }`}
          >
            <nav aria-label={t("nav.primary")}>
              <ul className="flex items-center gap-1">
                {navItems.map(({ key, href }) => (
                  <li key={key}>
                    <TransitionLink
                      href={href}
                      aria-current={isActive(href) ? "page" : undefined}
                      className={`block whitespace-nowrap rounded-ui px-2.5 py-2 text-sm font-extrabold uppercase tracking-wider transition-colors duration-[160ms] ease-out hover:text-accent ${
                        isActive(href) ? "text-accent" : "text-light"
                      }`}
                    >
                      {t(`nav.${key}`)}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>
            <LanguageSwitcher />
            <Button href={donateHref} className="!py-2">
              {t("nav.donate")}
            </Button>
          </div>
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
              scrolled ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
            }`}
            aria-hidden={scrolled}
          >
            <div className="overflow-hidden">
              <div className="pb-3">
                <SocialIcons labels={socialLabels} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-ui text-light transition-transform duration-[160ms] ease-out active:scale-95"
          >
            <span aria-hidden className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-0.5 w-6 bg-current transition-transform duration-200 ease-out ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-6 bg-current transition-transform duration-200 ease-out ${
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="border-t border-white/10 xl:hidden"
            initial={{ opacity: 0, transform: reduceMotion ? "translateY(0px)" : "translateY(-8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <nav aria-label={t("nav.primary")} className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
              <ul className="flex flex-col">
                {navItems.map(({ key, href }) => (
                  <li key={key}>
                    <TransitionLink
                      href={href}
                      aria-current={isActive(href) ? "page" : undefined}
                      className={`block py-3 font-display text-3xl font-extrabold uppercase transition-colors duration-[160ms] ease-out hover:text-accent ${
                        isActive(href) ? "text-accent" : "text-light"
                      }`}
                    >
                      {t(`nav.${key}`)}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <SocialIcons labels={socialLabels} />
                <Button href={donateHref}>{t("nav.donate")}</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
