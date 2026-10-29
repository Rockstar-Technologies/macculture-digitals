# Launch checklist

Everything below is host-agnostic unless a section says otherwise. The site needs
Node 22, runs with `pnpm build` and `pnpm start`, and has no environment variables.

## 1. Content still to supply

Each item is a value the site is waiting for. Until it is set, the page shows a
"coming soon" or placeholder state.

| Item | File |
|---|---|
| Social links (LinkedIn, Facebook, Instagram, TikTok) | `src/config/site.ts` |
| Hero video clips and poster frames (stand-ins in place) | `public/videos/hero-1..6.mp4`, `public/images/hero-poster-1..6.jpg` |
| 4 YouTube video ids (video, lyric, sound, podcast; stand-ins in place) | `src/config/home.ts` |
| Spotify playlist link ("This is Mac Kelly") | `src/config/home.ts` |
| Artist portraits (stand-in stock photos in place: replace `mac-kelly.jpg`, `edi-win-chenny.jpg`) and Mac Kelly's streaming/social links | `public/images/`, `src/config/home.ts`, `src/config/about.ts` |
| Studio photo for The Creative Hub (stand-in: `creative-hub-studio.jpg`) | `public/images/` |
| Founder photo (stand-in stock photo: `founder.jpg`), partner logos and links, Google Maps links | `public/images/`, `src/config/about.ts` |
| Streaming platform links, vinyl cover (stand-in: `vinyl-afro-folk-hop.jpg`), CDs, downloads, real podcast episodes (6 stand-in videos in place) | `src/config/media.ts` |
| Merch store links | `src/config/get-involved.ts` |
| Donation QR code image, supporters | `src/config/donate.ts` |
| Project descriptions, status, images | `src/content/<locale>/projects.json`, `src/config/projects.ts` |
| Real resource entries (delete the 3 samples) | `src/content/<locale>/resources.json` |
| Real blog posts (delete the 2 samples; their stand-in covers are `blog-*.jpg`) | `src/content/<locale>/blog/`, `public/images/` |
| Final logo, favicon and share image | `src/components/layout/Logo.tsx`, `src/app/icon.tsx`, `src/app/apple-icon.tsx`, `src/app/[locale]/opengraph-image.tsx` |
| Newsletter provider (currently opens an email to founder@) | `src/components/media/NewsletterForm.tsx` |

## 2. Review before going live

- **Replace every stand-in photo, video and YouTube link.** The stock portraits of people sit under the real names of Mac Kelly, Edi-Win Chenny and the founder. Do not launch with them. `docs/IMAGE-CREDITS.md` lists each stand-in and where it came from.

- Read every French page. All French text is a draft: `messages/fr.json`,
  `src/content/fr/`.
- Confirm the public wording of the company details (bank, registration numbers).
- Confirm the mailboxes exist and are monitored: founder@, finances@,
  partnerships@, projects@, events@, publishing@, media@ and the Gmail copy address.
- Replace the placeholder logo, favicon and share image.

## 3. Deploy

The site is a static export (`pnpm build` then upload `out/`). Needs Node 22 to build only.
The domain in `src/config/site.ts` (`www.maculturedigitals.com`) feeds canonical
URLs, the sitemap and structured data. Change it there if the final domain differs.
Any static host works; set the 404 document to `404.html`.

## 4. After deploy

- Open `/`, confirm it forwards to `/en/`.
- Check `/sitemap.xml`, `/robots.txt`, `/icon` and a made-up URL (must show the 404 page).
- Submit the sitemap to Google Search Console and Bing Webmaster Tools.
- Test a mailto button, the language switcher and a page transition on a phone.
- Run Lighthouse on `/en` and `/fr`.
