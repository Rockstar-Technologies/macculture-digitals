import Image from "next/image";
import { getFormatter, getTranslations } from "next-intl/server";
import type { PostMeta } from "@/lib/blog";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Card } from "@/components/ui/Card";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export async function BlogGrid({ posts }: { posts: PostMeta[] }) {
  const t = await getTranslations("media.blog");
  const format = await getFormatter();

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <li key={post.slug}>
          <Reveal index={i % 3} className="h-full">
            <TransitionLink href={`/media/blog/${post.slug}`} className="block h-full">
              <Card interactive className="flex h-full flex-col !p-0 overflow-hidden">
                <div className="relative aspect-video">
                  {post.cover ? (
                    <Image
                      src={post.cover}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <ImagePlaceholder
                      label={t("coverPlaceholder")}
                      className="absolute inset-0"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <time
                    dateTime={post.date}
                    className="text-xs font-semibold uppercase tracking-widest text-muted"
                  >
                    {format.dateTime(new Date(post.date), {
                      dateStyle: "long",
                      timeZone: "UTC",
                    })}
                  </time>
                  <h2 className="mt-3 font-display text-xl font-bold leading-snug text-white">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm text-light">{post.excerpt}</p>
                  {post.tags.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-ui bg-ink px-2.5 py-1 text-xs text-light"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Card>
            </TransitionLink>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
