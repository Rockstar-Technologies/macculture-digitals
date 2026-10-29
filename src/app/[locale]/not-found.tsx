import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("errors");

  return (
    <div className="mx-auto max-w-7xl px-5 pb-8 pt-[calc(var(--header-h)+4rem)] sm:px-8">
      <p className="font-display text-6xl font-extrabold text-accent">404</p>
      <h1 className="mt-4 font-display text-[clamp(1.5rem,6.6vw,1.875rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">
        {t("notFoundTitle")}
      </h1>
      <p className="mt-6 max-w-xl text-lg text-light">{t("notFoundBody")}</p>
      <div className="mt-8">
        <Button href="/">{t("goHome")}</Button>
      </div>
    </div>
  );
}
