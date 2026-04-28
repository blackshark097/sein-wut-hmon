import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { CompanyIntro } from "@/components/home/CompanyIntro";
import { BusinessPillars } from "@/components/home/BusinessPillars";
import { Stats } from "@/components/home/Stats";
import { Brands } from "@/components/home/Brands";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale as Locale, "home");
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  // Static-rendering opt-in. Safe to call per-page; cheap and idempotent.
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <CompanyIntro />
      <BusinessPillars />
      <Stats />
      <Brands />
    </>
  );
}
