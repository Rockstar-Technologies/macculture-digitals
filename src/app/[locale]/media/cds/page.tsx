import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { cdProducts } from "@/config/media";
import { EmptyState } from "@/components/media/EmptyState";
import { MediaShell } from "@/components/media/MediaShell";
import { PageIntro } from "@/components/media/PageIntro";
import { ProductGrid } from "@/components/media/ProductGrid";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/media/cds">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "media" });
  return { title: t("titles.cds"), alternates: pageAlternates(locale, "/media/cds") };
}

export default async function CdsPage() {
  const t = await getTranslations("media");

  return (
    <MediaShell pageKey="cds">
      <PageIntro>{t("intro.cds")}</PageIntro>
      {cdProducts.length > 0 ? (
        <ProductGrid products={cdProducts} />
      ) : (
        <EmptyState message={t("empty.cds")} />
      )}
    </MediaShell>
  );
}
