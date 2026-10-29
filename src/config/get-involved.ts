import { site } from "@/config/site";

// Non-translatable wiring for each call to action. Items without an `email`
// use a different button (see GetInvolvedCard).
export const involvement: Record<
  string,
  { email?: string; secondary?: { href: string; labelKey: "seeProjects" } }
> = {
  partner: {
    email: site.emails.partnerships,
    secondary: { href: "/projects", labelKey: "seeProjects" },
  },
  donate: {},
  merch: {},
  publish: { email: site.emails.publishing },
  studio: { email: site.emails.media },
  bookArtist: { email: site.emails.founder },
  manageEvent: { email: site.emails.events },
  news: { email: site.emails.media },
  opportunities: { email: site.emails.founder },
  join: { email: site.emails.founder },
  train: { email: site.emails.partnerships },
};

export const donateHref = "/donate";

// Online merch stores, to be supplied by the owner.
export const merchStores: { name: string; url: string }[] = [];
