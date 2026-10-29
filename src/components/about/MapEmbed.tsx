"use client";

import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

type Props = {
  embedUrl: string;
  title: string;
  loadLabel: string;
  comingSoonLabel: string;
};

// Loads nothing from Google until the visitor asks for the map.
export function MapEmbed({ embedUrl, title, loadLabel, comingSoonLabel }: Props) {
  const [active, setActive] = useState(false);

  if (!embedUrl) {
    return (
      <ImagePlaceholder
        label={comingSoonLabel}
        className="aspect-[4/3] w-full rounded-ui sm:aspect-video"
      />
    );
  }

  if (active) {
    return (
      <iframe
        title={title}
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-[4/3] w-full rounded-ui sm:aspect-video"
      />
    );
  }

  return (
    <div className="grid aspect-[4/3] w-full place-items-center rounded-ui bg-surface sm:aspect-video">
      <div className="flex flex-col items-center gap-4">
        <FaLocationDot aria-hidden className="size-10 text-accent" />
        <Button onClick={() => setActive(true)}>{loadLabel}</Button>
      </div>
    </div>
  );
}
