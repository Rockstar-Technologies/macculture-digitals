export type ProjectStatus = "idea" | "planning" | "seeking" | "running";

// Per-project, language-neutral data. Titles and descriptions live in
// src/content/<locale>/projects.json. Status is the owner's to confirm.
export const projectMeta: Record<string, { status: ProjectStatus; image: string }> = {
  "north-south": { status: "seeking", image: "" },
  "south-south": { status: "seeking", image: "" },
  "creative-hub-upgrade": { status: "seeking", image: "" },
  "connected-studios": { status: "seeking", image: "" },
  "artist-capacity-building": { status: "seeking", image: "" },
  "publishing-grant": { status: "seeking", image: "" },
  "low-cost-housing": { status: "seeking", image: "" },
  "music-videos": { status: "seeking", image: "" },
  "documentaries-podcasts": { status: "seeking", image: "" },
  "cultural-tourism": { status: "seeking", image: "" },
  "anniversary-concert": { status: "seeking", image: "" },
};
