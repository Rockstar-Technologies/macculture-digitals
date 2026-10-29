import type { MetadataRoute } from "next";
import { aboutPages } from "@/config/about";
import { mediaPages } from "@/config/media";
import { navItems } from "@/config/nav";
import { site } from "@/config/site";
import { routing } from "@/i18n/routing";
import { getPostSlugs } from "@/lib/blog";


export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = new Set<string>(["/", "/donate"]);
  for (const { href } of navItems) paths.add(href);
  for (const { href } of aboutPages) paths.add(href);
  for (const { href } of mediaPages) paths.add(href);

  const entries: MetadataRoute.Sitemap = [];
  const languages = (path: string) =>
    Object.fromEntries(
      routing.locales.map((code) => [code, `${site.url}/${code}${path === "/" ? "" : path}`]),
    );

  for (const path of paths) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${site.url}/${locale}${path === "/" ? "" : path}`,
        alternates: { languages: languages(path) },
      });
    }
  }

  // Blog posts exist per language; only list a language that has the post.
  for (const locale of routing.locales) {
    for (const slug of await getPostSlugs(locale)) {
      entries.push({ url: `${site.url}/${locale}/media/blog/${slug}` });
    }
  }
  return entries;
}
