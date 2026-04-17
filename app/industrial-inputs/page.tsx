import type { Metadata } from "next";
import IndustrialHero from "@/components/industrial-inputs/IndustrialHero";
import Products from "@/components/industrial-inputs/Products";

export const metadata: Metadata = {
  title: "Industrial Inputs, Sein Wut Hmon Group",
  description:
    "Fertilizer and lubricants for Myanmar, anchored by the MMF joint venture with Marubeni at Thilawa and the Nasa and Sunoco lubricant lines.",
};

export default function IndustrialInputsPage() {
  return (
    <>
      <IndustrialHero />
      <Products />
    </>
  );
}
