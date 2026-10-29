import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getLocale, getTranslations } from "next-intl/server";
import { projectMeta } from "@/config/projects";
import { site } from "@/config/site";
import { mailto } from "@/lib/mailto";
import { getProjects } from "@/lib/projects";
import { Reveal } from "@/components/motion/Reveal";
import {
  ProjectsBrowser,
  type ThemeView,
} from "@/components/sections/ProjectsBrowser";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: t("title"), alternates: pageAlternates(locale, "/projects") };
}

export default async function ProjectsPage() {
  const locale = await getLocale();
  const { themes } = await getProjects(locale);
  const t = await getTranslations("projects");

  const order = themes.flatMap((theme) => theme.projects.map((p) => p.slug));
  const themeViews: ThemeView[] = themes.map((theme) => ({
    id: theme.id,
    title: theme.title,
    projects: theme.projects.map((p) => {
      const number = String(order.indexOf(p.slug) + 1).padStart(2, "0");
      const status = projectMeta[p.slug]?.status ?? "seeking";
      return {
        slug: p.slug,
        number,
        title: p.title,
        description: p.description,
        statusLabel: t(`status.${status}`),
        cardLabel: t("cardAria", { n: number, title: p.title }),
        mailtoHref: mailto({
          to: site.emails.partnerships,
          cc: site.emails.copy,
          subject: t("subject", { title: p.title }),
          body: t("body", { title: p.title }),
        }),
      };
    }),
  }));

  return (
    <div className="mx-auto max-w-7xl px-5 pb-8 pt-[calc(var(--header-h)+3rem)] sm:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.5rem,6.6vw,1.875rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-light">{t("intro")}</p>
        <div className="mt-6">
          <Button
            href={mailto({
              to: site.emails.partnerships,
              cc: site.emails.copy,
              subject: t("subject", { title: t("title") }),
            })}
          >
            {t("emailUs")}
          </Button>
        </div>
      </Reveal>

      <div className="mt-16">
        <ProjectsBrowser
          themes={themeViews}
          labels={{
            detailsComingSoon: t("detailsComingSoon"),
            beneficiariesTitle: t("beneficiariesTitle"),
            beneficiaries: t("beneficiaries"),
            partnersTitle: t("partnersTitle"),
            partners: t.raw("partners") as string[],
            close: t("close"),
            imagePlaceholder: t("imagePlaceholder"),
            partnerCta: t("partnerCta"),
          }}
        />
      </div>
    </div>
  );
}
