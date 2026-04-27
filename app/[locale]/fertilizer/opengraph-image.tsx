import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Fertilizer, Sein Wut Hmon Group";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Fertilizer",
    title: "Industrial agriculture inputs through a Marubeni joint venture.",
    photoPath: "images/legacy/swh-mmfcl-cooperation-thilawa-thumb.jpg",
  });
}
