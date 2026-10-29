// Single source of truth for company details, contact addresses and external
// links. Empty strings are placeholders awaiting real values from the owner.
const domain = "maculturedigitals.com";

export const site = {
  name: "Maculture Digitals",
  legalName: "Maculture Digitals SARL",
  url: `https://www.${domain}`,
  emails: {
    founder: `founder@${domain}`,
    finances: `finances@${domain}`,
    partnerships: `partnerships@${domain}`,
    projects: `projects@${domain}`,
    events: `events@${domain}`,
    publishing: `publishing@${domain}`,
    // Studio booking and news per the owner's doc; not in the owner's email list.
    media: `media@${domain}`,
    // Used as the "copy" address on every call to action.
    copy: "maculturedigitals@gmail.com",
  },
  phone: "+237 677354320",
  address: {
    short: "Soa, Center Region, Cameroon",
    // Postal address, shown alongside the Soa location (owner confirmed).
    poBox: "P.O. Box 740, Yaoundé",
  },
  registration: {
    incorporated: "2025-03-26",
    businessNumber: "RC/YAE/2025/B13/00217",
    uniqueId: "M042517651479K",
  },
  socials: {
    linkedin: "",
    facebook: "",
    instagram: "",
    tiktok: "",
  },
} as const;

export type SocialKey = keyof typeof site.socials;
