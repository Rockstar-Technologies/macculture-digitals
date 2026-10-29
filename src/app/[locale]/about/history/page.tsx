import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getLocale, getTranslations } from "next-intl/server";
import { getAbout } from "@/lib/about";
import { AboutShell } from "@/components/about/AboutShell";
import { Prose } from "@/components/about/Prose";
import { Reveal } from "@/components/motion/Reveal";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about/history">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("titles.history"), alternates: pageAlternates(locale, "/about/history") };
}

export default async function HistoryPage() {
  const locale = await getLocale();
  const { history } = await getAbout(locale);

  return (
    <AboutShell pageKey="history">
      <div className="grid gap-14 lg:grid-cols-[3fr_2fr] lg:gap-20">
        <Reveal>
          <Prose paragraphs={history.paragraphs} />
        </Reveal>
        <div>
          <Reveal>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
              {history.timelineTitle}
            </h2>
          </Reveal>
          <ol className="mt-6 space-y-6 border-l border-white/15 pl-6">
            {history.timeline.map((item, i) => (
              <li key={item.year} className="relative">
                <Reveal index={i}>
                  <span
                    aria-hidden
                    className="absolute -left-[1.85rem] top-1.5 size-2.5 rounded-full bg-accent"
                  />
                  <p className="font-display text-2xl font-extrabold text-accent">
                    {item.year}
                  </p>
                  <p className="mt-1 text-light">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </AboutShell>
  );
}
