import { getTranslations } from "next-intl/server";
import { aboutPages } from "@/config/about";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Card } from "@/components/ui/Card";

export async function AboutCards() {
  const t = await getTranslations("about");
  const pages = aboutPages.filter((p) => p.key !== "whoWeAre");

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pages.map(({ key, href }, i) => (
        <li key={key}>
          <Reveal index={i % 3} className="h-full">
            <TransitionLink href={href} className="block h-full">
              <Card interactive className="h-full">
                <h3 className="font-display text-xl font-bold text-white">
                  {t(`tabs.${key}`)}
                </h3>
                <p className="mt-2 text-sm text-light">{t(`cards.${key}`)}</p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-accent">
                  {t("readMore")} →
                </p>
              </Card>
            </TransitionLink>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
