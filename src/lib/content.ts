import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { routing } from "@/i18n/routing";

const contentRoot = path.join(process.cwd(), "src", "content");

async function readJson<T>(locale: string, collection: string): Promise<T> {
  const file = path.join(contentRoot, locale, `${collection}.json`);
  return JSON.parse(await fs.readFile(file, "utf8")) as T;
}

// Reads src/content/<locale>/<collection>.json, falling back to the default
// locale when a translation does not exist yet.
export async function getCollection<T>(
  locale: string,
  collection: string,
): Promise<T> {
  // Content files only change on deploy, and Cache Components treats disk
  // reads as uncached I/O unless the result is cached.
  try {
    return await readJson<T>(locale, collection);
  } catch (error) {
    if (locale === routing.defaultLocale) throw error;
    return readJson<T>(routing.defaultLocale, collection);
  }
}
