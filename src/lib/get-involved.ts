import "server-only";
import { getCollection } from "./content";

export type InvolvementItem = {
  id: string;
  title: string;
  body: string[];
  cta: string;
  subject: string;
  template: string;
};

export type InvolvementGroup = {
  id: string;
  title: string;
  items: InvolvementItem[];
};

export const getInvolvement = (locale: string) =>
  getCollection<{ groups: InvolvementGroup[] }>(locale, "get-involved");
