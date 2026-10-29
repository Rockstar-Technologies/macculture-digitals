import { routing } from "@/i18n/routing";

// Canonical URL plus the language alternates for one page. `path` is the
// locale-less path, for example "/about" or "/media/blog/my-post".
export function pageAlternates(locale: string, path: string) {
  const clean = path === "/" ? "" : path;
  return {
    canonical: `/${locale}${clean}`,
    languages: Object.fromEntries([
      ...routing.locales.map((code) => [code, `/${code}${clean}`]),
      ["x-default", `/${routing.defaultLocale}${clean}`],
    ]),
  };
}
