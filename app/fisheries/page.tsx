import type { Metadata } from "next";
import { FisheriesHero } from "@/components/fisheries/FisheriesHero";
import { FisheriesOverview } from "@/components/fisheries/FisheriesOverview";
import { FisheriesStats } from "@/components/fisheries/FisheriesStats";
import { FisheriesOperations } from "@/components/fisheries/FisheriesOperations";
import { FisheriesCta } from "@/components/fisheries/FisheriesCta";

export const metadata: Metadata = {
  title: "Fisheries, Sein Wut Hmon Group",
  description:
    "One of Myanmar's most established commercial fishing fleets. Twenty vessels, ten million in assets, export-capable operations across a 2,832 km coastline.",
};

export default function FisheriesPage() {
  return (
    <>
      <FisheriesHero />
      <FisheriesOverview />
      <FisheriesStats />
      <FisheriesOperations />
      <FisheriesCta />
    </>
  );
}
