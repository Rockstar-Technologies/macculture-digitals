import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Product } from "@/config/media";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export async function ProductGrid({ products }: { products: Product[] }) {
  const t = await getTranslations("media.products");

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => {
          const title = t(`${product.id}.title`);
          return (
            <li key={product.id}>
              <Reveal index={i} className="h-full">
                <Card interactive className="flex h-full flex-col !p-0 overflow-hidden">
                  <div className="relative aspect-square">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={title}
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
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                      {t(product.format)}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-extrabold uppercase tracking-tight text-white">
                      {title}
                    </h2>
                    <p className="mt-1 flex-1 text-sm text-muted">
                      {t("by", { artist: product.artist })}
                    </p>
                    <div className="mt-6">
                      {product.url ? (
                        <Button href={product.url}>{t("order")}</Button>
                      ) : (
                        <p className="text-sm uppercase tracking-widest text-muted">
                          {t("comingSoon")}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </Reveal>
            </li>
          );
        })}
      </ul>
      <Reveal>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted">{t("note")}</p>
      </Reveal>
    </>
  );
}
