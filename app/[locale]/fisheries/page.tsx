import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FisheriesHero } from "@/components/fisheries/FisheriesHero";
import { FisheriesOverview } from "@/components/fisheries/FisheriesOverview";
import { FisheriesStats } from "@/components/fisheries/FisheriesStats";
import { FisheriesOperations } from "@/components/fisheries/FisheriesOperations";
import { FisheriesCta } from "@/components/fisheries/FisheriesCta";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.fisheries" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function FisheriesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <FisheriesHero />
      <FisheriesOverview />
      <FisheriesStats />
      <FisheriesOperations />
      <FisheriesCta />
    </>
  );
}
