import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getFormatter, getTranslations } from "next-intl/server";
import { allLocales, getPostSlugs } from "@/lib/blog";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";

async function loadPost(locale: string, slug: string) {
  const slugs = await getPostSlugs(locale);
  if (!slugs.includes(slug)) notFound();
  return import(`@/content/${locale}/blog/${slug}.mdx`);
}

export async function generateStaticParams() {
  const perLocale = await Promise.all(
    allLocales.map(async (locale) =>
      (await getPostSlugs(locale)).map((slug) => ({ locale, slug })),
    ),
  );
  return perLocale.flat();
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/media/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const { meta } = await loadPost(locale, slug);
  return {
    title: meta.title,
    description: meta.excerpt,
    alternates: pageAlternates(locale, `/media/blog/${slug}`),
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/[locale]/media/blog/[slug]">) {
  const { locale, slug } = await params;
  const { default: Post, meta } = await loadPost(locale, slug);
  const t = await getTranslations("media.blog");
  const format = await getFormatter();

  return (
    <article className="mx-auto max-w-3xl px-5 pb-8 pt-[calc(var(--header-h)+3rem)] sm:px-8">
      <Reveal>
        <TransitionLink
          href="/media/blog"
          className="text-xs font-semibold uppercase tracking-widest text-accent transition-colors duration-[160ms] ease-out hover:text-white"
        >
          ← {t("back")}
        </TransitionLink>
        <time
          dateTime={meta.date}
          className="mt-8 block text-xs font-semibold uppercase tracking-widest text-muted"
        >
          {format.dateTime(new Date(meta.date), { dateStyle: "long", timeZone: "UTC" })}
        </time>
        <h1 className="mt-3 font-display text-[clamp(1.5rem,6vw,1.875rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
          {meta.title}
        </h1>
        {meta.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {meta.tags.map((tag: string) => (
              <li key={tag} className="rounded-ui bg-surface px-2.5 py-1 text-xs text-light">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </Reveal>
      <Reveal index={1} className="mt-10 text-lg">
        <Post />
      </Reveal>
    </article>
  );
}
