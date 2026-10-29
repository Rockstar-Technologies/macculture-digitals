// Non-translatable Home data. Empty strings are placeholders awaiting values
// from the owner; components render a "coming soon" state for them.
// Temporary stand-in media is in use: replace a file by uploading a new one
// with the same name (see docs/IMAGE-CREDITS.md for where each came from).
export type HeroVideo = { src: string; poster: string };

export const home = {
  hero: {
    // Six looping background clips in public/videos, each with a still poster
    // frame in public/images (shown before playback and for reduced motion).
    videos: [1, 2, 3, 4, 5, 6].map((n) => ({
      src: `/videos/hero-${n}.mp4`,
      poster: `/images/hero-poster-${n}.jpg`,
    })) as HeroVideo[],
  },
  releases: [
    { kind: "video", youtubeId: "pekzpzNCNDQ" },
    { kind: "lyric", youtubeId: "XU68TqYAStc" },
    { kind: "sound", youtubeId: "Nr_Km2sqsCY" },
    { kind: "podcast", youtubeId: "p35cIBLtaMg" },
  ] as const,
  spotifyPlaylistUrl: "",
  artists: [
    {
      id: "macKelly",
      image: "/images/mac-kelly.jpg",
      links: { spotify: "", appleMusic: "", instagram: "" },
    },
    {
      id: "ediWinChenny",
      image: "/images/edi-win-chenny.jpg",
      links: {
        spotify: "https://open.spotify.com/artist/0AUCvj5W5ZjfwjFCF7nN5l",
        appleMusic: "https://music.apple.com/us/artist/edi-win-chenny/1720043368",
        instagram: "",
      },
    },
  ] as const,
  creativeHub: { image: "/images/creative-hub-studio.jpg" },
};

export type ReleaseKind = (typeof home.releases)[number]["kind"];
export type ArtistId = (typeof home.artists)[number]["id"];
