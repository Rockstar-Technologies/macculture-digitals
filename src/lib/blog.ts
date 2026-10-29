import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { routing } from "@/i18n/routing";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover: string;
};

type MdxModule = { meta: Omit<PostMeta, "slug"> };

const blogDir = (locale: string) =>
  path.join(process.cwd(), "src", "content", locale, "blog");

export async function getPostSlugs(locale: string): Promise<string[]> {
  try {
    const files = await fs.readdir(blogDir(locale));
    return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

// Newest first. Metadata comes from each post's exported `meta`.
export async function getPosts(locale: string): Promise<PostMeta[]> {
  const slugs = await getPostSlugs(locale);
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const mod: MdxModule = await import(`@/content/${locale}/blog/${slug}.mdx`);
      return { slug, ...mod.meta };
    }),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export const allLocales = routing.locales;
