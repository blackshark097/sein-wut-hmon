import type { Metadata } from "next";
import { DistributionHero } from "@/components/distribution/DistributionHero";
import { DistributionOverview } from "@/components/distribution/DistributionOverview";
import { DistributionStats } from "@/components/distribution/DistributionStats";
import { DistributionOperations } from "@/components/distribution/DistributionOperations";
import { DistributionPartners } from "@/components/distribution/DistributionPartners";
import { DistributionCta } from "@/components/distribution/DistributionCta";

export const metadata: Metadata = {
  title: "Trading & Distribution, Sein Wut Hmon Group",
  description:
    "Fourteen branches, one hundred forty-five vehicles, two hundred fifty employees. One of Myanmar's most comprehensive distribution networks, carrying international brands to every region of the country.",
};

export default function DistributionPage() {
  return (
    <>
      <DistributionHero />
      <DistributionOverview />
      <DistributionStats />
      <DistributionOperations />
      <DistributionPartners />
      <DistributionCta />
    </>
  );
}
