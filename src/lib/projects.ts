import "server-only";
import { getCollection } from "./content";

export type ProjectContent = { slug: string; title: string; description: string[] };
export type ProjectTheme = { id: string; title: string; projects: ProjectContent[] };

export const getProjects = (locale: string) =>
  getCollection<{ themes: ProjectTheme[] }>(locale, "projects");
