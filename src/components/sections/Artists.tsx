import { getTranslations } from "next-intl/server";
import { home } from "@/config/home";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArtistCard } from "./ArtistCard";

export async function Artists() {
  const t = await getTranslations("home.artists");

  return (
    <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
      <Reveal>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      </Reveal>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {home.artists.map(({ id, image, links }, i) => (
          <li key={id}>
            <Reveal index={i}>
              <ArtistCard
                name={t(`${id}.name`)}
                genre={t(`${id}.genre`)}
                releases={t(`${id}.releases`)}
                releasesLabel={t("releasesLabel")}
                listenLabel={t("listen")}
                detailsLabel={t("showDetails", { name: t(`${id}.name`) })}
                photoLabel={t("photo", { name: t(`${id}.name`) })}
                placeholderLabel={t("placeholder")}
                linkLabels={{
                  spotify: t("links.spotify"),
                  appleMusic: t("links.appleMusic"),
                  instagram: t("links.instagram"),
                }}
                image={image}
                links={links}
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
