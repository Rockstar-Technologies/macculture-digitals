import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { aboutPages, type AboutPageKey } from "@/config/about";
import { SectionShell } from "@/components/layout/SectionShell";

export async function AboutShell({
  pageKey,
  children,
}: {
  pageKey: AboutPageKey;
  children: ReactNode;
}) {
  const t = await getTranslations("about");

  return (
    <SectionShell
      eyebrow={t("eyebrow")}
      title={t(`titles.${pageKey}`)}
      tabs={aboutPages.map(({ key, href }) => ({ href, label: t(`tabs.${key}`) }))}
      tabsLabel={t("tabsLabel")}
    >
      {children}
    </SectionShell>
  );
}
