import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getLocale, getTranslations } from "next-intl/server";
import { getPosts } from "@/lib/blog";
import { BlogGrid } from "@/components/media/BlogGrid";
import { EmptyState } from "@/components/media/EmptyState";
import { MediaShell } from "@/components/media/MediaShell";
import { PageIntro } from "@/components/media/PageIntro";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/media/blog">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "media" });
  return { title: t("titles.blog"), alternates: pageAlternates(locale, "/media/blog") };
}

export default async function BlogPage() {
  const locale = await getLocale();
  const posts = await getPosts(locale);
  const t = await getTranslations("media");

  return (
    <MediaShell pageKey="blog">
      <PageIntro>{t("intro.blog")}</PageIntro>
      {posts.length > 0 ? <BlogGrid posts={posts} /> : <EmptyState message={t("empty.blog")} />}
    </MediaShell>
  );
}
