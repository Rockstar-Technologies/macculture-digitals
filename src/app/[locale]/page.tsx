import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { Artists } from "@/components/sections/Artists";
import { CreativeHub } from "@/components/sections/CreativeHub";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Releases } from "@/components/sections/Releases";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates(locale, "/") };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Releases />
      <Artists />
      <CreativeHub />
    </>
  );
}
