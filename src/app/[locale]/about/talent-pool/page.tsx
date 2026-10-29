import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getLocale, getTranslations } from "next-intl/server";
import { getAbout } from "@/lib/about";
import { AboutShell } from "@/components/about/AboutShell";
import { TalentProfileBlock } from "@/components/about/TalentProfileBlock";
import { Reveal } from "@/components/motion/Reveal";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about/talent-pool">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("titles.talentPool"), alternates: pageAlternates(locale, "/about/talent-pool") };
}

export default async function TalentPoolPage() {
  const locale = await getLocale();
  const { talent } = await getAbout(locale);

  return (
    <AboutShell pageKey="talentPool">
      <Reveal>
        <p className="mb-16 max-w-3xl text-lg leading-relaxed text-light">{talent.intro}</p>
      </Reveal>
      <div className="space-y-24">
        {talent.profiles.map((profile, i) => (
          <TalentProfileBlock
            key={profile.id}
            profile={profile}
            index={i}
            factsTitle={talent.factsTitle}
            discographyTitle={talent.discographyTitle}
          />
        ))}
      </div>
    </AboutShell>
  );
}
