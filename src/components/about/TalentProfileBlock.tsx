import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FaApple, FaInstagram, FaSpotify } from "react-icons/fa6";
import { talentLinks } from "@/config/about";
import type { TalentProfile } from "@/lib/about";
import { Reveal } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Prose } from "./Prose";

const linkIcons = { spotify: FaSpotify, appleMusic: FaApple, instagram: FaInstagram };

export async function TalentProfileBlock({
  profile,
  index,
  factsTitle,
  discographyTitle,
}: {
  profile: TalentProfile;
  index: number;
  factsTitle: string;
  discographyTitle: string;
}) {
  const t = await getTranslations("about.talent");
  const links = talentLinks[profile.id];
  const flipped = index % 2 === 1;
  const iconKeys = (Object.keys(linkIcons) as (keyof typeof linkIcons)[]).filter(
    (k) => links[k],
  );

  return (
    <article className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
      <Reveal className={flipped ? "lg:order-2" : ""}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-ui bg-surface lg:sticky lg:top-28">
          {links.image ? (
            <Image
              src={links.image}
              alt={profile.name}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder
              label={t("photoPlaceholder", { name: profile.name })}
              className="absolute inset-0"
            />
          )}
        </div>
      </Reveal>

      <div>
        <Reveal>
          <h2 className="font-display text-[clamp(1.5rem,6vw,2rem)] font-extrabold uppercase leading-none tracking-tight text-white sm:text-5xl">
            {profile.name}
          </h2>
          <p className="mt-3 text-accent">{profile.tagline}</p>
        </Reveal>

        <Reveal className="mt-8">
          <Prose paragraphs={profile.bio} />
        </Reveal>

        {profile.highlights.length > 0 && (
          <Reveal className="mt-10">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
              {profile.highlightsTitle}
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {profile.highlights.map((h) => (
                <li key={h.title} className="rounded-ui bg-surface p-5">
                  <p className="font-display text-base font-bold text-white">{h.title}</p>
                  <p className="mt-2 text-sm text-light">{h.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal className="mt-10">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
            {factsTitle}
          </h3>
          <dl className="mt-4 divide-y divide-white/10">
            {profile.facts.map((f) => (
              <div key={f.label} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="text-light">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="mt-10">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
            {discographyTitle}
          </h3>
          <ul className="mt-4 divide-y divide-white/10">
            {profile.discography.map((d) => (
              <li key={d.title} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                <span className="text-white">{d.title}</span>
                <span className="text-sm text-muted">
                  {[d.kind, d.year].filter(Boolean).join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {(links.spotify || iconKeys.length > 0 || links.website) && (
          <Reveal className="mt-10 flex flex-wrap items-center gap-3">
            {links.spotify && (
              <a
                href={links.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-ui bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-wider text-black transition-[transform,background-color] duration-[160ms] ease-out hover:bg-white active:scale-[0.97]"
              >
                <FaSpotify aria-hidden className="size-4" />
                {t("listen")}
              </a>
            )}
            <ul className="flex items-center gap-1">
              {iconKeys.map((key) => {
                const Icon = linkIcons[key];
                return (
                  <li key={key}>
                    <a
                      href={links[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${profile.name}: ${t(`links.${key}`)}`}
                      className="grid size-11 place-items-center rounded-ui text-light transition-[color,transform] duration-[160ms] ease-out hover:text-accent active:scale-95"
                    >
                      <Icon aria-hidden className="size-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
            {links.website && (
              <a
                href={links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-widest text-accent transition-colors duration-[160ms] ease-out hover:text-white"
              >
                {t("profile")} ↗
              </a>
            )}
          </Reveal>
        )}
      </div>
    </article>
  );
}
