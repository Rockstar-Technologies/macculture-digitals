import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getLocale, getTranslations } from "next-intl/server";
import { getAbout } from "@/lib/about";
import { AboutShell } from "@/components/about/AboutShell";
import { ConnectionsGrid } from "@/components/about/ConnectionsGrid";
import { Reveal } from "@/components/motion/Reveal";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about/connections">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("titles.connections"), alternates: pageAlternates(locale, "/about/connections") };
}

export default async function ConnectionsPage() {
  const locale = await getLocale();
  const { connections } = await getAbout(locale);

  return (
    <AboutShell pageKey="connections">
      <Reveal>
        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-light">
          {connections.intro}
        </p>
      </Reveal>
      <ConnectionsGrid items={connections.items} />
    </AboutShell>
  );
}
