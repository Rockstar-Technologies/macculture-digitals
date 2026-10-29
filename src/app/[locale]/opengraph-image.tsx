import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

// Placeholder share image (1200x630) built from the temporary "MD" mark.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brand" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "#ffffff",
          padding: 72,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 60,
            border: "5px solid #ff6a00",
            color: "#ff6a00",
            fontSize: 52,
            fontWeight: 800,
          }}
        >
          MD
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, textTransform: "uppercase", lineHeight: 1 }}>
            {t("name")}
          </div>
          <div style={{ marginTop: 24, fontSize: 40, color: "#ff6a00" }}>{t("tagline")}</div>
        </div>
      </div>
    ),
    size,
  );
}
