import { getTranslations } from "next-intl/server";

// Slow ticker between the hero and the releases. Static when motion is reduced.
export async function Marquee() {
  const t = await getTranslations();
  const items = [
    t("brand.tagline"),
    t("home.marquee.slogan"),
    t("home.marquee.genres"),
  ];
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="marquee-row">
      {items.map((text) => (
        <li key={text} className="flex items-center gap-10">
          <span className="font-display text-2xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
            {text}
          </span>
          <span aria-hidden className="size-2 rotate-45 bg-accent" />
        </li>
      ))}
    </ul>
  );
  return (
    <section
      aria-label={t("home.marquee.label")}
      className="marquee overflow-hidden border-y border-white/10 bg-black py-6"
    >
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
