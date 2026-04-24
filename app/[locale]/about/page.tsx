import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutHero } from "@/components/about/AboutHero";
import { CompanyOverview } from "@/components/about/CompanyOverview";
import { Timeline } from "@/components/about/Timeline";
import { EntityStructure } from "@/components/about/EntityStructure";
import { Leadership } from "@/components/about/Leadership";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.about" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <CompanyOverview />
      <Timeline />
      <EntityStructure />
      <Leadership />
    </>
  );
}
