import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getLocale, getTranslations } from "next-intl/server";
import { getInvolvement } from "@/lib/get-involved";
import { GetInvolvedCard } from "@/components/sections/GetInvolvedCard";
import { Reveal } from "@/components/motion/Reveal";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/get-involved">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "getInvolved" });
  return { title: t("title"), alternates: pageAlternates(locale, "/get-involved") };
}

export default async function GetInvolvedPage() {
  const locale = await getLocale();
  const { groups } = await getInvolvement(locale);
  const t = await getTranslations("getInvolved");

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

      <div className="mt-16 space-y-20">
        {groups.map((group) => (
          <section
            key={group.id}
            aria-labelledby={`group-${group.id}`}
            className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-12"
          >
            <Reveal>
              <h2
                id={`group-${group.id}`}
                className="font-display text-xl font-extrabold uppercase leading-tight tracking-tight text-white lg:sticky lg:top-28"
              >
                {group.title}
              </h2>
            </Reveal>
            <ul className="grid gap-4 md:grid-cols-2">
              {group.items.map((item, i) => (
                <li key={item.id}>
                  <GetInvolvedCard item={item} index={i} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
