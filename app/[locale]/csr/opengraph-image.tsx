import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Community, Sein Wut Hmon Group";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Community",
    title: "Investing in the communities where we operate.",
    photoPath: "images/legacy/school-donation-north-shanstate-lasho-20150717-full.jpg",
  });
}
