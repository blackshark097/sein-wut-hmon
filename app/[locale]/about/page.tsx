import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AboutHero } from "@/components/about/AboutHero";
import { CompanyOverview } from "@/components/about/CompanyOverview";
import { Timeline } from "@/components/about/Timeline";
import { EntityStructure } from "@/components/about/EntityStructure";
import { Leadership } from "@/components/about/Leadership";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale as Locale, "about");
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
