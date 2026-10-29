import { getTranslations } from "next-intl/server";
import { home } from "@/config/home";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotifyEmbed } from "@/components/ui/SpotifyEmbed";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";

export async function Releases() {
  const t = await getTranslations("home");

  return (
    <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
      <Reveal>
        <SectionHeading eyebrow={t("releases.eyebrow")} title={t("releases.title")} />
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-[3fr_2fr]">
        <ul className="grid gap-4 sm:grid-cols-2">
          {home.releases.map(({ kind, youtubeId }, i) => (
            <li key={kind}>
              <Reveal index={i}>
                <YouTubeEmbed
                  videoId={youtubeId}
                  title={t(`releases.${kind}`)}
                  playLabel={t("releases.play", { kind: t(`releases.${kind}`) })}
                  comingSoonLabel={t("releases.comingSoon")}
                />
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted">
                  {t(`releases.${kind}`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal index={1} className="flex flex-col">
          <h3 className="font-display text-xl font-bold text-white">
            {t("spotify.title")}
          </h3>
          <p className="mb-4 text-sm text-muted">{t("spotify.subtitle")}</p>
          <div className="flex-1">
            <SpotifyEmbed
              url={home.spotifyPlaylistUrl}
              title={t("spotify.title")}
              loadLabel={t("spotify.load")}
              comingSoonLabel={t("spotify.comingSoon")}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
