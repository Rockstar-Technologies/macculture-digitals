import "server-only";
import { getCollection } from "./content";

export type Highlight = { title: string; text: string };
export type Fact = { label: string; value: string };
export type DiscographyItem = { title: string; year: string; kind: string };

export type TalentProfile = {
  id: "macKelly" | "ediWinChenny";
  name: string;
  tagline: string;
  bio: string[];
  highlightsTitle: string;
  highlights: Highlight[];
  facts: Fact[];
  discography: DiscographyItem[];
};

export type AboutContent = {
  whoWeAre: {
    intro: string[];
    slogansTitle: string;
    slogans: string[];
    activitiesTitle: string;
    activitiesIntro: string;
    activities: string[];
  };
  history: {
    paragraphs: string[];
    timelineTitle: string;
    timeline: { year: string; text: string }[];
  };
  connections: {
    intro: string;
    items: { id: string; name: string; summary: string }[];
  };
  team: {
    intro: string;
    founder: {
      name: string;
      alias: string;
      role: string;
      bio: string[];
      lookingTitle: string;
      looking: string;
      skillsTitle: string;
      skills: string[];
    };
  };
  talent: {
    intro: string;
    factsTitle: string;
    discographyTitle: string;
    profiles: TalentProfile[];
  };
  location: { body: string; addressTitle: string };
};

export const getAbout = (locale: string) =>
  getCollection<AboutContent>(locale, "about");
