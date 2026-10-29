import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getLocale, getTranslations } from "next-intl/server";
import { getAbout } from "@/lib/about";
import { AboutShell } from "@/components/about/AboutShell";
import { FounderProfile } from "@/components/about/FounderProfile";
import { Reveal } from "@/components/motion/Reveal";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about/team">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("titles.team"), alternates: pageAlternates(locale, "/about/team") };
}

export default async function TeamPage() {
  const locale = await getLocale();
  const { team } = await getAbout(locale);

  return (
    <AboutShell pageKey="team">
      <Reveal>
        <p className="mb-14 max-w-3xl text-lg leading-relaxed text-light">{team.intro}</p>
      </Reveal>
      <FounderProfile team={team} />
    </AboutShell>
  );
}
