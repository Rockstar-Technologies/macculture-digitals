import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { home } from "@/config/home";
import { site } from "@/config/site";
import { mailto } from "@/lib/mailto";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function CreativeHub() {
  const t = await getTranslations("home.creativeHub");

  return (
    <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
      <div className="grid overflow-hidden rounded-ui bg-surface lg:grid-cols-2">
        <Reveal className="relative min-h-72 lg:min-h-[28rem]">
          {home.creativeHub.image ? (
            <Image
              src={home.creativeHub.image}
              alt={t("title")}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder
              label={t("placeholder")}
              className="absolute inset-0"
            />
          )}
        </Reveal>
        <Reveal index={1} className="flex flex-col justify-center p-8 sm:p-12">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
          <p className="mt-6 max-w-xl text-base leading-relaxed text-light">
            {t("body")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={mailto({
                to: site.emails.media,
                cc: site.emails.copy,
                subject: t("bookSubject"),
              })}
            >
              {t("book")}
            </Button>
            <Button href="/about" variant="secondary">
              {t("location")}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
