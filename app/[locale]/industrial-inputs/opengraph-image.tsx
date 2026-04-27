import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Industrial Inputs, Sein Wut Hmon Group";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Industrial Inputs",
    title: "Fertilizer, lubricants, and raw materials for Myanmar.",
    photoPath: "images/legacy/swh-mmfcl-cooperation-thilawa-thumb.jpg",
  });
}
