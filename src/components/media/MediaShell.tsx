import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { mediaPages, type MediaPageKey } from "@/config/media";
import { SectionShell } from "@/components/layout/SectionShell";

export async function MediaShell({
  pageKey,
  children,
}: {
  pageKey: MediaPageKey;
  children: ReactNode;
}) {
  const t = await getTranslations("media");

  return (
    <SectionShell
      eyebrow={t("eyebrow")}
      title={t(`titles.${pageKey}`)}
      tabs={mediaPages.map(({ key, href }) => ({ href, label: t(`tabs.${key}`) }))}
      tabsLabel={t("tabsLabel")}
    >
      {children}
    </SectionShell>
  );
}
