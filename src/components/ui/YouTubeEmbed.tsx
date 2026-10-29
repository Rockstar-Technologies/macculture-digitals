"use client";

import { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { ImagePlaceholder } from "./ImagePlaceholder";

type Props = {
  videoId: string;
  title: string;
  playLabel: string;
  comingSoonLabel: string;
};

// Loads nothing from YouTube until the visitor clicks play.
export function YouTubeEmbed({ videoId, title, playLabel, comingSoonLabel }: Props) {
  const [active, setActive] = useState(false);

  if (!videoId) {
    return (
      <ImagePlaceholder
        label={comingSoonLabel}
        className="aspect-video w-full rounded-ui"
      />
    );
  }

  if (active) {
    return (
      <iframe
        className="aspect-video w-full rounded-ui"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      aria-label={playLabel}
      onClick={() => setActive(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-ui bg-surface"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
      />
      <span className="absolute inset-0 grid place-items-center bg-black/40">
        <span className="grid size-14 place-items-center rounded-full bg-accent text-black transition-transform duration-[160ms] ease-out group-hover:scale-110 group-active:scale-95">
          <FaPlay aria-hidden className="ml-0.5 size-5" />
        </span>
      </span>
    </button>
  );
}
