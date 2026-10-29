# Asset register

Every image, video and embed below is a **temporary stand-in** unless marked
"approved". None of it shows the real Maculture Digitals artists, studio or events.
Licences are as recorded on the source page when it was checked; re-check before launch.
Full per-file source links are in [`IMAGE-CREDITS.md`](IMAGE-CREDITS.md).

## How to replace an asset

- **Image:** put your file in `public/images/` with the **same file name and extension**. No code change.
  To use a new name, change the path in `src/config/*.ts` (images are referenced there, not inside components).
- **Hero clip:** replace `public/videos/hero-N.mp4` and `public/images/hero-poster-N.jpg` (N = 1 to 6).
- **YouTube video:** change the video id in `src/config/home.ts` (Home) or `src/config/media.ts` (Podcast page).
- Then update the row in this file: set status to "approved" and record the source.

## Photographs (`public/images/`)

| File | Used in | Subject | Source / licence | Status |
|---|---|---|---|---|
| `mac-kelly.jpg` | Talent Pool, Home artists | Stand-in portrait (unrelated person) | Wikimedia Commons, CC0 | Temporary. Replace with Mac Kelly photo |
| `edi-win-chenny.jpg` | Talent Pool, Home artists | Stand-in portrait (unrelated person) | Wikimedia Commons, CC0 | Temporary. Replace with Edi-Win Chenny photo |
| `founder.jpg` | About, Team | Stand-in portrait (unrelated person) | Wikimedia Commons, CC0 | Temporary. Replace with founder photo |
| `creative-hub-studio.jpg` | Home, Creative Hub block | Generic recording studio | Wikimedia Commons (Pixabay origin), CC0 | Temporary. Replace with the real Creative Hub |
| `vinyl-afro-folk-hop.jpg` | Media, Vinyl | Generic orange vinyl | Wikimedia Commons, CC0 | Temporary. Replace with the real album cover |
| `blog-welcome-to-the-blog.jpg` | Blog sample post | Microphone | Wikimedia Commons, CC0 | Temporary |
| `blog-what-is-afro-folk-hop.jpg` | Blog sample post | Guitarist | Wikimedia Commons, CC0 | Temporary |
| `hero-poster-1..6.jpg` | Hero slideshow (poster frames, reduced-motion and loading state) | Stills of the hero clips | Extracted from the Mixkit clips below | Temporary |

## Hero slideshow clips (`public/videos/hero-1..6.mp4`)

Mixkit Free License (free for commercial use, no attribution, not for redistribution on their own). Silent, 720p, about 12 s.
Themes: concert crowd, mixing console, microphone, DJ turntable, drummer, vocalist in a studio. All **temporary**; replace with
Maculture Digitals footage or photography.

## YouTube embeds

Third-party videos, **not** Maculture Digitals content, embedded from YouTube (nothing is rehosted). They load only after a click.
All are temporary; ids and titles are listed in [`IMAGE-CREDITS.md`](IMAGE-CREDITS.md#youtube-stand-ins). If an embed is blocked,
the card falls back to a link to the original video. Replace with approved Maculture Digitals videos.

## Spotify playlist

"This is Mac Kelly": the playlist URL is **not confirmed**. Set it in `src/config/home.ts`; until then the section shows a clear
"coming soon" state. No identifier has been invented.

## Logo, favicon, share image

No official logo file was supplied. `src/components/layout/Logo.tsx` renders a temporary "MD" wordmark and `src/app/icon.tsx`,
`src/app/apple-icon.tsx`, `src/app/[locale]/opengraph-image.tsx` generate the favicon and share image from it. The source document says Crane Fusion
Graphics finalized the official logo: obtain it and replace these.

## Not used

`~/Downloads/maculture/pic.PNG` (a founder portrait that appears to be AI-generated) was **not** used, because its origin and approval are unconfirmed.
