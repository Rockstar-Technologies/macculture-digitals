"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";

export type ResourceView = {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  organisation: string;
  deadlineLabel: string;
  note: string;
  url: string;
  sample: boolean;
};

type Props = {
  entries: ResourceView[];
  categories: { id: string; label: string }[];
  labels: {
    all: string;
    filter: string;
    deadline: string;
    visit: string;
    sample: string;
    empty: string;
  };
};

export function ResourcesBrowser({ entries, categories, labels }: Props) {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? entries : entries.filter((e) => e.category === active);
  const chips = [{ id: "all", label: labels.all }, ...categories];

  return (
    <>
      <div role="group" aria-label={labels.filter} className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {chips.map((chip) => (
            <li key={chip.id}>
              <button
                type="button"
                aria-pressed={active === chip.id}
                onClick={() => setActive(chip.id)}
                className={`whitespace-nowrap rounded-ui px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-[color,background-color,transform] duration-[160ms] ease-out active:scale-[0.97] ${
                  active === chip.id
                    ? "bg-accent text-black"
                    : "bg-surface text-light hover:text-accent"
                }`}
              >
                {chip.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {visible.length > 0 ? (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((entry) => (
            <li key={entry.id}>
              <Card interactive className="flex h-full flex-col">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-ui bg-ink px-2.5 py-1 text-xs text-accent">
                    {entry.categoryLabel}
                  </span>
                  {entry.sample && (
                    <span className="rounded-ui border border-light/40 px-2.5 py-1 text-xs uppercase tracking-wider text-muted">
                      {labels.sample}
                    </span>
                  )}
                </div>
                <h2 className="mt-4 font-display text-lg font-bold leading-snug text-white">
                  {entry.title}
                </h2>
                <p className="mt-1 text-sm text-muted">{entry.organisation}</p>
                <p className="mt-4 flex-1 text-sm text-light">{entry.note}</p>
                {entry.deadlineLabel && (
                  <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted">
                    {labels.deadline}: <span className="text-light">{entry.deadlineLabel}</span>
                  </p>
                )}
                {entry.url && (
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest text-accent transition-colors duration-[160ms] ease-out hover:text-white"
                  >
                    {labels.visit} ↗
                  </a>
                )}
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-ui bg-surface p-8 text-center text-sm uppercase tracking-widest text-muted">
          {labels.empty}
        </p>
      )}
    </>
  );
}
