// Non-translatable Media data. Empty strings are placeholders awaiting values
// from the owner.
export const mediaPages = [
  { key: "overview", href: "/media" },
  { key: "stream", href: "/media/stream" },
  { key: "vinyl", href: "/media/vinyl" },
  { key: "cds", href: "/media/cds" },
  { key: "downloads", href: "/media/downloads" },
  { key: "podcast", href: "/media/podcast" },
  { key: "blog", href: "/media/blog" },
  { key: "newsletter", href: "/media/newsletter" },
] as const;

export type MediaPageKey = (typeof mediaPages)[number]["key"];

export const streamPlatforms = [
  { key: "spotify", name: "Spotify", url: "" },
  { key: "appleMusic", name: "Apple Music", url: "" },
  { key: "deezer", name: "Deezer", url: "" },
  { key: "tidal", name: "Tidal", url: "" },
  { key: "boomplay", name: "Boomplay", url: "" },
  { key: "amazonMusic", name: "Amazon Music", url: "" },
] as const;

export type Product = {
  id: "afroFolkHop";
  artist: string;
  format: "vinyl" | "cd";
  url: string;
  image: string;
};

export const vinylProducts: Product[] = [
  {
    id: "afroFolkHop",
    artist: "Mac Kelly",
    format: "vinyl",
    url: "https://elasticstage.com/mackellymusic/releases/afro-folk-hop-album",
    image: "/images/vinyl-afro-folk-hop.jpg",
  },
];

// CD titles and links to be supplied by the owner.
export const cdProducts: Product[] = [];

// Downloadable files or links to be supplied by the owner.
export const downloads: { title: string; description: string; url: string }[] = [];

// Podcast episodes (YouTube video ids). The six below are stand-in videos; an
// episode without a `title` shows "Sample episode N" until one is set.
export const podcastEpisodes: { title?: string; youtubeId: string }[] = [
  { youtubeId: "lTwkPH9I1nA" },
  { youtubeId: "QimRaAoHeIQ" },
  { youtubeId: "oBSVlZreftE" },
  { youtubeId: "6jthM-NXEoA" },
  { youtubeId: "dPn04_FJ4Ds" },
  { youtubeId: "9oHC37OXAKs" },
];
