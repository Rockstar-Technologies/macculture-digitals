# Maculture Digitals: design.md

Source of truth for design. Only the owner's confirmed decisions are recorded as decisions. Anything unresolved is listed under "Open" and must be asked about, not assumed.

## Direction (confirmed)
- Main reference: https://msbtalents.com. We keep its color base and parts of its structure, then redesign with the installed design skills.
- Feel: clean, sleek, minimalist, bold fonts, smooth animations.
- Logo: none yet. A placeholder is used until one exists.

## Color
Base (taken from the reference site's CSS):
| Token | Value | Source |
|---|---|---|
| black | `#000000` | reference |
| ink | `#1D212A` | reference (dark navy) |
| surface | `#242424` | reference |
| muted | `#8B8F96` | reference grey `#76797E`, lightened in Phase 8 so small grey text on cards passes WCAG AA (4.5:1) |
| light | `#CCCCCC` | reference |
| accent | `#FF6A00` | owner's choice (vivid orange). Contrast 7.3:1 on black, 5.6:1 on `#1D212A`, 5.4:1 on `#242424`. Black text on accent also 7.3:1 |

## Typography
Owner chose new bold fonts (not the reference's Oswald and Orbitron).
- Headings: Bricolage Grotesque (extra-bold), labels in Space Mono
- Body: Hanken Grotesk
- Both from Google Fonts. Weights and the type scale are still to be defined.

## Structure kept from the reference
- Hero slideshow (matches the owner's 6-photo slideshow sketch)
- Releases cards (cover art with streaming icons)
- Full-screen page-transition overlay (reference: 1.1s, `cubic-bezier(0.8, 0, 0.2, 1)`)

## Artist cards
Not copied from the reference. Owner direction: hover reveals, with a refined and better layout and look than the reference's simple photo, name and icons card.
On hover, the card reveals: genre and key releases, streaming and social icons, and a play/listen button.
**Open:** exact layout, what the play/listen button does (embedded player or link out), and touch-device behavior (no hover on phones).

## Navbar
- Similar to the owner's sketch: logo left with name and tagline, then ABOUT, GET INVOLVED, MEDIA, CONTACT US (and PROJECTS, added in red on the sketch), social icons, and a Donate button at the far right.
- Sticky. On scroll it shrinks and gains a blurred dark background.
- Mobile: a dropdown menu below the bar.
- Items: ABOUT, GET INVOLVED, MEDIA, PROJECTS, RESOURCES FOR INDIE, CONTACT US.
- Socials: LinkedIn, Facebook, Instagram, TikTok (no Twitter/X).

## Core components
- Cards: minimalist, 8px radius.
- Buttons: minimalist, 8px radius, matching the cards.
- Card surface: filled (`#242424` / `#1D212A` on black), no border. Hover: subtle lift plus an orange edge glow.
- Button variants: primary (solid orange `#FF6A00`, black text) and secondary (outlined, light text).
- Footer: large oversized "Maculture Digitals" wordmark in the display font above the link columns, with contact and company info and the registration line.

## Motion
Smooth, restrained animation with framer-motion and GSAP. Must respect `prefers-reduced-motion`.
- Page transitions (the reference's full-screen overlay is the starting point)
- Scroll reveals
- Hover states
Timing (approved):
- Hover: 150-200ms, ease-out.
- Scroll reveals: 500-600ms, 24px rise plus fade, 60ms stagger, play once.
- Page transition: ~700ms, `cubic-bezier(0.8, 0, 0.2, 1)` (from the reference).
- All of it disabled under `prefers-reduced-motion`.
**Open:** which library handles what (decided during implementation, reported at phase review).

## Components and sections
To be added as the owner provides context.

## Home page (Phase 2, confirmed)
Section order: Hero, Releases + Spotify playlist, Artists, The Creative Hub. Contact details live in the footer (the sketch's contact block is not duplicated).
- **Hero:** static landing note over a slideshow of 6 self-hosted looping video clips (owner's change from photos, after viewing torghana.gov.gh; the current text layout is kept). Slow crossfade (~1.2s) every ~6s, dark overlay for legibility, dots and a pause control. Only the visible clip plays; with reduced motion or when paused, a still poster frame shows. No background music for now. The clips in `public/videos/hero-1..6.mp4` (posters `public/images/hero-poster-1..6.jpg`) are stand-ins to be replaced by uploading files with the same names.
- **Releases:** four YouTube tiles as sketched (video, lyric, sound, podcast), loaded on click. The Spotify playlist ("This is Mac Kelly") sits beside them, also loaded on click.
- **Artists:** Mac Kelly and Edi-Win Chenny. Card layout: photo on top, name and genre below. On hover the photo shrinks and the info area expands to show key releases, a play button and streaming/social icons. The play button links out to Spotify. On touch devices, tap expands and collapses. Keyboard focus also expands.
- **The Creative Hub:** studio feature block with image, short text, a link to About and a "Book the studio" mailto button.

## About (Phase 3, confirmed)
Separate sub-pages, each with the title and a row of pill tabs underneath (scrollable on phones). Pills: Who We Are, History, Connections, Team, Talent Pool, Location.
- `/about` (Who We Are): company text, the two slogans, and the nine registered activities as a numbered grid of cards (staggered scroll reveal). Below, cards linking to the other five sub-pages.
- `/about/history`, `/about/connections`, `/about/team`, `/about/talent-pool`, `/about/location`.
- **Connections:** card grid, 11 partners, each with a logo placeholder, name, short text and an external link when a URL exists.
- **Talent Pool:** full profile blocks, alternating sides (photo beside bio, key facts, discography, links).
- **Location:** embedded Google Map (loads on click) plus address text.
- Photos and partner logos are placeholders until supplied.

## Get Involved (Phase 4, confirmed)
One page, 11 calls to action in four groups by audience, each a card with a short description and a button.
- **Support us:** Partner With Us, Donate, Buy Merch.
- **For artists:** Publish with Us, Book the Studio.
- **Hire us:** Book an Artist, Book Us to Manage Your Event.
- **Contribute:** Send Us News, Link Us to Opportunities, Join Us, Train Us.
- Buttons are `mailto:` links with the subject and a short body template, copying the Gmail address. Addresses follow the owner's doc; Link Us to Opportunities, Book an Artist and Join Us use `founder@`.
- Donate links to the `/donate` page (Phase 7). Buy Merch lists store links, with a "coming soon" state until supplied.

## Projects (Phase 6, confirmed unless marked)
- **Listing:** the 11 projects as numbered cards (01-11), grouped by theme under side headings (same layout as Get Involved). Each card shows number, title and a status chip.
- **Detail:** clicking a card opens a side panel (modal dialog from the right) with an image placeholder, status, title, description, "Who it benefits", "Partner types sought" and a partnership mailto button. Escape, the close button and a backdrop click close it; the project is deep-linkable by `#slug`.
- **Content:** only the 11 titles exist. Descriptions show "Details coming soon" until the owner supplies them.
- **Proposed, not yet confirmed by the owner:** the theme grouping (Collaboration; Studios & infrastructure; Artist support; Content & events), the status "Seeking partners" for all projects, beneficiaries "emerging independent creatives" and partner types "funders, implementing partners, liaisons to opportunities" (the latter three taken from the owner's general statements).

## Resources, Contact and Donate (Phase 7, confirmed)
- **Resources for Indie:** filter chips (All, Grants, Travel, Conferences, Trainings, Promo sites, Sponsorship) above a grid of opportunity cards (category, title, organisation, deadline, note, link). Entries are JSON per language. Three clearly marked "Sample" entries ship for layout review. A "Know an opportunity?" call to action links to Get Involved.
- **Contact:** company details (name, address, emails, phone) plus one "Write to us" mailto button to `founder@`, copying the Gmail address. No form.
- **Address:** show both the postal address "P.O. Box 740, Yaoundé" and the location "Soa, Center Region, Cameroon" (footer and Contact).
- **`media@`:** exists; keep using it for studio booking and news.
- **Donate:** the steps from the owner's doc (scan the QR code for the banking details, donate, then email `finances@` with the wiring information), a QR image placeholder to replace, an "I have donated" mailto button with a template, and an in-kind support mailto. No bank details as text. A Supporters section (names and logos from a config list) stays hidden until the first supporter is added.

## Deferred (decided later, in the phase where each first matters)
| Item | Decided in |
|---|---|
| Background-music play control | Not planned (owner chose to leave music out for now) |
