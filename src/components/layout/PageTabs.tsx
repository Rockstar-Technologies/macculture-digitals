"use client";

import { usePathname } from "@/i18n/navigation";
import { TransitionLink } from "@/components/motion/TransitionLink";

type Tab = { href: string; label: string };

// Pill tabs shared by section pages (About, Media). Scrolls sideways on phones.
export function PageTabs({ tabs, label }: { tabs: Tab[]; label: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
        {tabs.map(({ href, label: text }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <TransitionLink
                href={href}
                aria-current={active ? "page" : undefined}
                className={`block whitespace-nowrap rounded-ui px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-[color,background-color,transform] duration-[160ms] ease-out active:scale-[0.97] ${
                  active
                    ? "bg-accent text-black"
                    : "bg-surface text-light hover:text-accent"
                }`}
              >
                {text}
              </TransitionLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
