"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FaApple, FaInstagram, FaPlay, FaSpotify } from "react-icons/fa6";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

type Links = { spotify: string; appleMusic: string; instagram: string };

type Props = {
  name: string;
  genre: string;
  releases: string;
  releasesLabel: string;
  listenLabel: string;
  detailsLabel: string;
  photoLabel: string;
  placeholderLabel: string;
  linkLabels: Record<keyof Links, string>;
  image: string;
  links: Links;
};

const linkIcons = { spotify: FaSpotify, appleMusic: FaApple, instagram: FaInstagram };

// Details open on mouse hover, keyboard focus, or a tap on touch devices.
export function ArtistCard(props: Props) {
  const { name, genre, releases, image, links, linkLabels } = props;
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tapped, setTapped] = useState(false);
  const pointerType = useRef("mouse");

  const expanded = hovered || focused || tapped;
  const iconLinks = (Object.keys(linkIcons) as (keyof Links)[]).filter(
    (key) => links[key],
  );

  return (
    <article
      className="flex h-[34rem] flex-col overflow-hidden rounded-ui bg-surface transition-shadow duration-200 ease-out data-[open=true]:shadow-[0_0_0_1px_rgb(255_106_0/0.5),0_16px_40px_-16px_rgb(255_106_0/0.35)]"
      data-open={expanded}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setHovered(false);
      }}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={props.photoLabel}
            fill
            sizes="(min-width: 640px) 45vw, 100vw"
            className="object-cover object-[50%_25%]"
          />
        ) : (
          <ImagePlaceholder
            label={props.placeholderLabel}
            className="absolute inset-0"
          />
        )}
      </div>

      <div className="p-6">
        <button
          type="button"
          aria-expanded={expanded}
          aria-label={props.detailsLabel}
          onPointerDown={(e) => {
            pointerType.current = e.pointerType;
          }}
          onClick={() => {
            // Mouse users already get hover; only touch and pen tap to toggle.
            if (pointerType.current !== "mouse") setTapped((v) => !v);
          }}
          className="block w-full text-left"
        >
          <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-white">
            {name}
          </h3>
          <p className="mt-1 text-sm text-accent">{genre}</p>
        </button>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-[250ms] ease-[var(--ease-out-strong)] ${
            expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden" inert={!expanded}>
            <div className="pt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                {props.releasesLabel}
              </p>
              <p className="mt-1 text-sm text-light">{releases}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {links.spotify && (
                  <a
                    href={links.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-ui bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black transition-[transform,background-color] duration-[160ms] ease-out hover:bg-white active:scale-[0.97]"
                  >
                    <FaPlay aria-hidden className="size-3" />
                    {props.listenLabel}
                  </a>
                )}
                <ul className="flex items-center gap-1">
                  {iconLinks.map((key) => {
                    const Icon = linkIcons[key];
                    return (
                      <li key={key}>
                        <a
                          href={links[key]}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${name}: ${linkLabels[key]}`}
                          className="grid size-10 place-items-center rounded-ui text-light transition-[color,transform] duration-[160ms] ease-out hover:text-accent active:scale-95"
                        >
                          <Icon aria-hidden className="size-4" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
