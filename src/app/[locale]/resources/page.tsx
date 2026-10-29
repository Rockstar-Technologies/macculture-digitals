import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";
import { getResources, resourceCategories } from "@/lib/resources";
import { Reveal } from "@/components/motion/Reveal";
import { ResourcesBrowser } from "@/components/sections/ResourcesBrowser";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/resources">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resources" });
  return { title: t("title"), alternates: pageAlternates(locale, "/resources") };
}

export default async function ResourcesPage() {
  const locale = await getLocale();
  const { entries } = await getResources(locale);
  const t = await getTranslations("resources");
  const format = await getFormatter();

  const views = entries.map((entry) => ({
    id: entry.id,
    category: entry.category,
    categoryLabel: t(`categories.${entry.category}`),
    title: entry.title,
    organisation: entry.organisation,
    deadlineLabel: entry.deadline
      ? format.dateTime(new Date(entry.deadline), { dateStyle: "long", timeZone: "UTC" })
      : "",
    note: entry.note,
    url: entry.url,
    sample: Boolean(entry.sample) || entry.id.startsWith("sample"),
  }));

  return (
    <div className="mx-auto max-w-7xl px-5 pb-8 pt-[calc(var(--header-h)+3rem)] sm:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.5rem,6.6vw,1.875rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-light">{t("intro")}</p>
      </Reveal>

      <div className="mt-12">
        <ResourcesBrowser
          entries={views}
          categories={resourceCategories.map((id) => ({ id, label: t(`categories.${id}`) }))}
          labels={{
            all: t("all"),
            filter: t("filterLabel"),
            deadline: t("deadline"),
            visit: t("visit"),
            sample: t("sample"),
            empty: t("empty"),
          }}
        />
      </div>

      <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-ui bg-surface p-8">
        <div>
          <h2 className="font-display text-xl font-bold text-white">{t("shareTitle")}</h2>
          <p className="mt-1 text-light">{t("shareBody")}</p>
        </div>
        <Button href="/get-involved#opportunities">{t("shareCta")}</Button>
      </Reveal>
    </div>
  );
}
