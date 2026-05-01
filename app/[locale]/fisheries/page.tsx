import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { FisheriesHero } from "@/components/fisheries/FisheriesHero";
import { FisheriesOverview } from "@/components/fisheries/FisheriesOverview";
import { FisheriesStats } from "@/components/fisheries/FisheriesStats";
import { FisheriesGallery } from "@/components/fisheries/FisheriesGallery";
import { FisheriesOperations } from "@/components/fisheries/FisheriesOperations";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale as Locale, "fisheries");
}

export default async function FisheriesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <FisheriesHero />
      <FisheriesOverview />
      <FisheriesStats />
      <FisheriesGallery />
      <FisheriesOperations />
    </>
  );
}
