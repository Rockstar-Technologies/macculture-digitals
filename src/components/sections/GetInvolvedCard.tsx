import { getTranslations } from "next-intl/server";
import { donateHref, involvement, merchStores } from "@/config/get-involved";
import { site } from "@/config/site";
import type { InvolvementItem } from "@/lib/get-involved";
import { mailto } from "@/lib/mailto";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export async function GetInvolvedCard({
  item,
  index,
}: {
  item: InvolvementItem;
  index: number;
}) {
  const t = await getTranslations("getInvolved");
  const wiring = involvement[item.id] ?? {};

  return (
    <Reveal index={index % 2} className="h-full">
      <Card id={item.id} className="flex h-full scroll-mt-28 flex-col">
        <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
          {item.title}
        </h3>
        <div className="mt-4 flex-1 space-y-3 text-light">
          {item.body.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>

        {item.id === "merch" && (
          <div className="mt-5">
            {merchStores.length > 0 ? (
              <ul className="space-y-2">
                {merchStores.map((store) => (
                  <li key={store.url}>
                    <a
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold uppercase tracking-wider text-accent transition-colors duration-[160ms] ease-out hover:text-white"
                    >
                      {t("visitStore", { name: store.name })} ↗
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm uppercase tracking-widest text-muted">
                {t("storesComingSoon")}
              </p>
            )}
          </div>
        )}

        {(wiring.email || item.id === "donate") && (
          <div className="mt-6 flex flex-wrap gap-3">
            {item.id === "donate" ? (
              <Button href={donateHref}>{item.cta}</Button>
            ) : (
              <Button
                href={mailto({
                  to: wiring.email!,
                  cc: site.emails.copy,
                  subject: item.subject,
                  body: item.template,
                })}
              >
                {item.cta}
              </Button>
            )}
            {wiring.secondary && (
              <Button href={wiring.secondary.href} variant="secondary">
                {t(wiring.secondary.labelKey)}
              </Button>
            )}
          </div>
        )}
      </Card>
    </Reveal>
  );
}
