import { getTranslations } from "next-intl/server";
import { FaAmazon, FaMusic, FaSpotify } from "react-icons/fa6";
import { SiApplemusic, SiDeezer, SiTidal } from "react-icons/si";
import { streamPlatforms } from "@/config/media";
import { Reveal } from "@/components/motion/Reveal";

const icons = {
  spotify: FaSpotify,
  appleMusic: SiApplemusic,
  deezer: SiDeezer,
  tidal: SiTidal,
  boomplay: FaMusic,
  amazonMusic: FaAmazon,
};

export async function StreamPlatforms() {
  const t = await getTranslations("media.stream");

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {streamPlatforms.map(({ key, name, url }, i) => {
        const Icon = icons[key];
        const body = (
          <>
            <Icon aria-hidden className="size-8 text-accent" />
            <span className="mt-4 block font-display text-xl font-bold text-white">
              {name}
            </span>
            <span className="mt-1 block text-xs font-semibold uppercase tracking-widest text-muted">
              {url ? `${t("open", { name })} ↗` : t("comingSoon")}
            </span>
          </>
        );
        return (
          <li key={key}>
            <Reveal index={i % 3} className="h-full">
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full rounded-ui bg-surface p-6 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgb(255_106_0/0.5),0_16px_40px_-16px_rgb(255_106_0/0.35)] motion-reduce:hover:translate-y-0"
                >
                  {body}
                </a>
              ) : (
                <div className="h-full rounded-ui bg-surface p-6">{body}</div>
              )}
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
