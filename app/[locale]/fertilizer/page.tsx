import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import FertilizerHero from "@/components/fertilizer/FertilizerHero";
import FertilizerOverview from "@/components/fertilizer/FertilizerOverview";
import FertilizerReach from "@/components/fertilizer/FertilizerReach";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale as Locale, "fertilizer");
}

export default async function FertilizerPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <FertilizerHero />
      <FertilizerOverview />
      <FertilizerReach />
    </>
  );
}
