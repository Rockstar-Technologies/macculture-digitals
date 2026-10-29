import type { ReactNode } from "react";
import { PageTabs } from "./PageTabs";

type Props = {
  eyebrow: string;
  title: string;
  tabs: { href: string; label: string }[];
  tabsLabel: string;
  children: ReactNode;
};

export function SectionShell({ eyebrow, title, tabs, tabsLabel, children }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-8 pt-[calc(var(--header-h)+3rem)] sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        {eyebrow}
      </p>
      <h1 className="mt-3 font-display text-[clamp(1.5rem,6.6vw,1.875rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
        {title}
      </h1>
      <div className="mt-8">
        <PageTabs tabs={tabs} label={tabsLabel} />
      </div>
      <div className="mt-14">{children}</div>
    </div>
  );
}
