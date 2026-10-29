import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { site } from "@/config/site";
import { mailto } from "@/lib/mailto";
import { Reveal } from "@/components/motion/Reveal";
import { SocialIcons } from "@/components/layout/SocialIcons";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), alternates: pageAlternates(locale, "/contact") };
}

const linkClass =
  "text-white transition-colors duration-[160ms] ease-out hover:text-accent";

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const s = await getTranslations("social");

  return (
    <div className="mx-auto max-w-7xl px-5 pb-8 pt-[calc(var(--header-h)+3rem)] sm:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.5rem,6.6vw,1.875rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {t("title")}
        </h1>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <Reveal>
          <p className="text-lg leading-relaxed text-light">{t("intro")}</p>
          <div className="mt-8">
            <Button
              href={mailto({
                to: site.emails.founder,
                cc: site.emails.copy,
                subject: t("subject"),
              })}
            >
              {t("write")}
            </Button>
          </div>
          <h2 className="mb-2 mt-12 text-xs font-semibold uppercase tracking-widest text-muted">
            {t("follow")}
          </h2>
          <SocialIcons
            className="-ml-3"
            labels={{
              linkedin: s("linkedin"),
              facebook: s("facebook"),
              instagram: s("instagram"),
              tiktok: s("tiktok"),
            }}
          />
        </Reveal>

        <Reveal index={1}>
          <h2 className="sr-only">{t("detailsTitle")}</h2>
          <dl className="divide-y divide-white/10 rounded-ui bg-surface px-6">
            <div className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="text-sm text-muted">{t("company")}</dt>
              <dd className="text-white">{site.legalName}</dd>
            </div>
            <div className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="text-sm text-muted">{t("postal")}</dt>
              <dd className="text-white">{site.address.poBox}</dd>
            </div>
            <div className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="text-sm text-muted">{t("location")}</dt>
              <dd className="text-white">{site.address.short}</dd>
            </div>
            <div className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="text-sm text-muted">{t("email")}</dt>
              <dd className="space-y-1">
                <a href={`mailto:${site.emails.founder}`} className={`${linkClass} block`}>
                  {site.emails.founder}
                </a>
                <a href={`mailto:${site.emails.copy}`} className={`${linkClass} block`}>
                  {site.emails.copy}
                </a>
              </dd>
            </div>
            <div className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="text-sm text-muted">{t("phone")}</dt>
              <dd>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={linkClass}>
                  {site.phone}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </div>
  );
}
