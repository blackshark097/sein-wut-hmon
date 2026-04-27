import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Fisheries, Sein Wut Hmon Group";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Fisheries",
    title: "A coastline of 2,832 km. A fleet built to work it.",
    photoPath: "images/fisheries/vessel-port.jpg",
  });
}
