import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { donateQrImage, supporters } from "@/config/donate";
import { site } from "@/config/site";
import { mailto } from "@/lib/mailto";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/donate">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donate" });
  return { title: t("title"), alternates: pageAlternates(locale, "/donate") };
}

export default async function DonatePage() {
  const t = await getTranslations("donate");
  const steps = t.raw("steps") as string[];

  return (
    <div className="mx-auto max-w-7xl px-5 pb-8 pt-[calc(var(--header-h)+3rem)] sm:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.5rem,6.6vw,1.875rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-light">{t("intro")}</p>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <div>
          <Reveal>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
              {t("stepsTitle")}
            </h2>
          </Reveal>
          <ol className="mt-6 space-y-6">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-5">
                <Reveal index={i} className="flex gap-5">
                  <span className="w-14 shrink-0 font-display text-3xl font-extrabold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1 text-light">{step}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal className="mt-10 flex flex-wrap gap-3">
            <Button
              href={mailto({
                to: site.emails.finances,
                cc: site.emails.copy,
                subject: t("donatedSubject"),
                body: t("donatedBody"),
              })}
            >
              {t("donated")}
            </Button>
            <Button
              variant="secondary"
              href={mailto({
                to: site.emails.finances,
                cc: site.emails.copy,
                subject: t("inKindSubject"),
                body: t("inKindBody"),
              })}
            >
              {t("inKind")}
            </Button>
          </Reveal>
        </div>

        <Reveal index={1}>
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-ui bg-surface">
            {donateQrImage ? (
              <Image
                src={donateQrImage}
                alt={t("qrLabel")}
                fill
                sizes="(min-width: 1024px) 24rem, 100vw"
                className="object-contain p-6"
              />
            ) : (
              <ImagePlaceholder label={t("qrPlaceholder")} className="absolute inset-0" />
            )}
          </div>
        </Reveal>
      </div>

      {supporters.length > 0 && (
        <section className="mt-24">
          <Reveal>
            <SectionHeading title={t("supportersTitle")} />
            <p className="mt-4 max-w-2xl text-light">
              {t("supportersIntro")}
            </p>
          </Reveal>
          <ul className="mt-8 flex flex-wrap gap-3">
            {supporters.map((s) => (
              <li key={s.name} className="rounded-ui bg-surface px-5 py-3 text-white">
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    {s.name}
                  </a>
                ) : (
                  s.name
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
