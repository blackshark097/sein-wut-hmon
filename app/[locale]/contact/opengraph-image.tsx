import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Contact Sein Wut Hmon Group";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Contact",
    title: "Reach the head office.",
    photoPath: "images/legacy/distribution-map.jpg",
  });
}
