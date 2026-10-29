import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { MediaShell } from "@/components/media/MediaShell";
import { NewsletterForm } from "@/components/media/NewsletterForm";
import { PageIntro } from "@/components/media/PageIntro";
import { Reveal } from "@/components/motion/Reveal";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/media/newsletter">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "media" });
  return { title: t("titles.newsletter"), alternates: pageAlternates(locale, "/media/newsletter") };
}

export default async function NewsletterPage() {
  const t = await getTranslations("media");

  return (
    <MediaShell pageKey="newsletter">
      <PageIntro>{t("intro.newsletter")}</PageIntro>
      <Reveal index={1}>
        <NewsletterForm />
      </Reveal>
    </MediaShell>
  );
}
