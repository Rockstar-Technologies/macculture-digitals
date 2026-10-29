import { getFormatter, getTranslations } from "next-intl/server";
import { navItems } from "@/config/nav";
import { site } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { SocialIcons } from "./SocialIcons";

const linkClass =
  "text-light transition-colors duration-[160ms] ease-out hover:text-accent";

export async function Footer() {
  const t = await getTranslations();
  const format = await getFormatter();

  return (
    <footer className="mt-24 overflow-hidden border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-display text-xl font-bold text-white">
              {t("brand.tagline")}
            </p>
            <SocialIcons
              className="-ml-3 mt-4"
              labels={{
                linkedin: t("social.linkedin"),
                facebook: t("social.facebook"),
                instagram: t("social.instagram"),
                tiktok: t("social.tiktok"),
              }}
            />
          </div>

          <nav aria-label={t("footer.explore")}>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              {t("footer.explore")}
            </h2>
            <ul className="space-y-2">
              {navItems.map(({ key, href }) => (
                <li key={key}>
                  <TransitionLink href={href} className={linkClass}>
                    {t(`nav.${key}`)}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              {t("footer.contact")}
            </h2>
            <address className="space-y-2 not-italic">
              <p>{site.legalName}</p>
              <p>{site.address.poBox}</p>
              <p>{site.address.short}</p>
              <p>
                <a href={`mailto:${site.emails.founder}`} className={linkClass}>
                  {site.emails.founder}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.emails.copy}`} className={linkClass}>
                  {site.emails.copy}
                </a>
              </p>
              <p>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={linkClass}>
                  {site.phone}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 [container-type:inline-size]">
          <p
            aria-hidden
            data-a={t("brand.name").split(" ")[0]}
            data-b={t("brand.name").split(" ")[1]}
            className="footer-wordmark select-none text-center font-display text-[9cqw] font-extrabold uppercase leading-[0.9] tracking-tighter text-ink sm:text-[5.3cqw]"
          />
        </div>

        <div className="border-t border-white/10 py-6 text-xs leading-relaxed text-muted">
          <p className="max-w-4xl">
            {t("footer.registration", {
              legalName: site.legalName,
              businessNumber: site.registration.businessNumber,
              incorporated: format.dateTime(new Date(site.registration.incorporated), {
                dateStyle: "long",
                timeZone: "UTC",
              }),
              uniqueId: site.registration.uniqueId,
            })}
          </p>
          <p className="mt-2">
            © {site.registration.incorporated.slice(0, 4)} {site.legalName}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
