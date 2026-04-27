import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "About Sein Wut Hmon Group";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "The Group",
    title: "Our Story",
    photoPath: "images/legacy/distributing-intro.jpg",
  });
}
