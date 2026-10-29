import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getLocale, getTranslations } from "next-intl/server";
import { location } from "@/config/about";
import { site } from "@/config/site";
import { getAbout } from "@/lib/about";
import { mailto } from "@/lib/mailto";
import { AboutShell } from "@/components/about/AboutShell";
import { MapEmbed } from "@/components/about/MapEmbed";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about/location">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("titles.location"), alternates: pageAlternates(locale, "/about/location") };
}

export default async function LocationPage() {
  const locale = await getLocale();
  const { location: content } = await getAbout(locale);
  const t = await getTranslations("about.location");

  return (
    <AboutShell pageKey="location">
      <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <Reveal>
          <p className="text-lg leading-relaxed text-light">{content.body}</p>
          <h2 className="mt-10 text-xs font-semibold uppercase tracking-widest text-muted">
            {content.addressTitle}
          </h2>
          <address className="mt-3 not-italic text-white">
            <p className="font-display text-xl font-bold">The Creative Hub</p>
            <p className="mt-1 text-light">{site.address.short}</p>
          </address>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={mailto({
                to: site.emails.media,
                cc: site.emails.copy,
                subject: t("bookSubject"),
              })}
            >
              {t("book")}
            </Button>
            {location.mapsUrl && (
              <Button href={location.mapsUrl} variant="secondary">
                {t("openInMaps")}
              </Button>
            )}
          </div>
        </Reveal>
        <Reveal index={1}>
          <MapEmbed
            embedUrl={location.mapEmbedUrl}
            title={t("mapTitle")}
            loadLabel={t("loadMap")}
            comingSoonLabel={t("mapComingSoon")}
          />
        </Reveal>
      </div>
    </AboutShell>
  );
}
