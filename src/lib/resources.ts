import "server-only";
import { getCollection } from "./content";

export const resourceCategories = [
  "grants",
  "travel",
  "conferences",
  "trainings",
  "promo",
  "sponsorship",
] as const;
export type ResourceCategory = (typeof resourceCategories)[number];

export type ResourceEntry = {
  id: string;
  category: ResourceCategory;
  title: string;
  organisation: string;
  deadline: string;
  note: string;
  url: string;
  sample?: boolean;
};

export const getResources = (locale: string) =>
  getCollection<{ entries: ResourceEntry[] }>(locale, "resources");
