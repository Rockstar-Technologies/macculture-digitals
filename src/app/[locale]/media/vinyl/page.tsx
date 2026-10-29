import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { vinylProducts } from "@/config/media";
import { MediaShell } from "@/components/media/MediaShell";
import { PageIntro } from "@/components/media/PageIntro";
import { ProductGrid } from "@/components/media/ProductGrid";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/media/vinyl">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "media" });
  return { title: t("titles.vinyl"), alternates: pageAlternates(locale, "/media/vinyl") };
}

export default async function VinylPage() {
  const t = await getTranslations("media");

  return (
    <MediaShell pageKey="vinyl">
      <PageIntro>{t("intro.vinyl")}</PageIntro>
      <ProductGrid products={vinylProducts} />
    </MediaShell>
  );
}
