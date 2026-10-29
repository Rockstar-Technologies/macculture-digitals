// Non-translatable About data. Empty strings are placeholders awaiting values
// from the owner.
export const aboutPages = [
  { key: "whoWeAre", href: "/about" },
  { key: "history", href: "/about/history" },
  { key: "connections", href: "/about/connections" },
  { key: "team", href: "/about/team" },
  { key: "talentPool", href: "/about/talent-pool" },
  { key: "location", href: "/about/location" },
] as const;

export type AboutPageKey = (typeof aboutPages)[number]["key"];

// External link per connection id; empty means the card has no link yet.
export const connectionLinks: Record<
  string,
  { url: string; labelKey?: "visit" | "order" | "learnMore" }
> = {
  sacem: { url: "" },
  cdbaby: { url: "" },
  elasticstage: {
    url: "https://elasticstage.com/mackellymusic/releases/afro-folk-hop-album",
    labelKey: "order",
  },
  mli: { url: "" },
  tunedly: { url: "" },
  musoai: { url: "" },
  disco: { url: "https://www.disco.ac/" },
  creationafrica: { url: "" },
  isrc: {
    url: "https://en.wikipedia.org/wiki/International_Standard_Recording_Code",
    labelKey: "learnMore",
  },
  bokaworld: { url: "" },
  cranefusion: { url: "https://www.facebook.com/cranefusion/" },
};

export const talentLinks = {
  macKelly: { image: "/images/mac-kelly.jpg", spotify: "", appleMusic: "", instagram: "", website: "" },
  ediWinChenny: {
    image: "/images/edi-win-chenny.jpg",
    spotify: "https://open.spotify.com/artist/0AUCvj5W5ZjfwjFCF7nN5l",
    appleMusic: "https://music.apple.com/us/artist/edi-win-chenny/1720043368",
    instagram: "",
    website: "",
  },
} as const;

export const founderImage = "/images/founder.jpg";

export const location = {
  // Google Maps embed URL ("Share > Embed a map"), and the share link.
  mapEmbedUrl: "",
  mapsUrl: "",
};
