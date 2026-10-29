"use client";

import { useState } from "react";
import { FaSpotify } from "react-icons/fa6";
import { Button } from "./Button";
import { ImagePlaceholder } from "./ImagePlaceholder";

type Props = {
  url: string;
  title: string;
  loadLabel: string;
  comingSoonLabel: string;
};

function toEmbedUrl(url: string): string | null {
  const match = url.match(
    /open\.spotify\.com\/(playlist|artist|album|track)\/([A-Za-z0-9]+)/,
  );
  return match
    ? `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`
    : null;
}

// Loads nothing from Spotify until the visitor asks for the player.
export function SpotifyEmbed({ url, title, loadLabel, comingSoonLabel }: Props) {
  const [active, setActive] = useState(false);
  const embedUrl = url ? toEmbedUrl(url) : null;

  if (!embedUrl) {
    return (
      <ImagePlaceholder label={comingSoonLabel} className="h-full min-h-60 w-full rounded-ui" />
    );
  }

  if (active) {
    return (
      <iframe
        className="h-full min-h-[352px] w-full rounded-ui"
        src={embedUrl}
        title={title}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    );
  }

  return (
    <div className="grid h-full min-h-60 w-full place-items-center rounded-ui bg-surface p-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <FaSpotify aria-hidden className="size-10 text-accent" />
        <Button onClick={() => setActive(true)}>{loadLabel}</Button>
      </div>
    </div>
  );
}
