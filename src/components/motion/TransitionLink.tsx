"use client";

import type { ComponentProps, MouseEvent } from "react";
import { Link } from "@/i18n/navigation";
import { usePageTransition } from "./PageTransition";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

const isModified = (e: MouseEvent) =>
  e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;

// Internal link that plays the page transition. Falls back to the default
// Next.js behaviour for modified clicks, new tabs and hash-only links.
const isExternal = (href: string) => /^(mailto:|tel:|https?:)/.test(href);

export function TransitionLink({ href, onClick, target, ...rest }: Props) {
  const { navigate } = usePageTransition();

  if (isExternal(href)) {
    const opensNewTab = href.startsWith("http");
    return (
      <a
        href={href}
        onClick={onClick}
        target={target ?? (opensNewTab ? "_blank" : undefined)}
        rel={opensNewTab ? "noopener noreferrer" : undefined}
        {...(rest as ComponentProps<"a">)}
      />
    );
  }

  return (
    <Link
      href={href}
      target={target}
      onClick={(e) => {
        onClick?.(e);
        if (
          e.defaultPrevented ||
          isModified(e) ||
          target === "_blank" ||
          href.startsWith("#")
        ) {
          return;
        }
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    />
  );
}
