import type { Metadata } from "next";
import FoodAgHero from "@/components/food-agriculture/FoodAgHero";
import FoodAgOverview from "@/components/food-agriculture/FoodAgOverview";
import Operations from "@/components/food-agriculture/Operations";

export const metadata: Metadata = {
  title: "Food & Agriculture, Sein Wut Hmon Group",
  description:
    "Livestock feed, poultry, and veterinary products from Sein Wut Hmon Group.",
};

export default function FoodAgriculturePage() {
  return (
    <>
      <FoodAgHero />
      <FoodAgOverview />
      <Operations />
    </>
  );
}
