import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DistributionHero } from "@/components/distribution/DistributionHero";
import { DistributionOverview } from "@/components/distribution/DistributionOverview";
import { DistributionStats } from "@/components/distribution/DistributionStats";
import { DistributionOperations } from "@/components/distribution/DistributionOperations";
import { DistributionPartners } from "@/components/distribution/DistributionPartners";
import { DistributionCta } from "@/components/distribution/DistributionCta";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Metadata.distribution",
  });
  return {
    title: t("title"),
    description: t("description"),
  };
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
      <DistributionCta />
    </>
  );
}
