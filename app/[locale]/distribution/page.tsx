import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { DistributionHero } from "@/components/distribution/DistributionHero";
import { DistributionOverview } from "@/components/distribution/DistributionOverview";
import { DistributionStats } from "@/components/distribution/DistributionStats";
import { DistributionOperations } from "@/components/distribution/DistributionOperations";
import { DistributionPartners } from "@/components/distribution/DistributionPartners";
import { DistributionLubricants } from "@/components/distribution/DistributionLubricants";
import { DistributionCta } from "@/components/distribution/DistributionCta";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale as Locale, "distribution");
}

export default async function DistributionPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <DistributionHero />
      <DistributionOverview />
      <DistributionStats />
      <DistributionOperations />
      <DistributionPartners />
      <DistributionLubricants />
      <DistributionCta />
    </>
  );
}
