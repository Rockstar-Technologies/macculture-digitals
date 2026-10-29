import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getLocale, getTranslations } from "next-intl/server";
import { getAbout } from "@/lib/about";
import { AboutShell } from "@/components/about/AboutShell";
import { ActivitiesGrid } from "@/components/about/ActivitiesGrid";
import { AboutCards } from "@/components/about/AboutCards";
import { Prose } from "@/components/about/Prose";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("titles.whoWeAre"), alternates: pageAlternates(locale, "/about") };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const { whoWeAre } = await getAbout(locale);
  const t = await getTranslations("about");

  return (
    <AboutShell pageKey="whoWeAre">
      <Reveal>
        <Prose paragraphs={whoWeAre.intro} className="max-w-3xl" />
      </Reveal>

      <section className="mt-16">
        <Reveal>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
            {whoWeAre.slogansTitle}
          </h2>
        </Reveal>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {whoWeAre.slogans.map((slogan, i) => (
            <li key={slogan}>
              <Reveal index={i}>
                <p className="rounded-ui bg-surface p-6 font-display text-xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-2xl">
                  “{slogan}”
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <Reveal>
          <SectionHeading title={whoWeAre.activitiesTitle} />
          <p className="mb-8 mt-4 max-w-2xl text-light">{whoWeAre.activitiesIntro}</p>
        </Reveal>
        <ActivitiesGrid activities={whoWeAre.activities} />
      </section>

      <section className="mt-20">
        <Reveal>
          <SectionHeading title={t("explore")} className="mb-8" />
        </Reveal>
        <AboutCards />
      </section>
    </AboutShell>
  );
}
