import type { Metadata } from "next";
import CsrHero from "@/components/csr/CsrHero";
import CsrOverview from "@/components/csr/CsrOverview";
import Initiatives from "@/components/csr/Initiatives";

export const metadata: Metadata = {
  title: "Corporate Social Responsibility, Sein Wut Hmon Group",
  description:
    "How Sein Wut Hmon invests in the communities where it operates, through school support, disaster relief, and long term community development.",
};

export default function CsrPage() {
  return (
    <>
      <CsrHero />
      <CsrOverview />
      <Initiatives />
    </>
  );
}
