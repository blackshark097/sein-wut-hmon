import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { DistributionHero } from "@/components/distribution/DistributionHero";
import { DistributionOverview } from "@/components/distribution/DistributionOverview";
import { DistributionStats } from "@/components/distribution/DistributionStats";
import { DistributionOperations } from "@/components/distribution/DistributionOperations";
import { DistributionBrand } from "@/components/distribution/DistributionBrand";
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
      <DistributionBrand
        i18nNamespace="distribution.hisense"
        logoSrc="/images/distribution/hisense-truck.jpg"
        logoWidth={854}
        logoHeight={641}
        imageMode="photo"
        headingId="distribution-hisense-heading"
      />
      <DistributionBrand
        i18nNamespace="distribution.skechers"
        logoSrc="/images/partners/skechers.png"
        logoWidth={800}
        logoHeight={404}
        headingId="distribution-skechers-heading"
      />
      <DistributionBrand
        i18nNamespace="distribution.ok"
        logoSrc="/images/distribution/ok-truck.jpg"
        logoWidth={640}
        logoHeight={854}
        imageMode="photo"
        headingId="distribution-ok-heading"
      />
      <DistributionBrand
        i18nNamespace="distribution.nasa"
        logoSrc="/images/distribution/nasa-truck.jpg"
        logoWidth={854}
        logoHeight={643}
        imageMode="photo"
        headingId="distribution-nasa-heading"
      />
      <DistributionOperations />
    </>
  );
}
