import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { CompanyOverview } from "@/components/about/CompanyOverview";
import { Timeline } from "@/components/about/Timeline";
import { EntityStructure } from "@/components/about/EntityStructure";
import { Leadership } from "@/components/about/Leadership";

export const metadata: Metadata = {
  title: "About, Sein Wut Hmon Group",
  description:
    "Sein Wut Hmon Group, a Myanmar conglomerate building essential industries in food, fisheries, industrial supply, and nationwide distribution.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyOverview />
      <Timeline />
      <EntityStructure />
      <Leadership />
    </>
  );
}
