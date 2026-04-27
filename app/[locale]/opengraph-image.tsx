import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Sein Wut Hmon Group, Building Myanmar's Essential Industries";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Sein Wut Hmon Group",
    title: "Building Myanmar's Essential Industries",
    photoPath: "images/fisheries/vessel-port.jpg",
  });
}
