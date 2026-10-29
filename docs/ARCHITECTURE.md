# Maculture Digitals Website: Architecture and Phases

Status: approved by the owner. Phases advance only on the owner's explicit sign-off.

## Working rules
- No assumptions about architecture or design. Unclear points are asked first.
- A phase is complete only when the owner validates the output and says they are satisfied. Do not start the next phase before that.
- `design.md` (repo root) is the single source of truth for design. It is built incrementally from the context the owner provides (descriptions, images, reference sites).
- Next.js 16.4 has breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before writing code.

## Stack
Next.js 16.4 (App Router, `src/`), React 19, TypeScript, Tailwind CSS v4, ESLint, pnpm. Motion: framer-motion and GSAP (`@gsap/react`).

## Decisions
| Topic | Decision |
|---|---|
| Languages | English and French from the start (`/en`, `/fr`) |
| Content | MDX and JSON files in the repo, no CMS |
| Calls to action | `mailto:` links with addresses and subjects from the owner's doc, no email backend |
| Newsletter | Embedded signup form behind a provider-agnostic interface and API route. Provider undecided |
| Hosting | Undecided. Stay Vercel-compatible and avoid anything that blocks other hosts |

## Structure
```
design.md                  design source of truth
src/
  app/[locale]/            every page lives under a locale
    page.tsx               Home
    about/                 /about (Who we are) + history, connections, team, talent-pool, location
    get-involved/          call-to-action items
    media/                 Vinyl, CDs, Podcast, Downloads, Stream, Blog, Newsletter
    projects/              11 projects
    resources/             Resources for Indie
    contact/
    api/newsletter/        provider-agnostic signup route
  components/
    ui/                    buttons, cards, badges (from design.md)
    layout/                header, footer, nav, language switcher, Donate button
    sections/              page-specific blocks (hero slideshow, embeds, etc.)
  content/{en,fr}/         MDX and JSON: blog, resources, projects, connections, team
  config/site.ts           company details, emails, socials, external links
  lib/                     content loaders, i18n helpers, mailto builder
```

i18n: `next-intl` (owner-approved; its docs confirm `proxy.ts`, the Next.js 16 rename of `middleware.ts`). Same URL slugs in both languages (`/fr/about`).

Header items: ABOUT, GET INVOLVED, MEDIA, PROJECTS, RESOURCES FOR INDIE, CONTACT US, plus a Donate button.

Conventions:
- Every email, link, social URL and company number lives in `config/site.ts`.
- YouTube and Spotify embeds load on click.

## Phases
| # | Phase | Output |
|---|---|---|
| 0 | Design foundations | `design.md`: color, type, spacing, motion principles, core components |
| 1 | Technical foundation | i18n routing, app shell (header, footer, nav, language switcher, Donate button, socials), content layer, `site.ts`, placeholder routes |
| 2 | Home | Slideshow hero, releases embeds, Spotify embed, Creative Hub block, footer details |
| 3 | About | Who we are, History, Connections, Team, Talent Pool, Location |
| 4 | Get Involved | Call-to-action items and their mailto flows |
| 5 | Media | Vinyl, CDs, Podcast, Downloads, Stream, Blog, Newsletter with signup form |
| 6 | Projects | Listing and detail pages with partner call to action |
| 7 | Resources, Contact and Donate | Opportunities feed, contact page, donation page with QR code |
| 8 | Polish and launch | Motion pass, accessibility, performance, SEO, French QA, deployment preparation |

## Decisions since approval
- Media: no Gallery; Buy Merch lives under Get Involved. Header includes Resources for Indie; no Twitter/X.
- `media@` exists. Footer and Contact show both the P.O. Box and Soa.
- French text is drafted by the developer and reviewed by the owner on the site.
- Newsletter: email-based stopgap until a provider is chosen. Hosting is undecided (see `docs/LAUNCH-CHECKLIST.md`).
- Phase 8 added: sitemap, robots, structured data, generated placeholder favicon and share image, branded 404 (experimental `global-not-found`), muted text color lightened for WCAG AA.

## Update: static export
The site now builds with `output: "export"` (no server). `src/proxy.ts`, Cache Components and the `/favicon.ico` redirect were removed; the root `/` is a meta-refresh page in `src/app/(root)/`. The newsletter API route was never built (signup is a `mailto:` link). The language control offers English and French only (a Google Translate menu was tried and removed).

## Update: look and motion
Fonts: Bricolage Grotesque (display), Hanken Grotesk (body), Space Mono (labels). Motion: first-load intro (`Intro.tsx`), Lenis smooth scroll (`SmoothScroll.tsx`), pointer dot-grid (`PointerGlow.tsx`), ticker (`Marquee.tsx`), masked heading reveals, hero parallax. All are off or static under `prefers-reduced-motion`; the hero slideshow shows no progress controls.
