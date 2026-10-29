"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div role="group" aria-label={t("label")} className="flex items-center">
      {routing.locales.map((code, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && <span aria-hidden className="text-muted">/</span>}
          <button
            type="button"
            lang={code}
            aria-label={`${code.toUpperCase()}, ${t(code)}`}
            aria-pressed={code === locale}
            onClick={() => router.replace(pathname, { locale: code })}
            className={`px-2 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-[160ms] ease-out ${
              code === locale ? "text-accent" : "text-light hover:text-white"
            }`}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  );
}
