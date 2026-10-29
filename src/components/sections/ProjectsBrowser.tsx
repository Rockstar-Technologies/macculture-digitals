"use client";

import { useEffect, useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export type ProjectView = {
  slug: string;
  number: string;
  title: string;
  description: string[];
  statusLabel: string;
  cardLabel: string;
  mailtoHref: string;
};

export type ThemeView = { id: string; title: string; projects: ProjectView[] };

export type ProjectLabels = {
  detailsComingSoon: string;
  beneficiariesTitle: string;
  beneficiaries: string;
  partnersTitle: string;
  partners: string[];
  close: string;
  imagePlaceholder: string;
  partnerCta: string;
};

export function ProjectsBrowser({
  themes,
  labels,
}: {
  themes: ThemeView[];
  labels: ProjectLabels;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  // Kept after closing so the panel content stays visible while it slides out.
  const [shown, setShown] = useState<string | null>(null);

  const all = themes.flatMap((t) => t.projects);
  const project = all.find((p) => p.slug === shown) ?? null;

  // Open or close the native dialog to match the selected project.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
    document.documentElement.style.overflow = selected ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [selected]);

  // Deep link: /projects#slug opens that project on load.
  useEffect(() => {
    const slug = window.location.hash.slice(1);
    if (!slug) return;
    const id = window.requestAnimationFrame(() => {
      if (all.some((p) => p.slug === slug)) {
        setSelected(slug);
        setShown(slug);
      }
    });
    return () => window.cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const open = (slug: string) => {
    setSelected(slug);
    setShown(slug);
    window.history.replaceState(null, "", `#${slug}`);
  };

  const close = () => {
    setSelected(null);
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  };

  return (
    <>
      <div className="space-y-20">
        {themes.map((theme) => (
          <section
            key={theme.id}
            aria-labelledby={`theme-${theme.id}`}
            className="grid gap-8 lg:grid-cols-[15rem_1fr] lg:gap-12"
          >
            <h2
              id={`theme-${theme.id}`}
              className="font-display text-base font-extrabold uppercase leading-tight tracking-tight text-white [overflow-wrap:anywhere] lg:sticky lg:top-28 lg:self-start"
            >
              {theme.title}
            </h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {theme.projects.map((p) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    aria-label={p.cardLabel}
                    onClick={() => open(p.slug)}
                    className="block h-full w-full text-left"
                  >
                    <Card interactive className="flex h-full min-h-48 flex-col">
                      <span className="font-display text-4xl font-extrabold text-accent">
                        {p.number}
                      </span>
                      <h3 className="mt-4 flex-1 font-display text-lg font-bold leading-snug text-white">
                        {p.title}
                      </h3>
                      <span className="mt-5 inline-block self-start rounded-ui bg-ink px-2.5 py-1 text-xs text-light">
                        {p.statusLabel}
                      </span>
                    </Card>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="project-panel"
        aria-labelledby="project-panel-title"
        onClose={() => {
          if (selected) close();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        {project && (
          <div className="flex h-full flex-col overflow-y-auto">
            <div className="relative aspect-video shrink-0">
              <ImagePlaceholder
                label={labels.imagePlaceholder}
                className="absolute inset-0"
              />
              <button
                type="button"
                aria-label={labels.close}
                onClick={close}
                className="absolute right-4 top-4 grid size-11 place-items-center rounded-ui bg-black/60 text-white backdrop-blur transition-[transform,background-color] duration-[160ms] ease-out hover:bg-accent hover:text-black active:scale-95"
              >
                <FaXmark aria-hidden className="size-5" />
              </button>
            </div>

            <div className="flex-1 p-6 sm:p-8">
              <p className="font-display text-3xl font-extrabold text-accent">
                {project.number}
              </p>
              <h2
                id="project-panel-title"
                className="mt-2 font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-white"
              >
                {project.title}
              </h2>
              <span className="mt-4 inline-block rounded-ui bg-surface px-2.5 py-1 text-xs text-light">
                {project.statusLabel}
              </span>

              <div className="mt-6 space-y-4 leading-relaxed text-light">
                {project.description.length > 0 ? (
                  project.description.map((text) => <p key={text}>{text}</p>)
                ) : (
                  <p className="text-muted">{labels.detailsComingSoon}</p>
                )}
              </div>

              <h3 className="mt-8 text-xs font-semibold uppercase tracking-widest text-muted">
                {labels.beneficiariesTitle}
              </h3>
              <p className="mt-2 text-light">{labels.beneficiaries}</p>

              <h3 className="mt-8 text-xs font-semibold uppercase tracking-widest text-muted">
                {labels.partnersTitle}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {labels.partners.map((partner) => (
                  <li key={partner} className="rounded-ui bg-surface px-3 py-2 text-sm text-light">
                    {partner}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button href={project.mailtoHref}>{labels.partnerCta}</Button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
