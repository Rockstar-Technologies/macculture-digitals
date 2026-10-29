import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { podcastEpisodes } from "@/config/media";
import { EmptyState } from "@/components/media/EmptyState";
import { MediaShell } from "@/components/media/MediaShell";
import { PageIntro } from "@/components/media/PageIntro";
import { Reveal } from "@/components/motion/Reveal";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/media/podcast">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "media" });
  return { title: t("titles.podcast"), alternates: pageAlternates(locale, "/media/podcast") };
}

export default async function PodcastPage() {
  const t = await getTranslations("media");
  const h = await getTranslations("home.releases");

  return (
    <MediaShell pageKey="podcast">
      <PageIntro>{t("intro.podcast")}</PageIntro>
      {podcastEpisodes.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {podcastEpisodes.map((episode, i) => {
            const title = episode.title ?? t("podcast.sampleEpisode", { n: i + 1 });
            return (
            <li key={episode.youtubeId}>
              <Reveal index={i % 3}>
                <YouTubeEmbed
                  videoId={episode.youtubeId}
                  title={title}
                  playLabel={h("play", { kind: title })}
                  comingSoonLabel={h("comingSoon")}
                />
                <h2 className="mt-3 font-display text-lg font-bold text-white">
                  {title}
                </h2>
              </Reveal>
            </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState message={t("empty.podcast")} />
      )}
    </MediaShell>
  );
}
