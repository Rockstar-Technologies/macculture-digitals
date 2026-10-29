import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { founderImage } from "@/config/about";
import type { AboutContent } from "@/lib/about";
import { Reveal } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Prose } from "./Prose";

export async function FounderProfile({ team }: { team: AboutContent["team"] }) {
  const t = await getTranslations("about.team");
  const { founder } = team;

  return (
    <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
      <Reveal>
        <div className="relative aspect-[4/5] overflow-hidden rounded-ui bg-surface lg:sticky lg:top-28">
          {founderImage ? (
            <Image
              src={founderImage}
              alt={founder.name}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder label={t("photoPlaceholder")} className="absolute inset-0" />
          )}
        </div>
      </Reveal>

      <div>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {founder.role}
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.25rem,5.4vw,1.75rem)] font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl">
            {founder.name}
          </h2>
          <p className="mt-3 text-muted">{founder.alias}</p>
        </Reveal>

        <Reveal className="mt-8">
          <Prose paragraphs={founder.bio} />
        </Reveal>

        <Reveal className="mt-10 rounded-ui bg-surface p-6">
          <h3 className="font-display text-lg font-bold text-white">{founder.lookingTitle}</h3>
          <p className="mt-2 text-light">{founder.looking}</p>
        </Reveal>

        <Reveal className="mt-10">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
            {founder.skillsTitle}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {founder.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-ui bg-surface px-3 py-2 text-sm text-light"
              >
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
