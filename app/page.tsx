import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CompanyIntro } from "@/components/home/CompanyIntro";
import { BusinessPillars } from "@/components/home/BusinessPillars";
import { Stats } from "@/components/home/Stats";

export const metadata: Metadata = {
  title: "Sein Wut Hmon Group, Building Myanmar's Essential Industries",
  description:
    "A diversified Myanmar conglomerate operating across marine resources, industrial supply, and nationwide distribution.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CompanyIntro />
      <BusinessPillars />
      <Stats />
    </>
  );
}
