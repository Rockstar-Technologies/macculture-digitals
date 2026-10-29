import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { mediaPages } from "@/config/media";
import { MediaShell } from "@/components/media/MediaShell";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Card } from "@/components/ui/Card";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/media">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "media" });
  return { title: t("titles.overview"), alternates: pageAlternates(locale, "/media") };
}

export default async function MediaPage() {
  const t = await getTranslations("media");
  const pages = mediaPages.filter((p) => p.key !== "overview");

  return (
    <MediaShell pageKey="overview">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map(({ key, href }, i) => (
          <li key={key}>
            <Reveal index={i % 3} className="h-full">
              <TransitionLink href={href} className="block h-full">
                <Card interactive className="h-full">
                  <h2 className="font-display text-xl font-bold text-white">
                    {t(`tabs.${key}`)}
                  </h2>
                  <p className="mt-2 text-sm text-light">{t(`cards.${key}`)}</p>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-accent">
                    {t("explore")} →
                  </p>
                </Card>
              </TransitionLink>
            </Reveal>
          </li>
        ))}
      </ul>
    </MediaShell>
  );
}
