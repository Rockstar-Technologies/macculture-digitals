import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { downloads } from "@/config/media";
import { EmptyState } from "@/components/media/EmptyState";
import { MediaShell } from "@/components/media/MediaShell";
import { PageIntro } from "@/components/media/PageIntro";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/media/downloads">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "media" });
  return { title: t("titles.downloads"), alternates: pageAlternates(locale, "/media/downloads") };
}

export default async function DownloadsPage() {
  const t = await getTranslations("media");

  return (
    <MediaShell pageKey="downloads">
      <PageIntro>{t("intro.downloads")}</PageIntro>
      {downloads.length > 0 ? (
        <ul className="divide-y divide-white/10">
          {downloads.map((file, i) => (
            <li key={file.url}>
              <Reveal index={i} className="flex flex-wrap items-center justify-between gap-4 py-5">
                <div>
                  <h2 className="font-display text-lg font-bold text-white">{file.title}</h2>
                  <p className="text-sm text-muted">{file.description}</p>
                </div>
                <Button href={file.url} variant="secondary">
                  {t("tabs.downloads")}
                </Button>
              </Reveal>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState message={t("empty.downloads")} />
      )}
    </MediaShell>
  );
}
