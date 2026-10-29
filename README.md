# Maculture Digitals website

Static, backend-free website for Maculture Digitals SARL: English and French. Built with Next.js 16 (App
Router, static export), React 19, TypeScript and Tailwind CSS v4. Motion uses
framer-motion and GSAP is installed for future use.

## Run it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm lint
pnpm build    # writes the static site to out/
npx serve out # or: cd out && python3 -m http.server 4173
```

## Deploy

`pnpm build` produces plain HTML/CSS/JS in `out/`. Upload that folder to any static
host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3, nginx). No server, API or
database is used. The bare domain `/` forwards to `/en/` with a meta refresh; no
redirect rules are needed. The 404 page is `out/404.html`.

## Language

Two languages only: English (`/en/`) and French (`/fr/`; the French is an unreviewed draft). The header switch changes route; there is no machine-translation widget.

## Demo-only or placeholder features

- Contact, booking, publishing, donation and newsletter actions are `mailto:` links; nothing is submitted or stored.
- Hero clips, portraits, studio and vinyl images, YouTube videos, sample blog posts and sample resources are stand-ins (`docs/ASSET_REGISTER.md`).
- No background music: no approved audio file exists.
- Spotify playlist, social profiles, store links and map link are empty until confirmed (`docs/CLIENT_REVIEW_CHECKLIST.md`).

## Where things live

| What | Where |
|---|---|
| Design decisions (colors, type, components, motion) | `design.md` |
| Architecture and phases | `docs/ARCHITECTURE.md` |
| Launch steps and what is still missing | `docs/LAUNCH-CHECKLIST.md` |
| Stand-in media and replacement steps | `docs/ASSET_REGISTER.md` |
| What the client must supply or confirm | `docs/CLIENT_REVIEW_CHECKLIST.md` |
| Company details, emails, social links | `src/config/site.ts` |
| Page data that is not translated (links, images) | `src/config/*.ts` |
| UI text (English and French) | `messages/en.json`, `messages/fr.json` |
| Long content (About, Get Involved, Projects, Resources) | `src/content/<locale>/*.json` |
| Blog posts | `src/content/<locale>/blog/*.mdx` |
| Pages | `src/app/[locale]/...` |

## Editing content

- **Text:** edit the matching file in both languages. Keep `en` and `fr` in step.
- **Links and images:** fill the empty strings in `src/config/`. Components show a
  "coming soon" or placeholder state until a value is set.
- **Photos:** stand-in photos are in `public/images/`; replace one by uploading your own with the same file name (keep the `.jpg` extension). New photos go in the same folder and are referenced as `/images/<name>`.
- **Hero videos:** `public/videos/hero-1.mp4` to `hero-6.mp4`, with a still frame for each in `public/images/hero-poster-1.jpg` to `-6.jpg`. Replace by uploading files with the same names. Keep clips short (about 10 to 12 seconds), muted and under about 2 MB each.
- **Blog:** add `<slug>.mdx` to `src/content/en/blog` and `src/content/fr/blog`.
  The block at the top of each file (`export const meta`) holds title, date,
  excerpt, tags and cover.
- **Resources:** add entries to `src/content/<locale>/resources.json`.

## Notes for developers

- This Next.js version differs from older ones. Read the guides in
  `node_modules/next/dist/docs/` before changing framework-level code (see `AGENTS.md`).
- Locale routing is static (`generateStaticParams` over `en` and `fr`).
- No environment variables are required.
- Static export rules: no middleware/`proxy.ts`, no API routes, no `"use cache"`; metadata routes need `export const dynamic = "force-static"` and dynamic ones need `generateStaticParams`.
