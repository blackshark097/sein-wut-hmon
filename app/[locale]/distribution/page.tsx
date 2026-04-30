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
      <DistributionOperations />
      <DistributionBrand
        i18nNamespace="distribution.hisense"
        logoSrc="/images/partners/hisense.png"
        logoWidth={1780}
        logoHeight={291}
        headingId="distribution-hisense-heading"
      />
      <DistributionBrand
        i18nNamespace="distribution.skechers"
        logoSrc="/images/partners/skechers.png"
        logoWidth={1399}
        logoHeight={520}
        headingId="distribution-skechers-heading"
        heroImage={{
          src: "/images/partners/skechers-storefront.jpg",
          width: 800,
          height: 381,
        }}
        reverse
      />
      <DistributionBrand
        i18nNamespace="distribution.ok"
        logoSrc="/images/partners/ok.png"
        logoWidth={163}
        logoHeight={204}
        headingId="distribution-ok-heading"
      />
      <DistributionBrand
        i18nNamespace="distribution.nasa"
        logoSrc="/images/partners/nasa.png"
        logoWidth={1024}
        logoHeight={427}
        headingId="distribution-nasa-heading"
      />
    </>
  );
}
