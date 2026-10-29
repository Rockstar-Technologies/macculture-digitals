import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { MediaShell } from "@/components/media/MediaShell";
import { PageIntro } from "@/components/media/PageIntro";
import { StreamPlatforms } from "@/components/media/StreamPlatforms";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/media/stream">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "media" });
  return { title: t("titles.stream"), alternates: pageAlternates(locale, "/media/stream") };
}

export default async function StreamPage() {
  const t = await getTranslations("media");

  return (
    <MediaShell pageKey="stream">
      <PageIntro>{t("intro.stream")}</PageIntro>
      <StreamPlatforms />
    </MediaShell>
  );
}
