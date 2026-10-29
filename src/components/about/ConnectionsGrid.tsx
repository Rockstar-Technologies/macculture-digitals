import { getTranslations } from "next-intl/server";
import { connectionLinks } from "@/config/about";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { TransitionLink } from "@/components/motion/TransitionLink";

type Item = { id: string; name: string; summary: string };

const initials = (name: string) =>
  name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export async function ConnectionsGrid({ items }: { items: Item[] }) {
  const t = await getTranslations("about.connections");

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ id, name, summary }, i) => {
        const link = connectionLinks[id];
        return (
          <li key={id}>
            <Reveal index={i % 3} className="h-full">
              <Card interactive className="flex h-full flex-col">
                <div
                  role="img"
                  aria-label={t("logoPlaceholder", { name })}
                  className="grid size-14 place-items-center rounded-ui bg-ink font-display text-lg font-extrabold text-accent"
                >
                  <span aria-hidden>{initials(name)}</span>
                </div>
                <h2 className="mt-5 font-display text-xl font-bold text-white">{name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-light">{summary}</p>
                {link?.url && (
                  <TransitionLink
                    href={link.url}
                    className="mt-5 inline-block text-xs font-semibold uppercase tracking-widest text-accent transition-colors duration-[160ms] ease-out hover:text-white"
                  >
                    {t(link.labelKey ?? "visit")} ↗
                  </TransitionLink>
                )}
              </Card>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
