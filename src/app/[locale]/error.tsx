"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("errors");

  return (
    <div className="mx-auto max-w-7xl px-5 pb-8 pt-[calc(var(--header-h)+4rem)] sm:px-8">
      <h1 className="font-display text-[clamp(1.5rem,6.6vw,1.875rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">
        {t("errorTitle")}
      </h1>
      <p className="mt-6 max-w-xl text-lg text-light">{t("errorBody")}</p>
      <div className="mt-8">
        <Button onClick={reset}>{t("retry")}</Button>
      </div>
    </div>
  );
}
