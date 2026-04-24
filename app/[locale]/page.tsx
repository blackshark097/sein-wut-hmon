import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { CompanyIntro } from "@/components/home/CompanyIntro";
import { BusinessPillars } from "@/components/home/BusinessPillars";
import { Stats } from "@/components/home/Stats";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.home" });
  return {
    title: t("title"),
    description: t("description"),
  };
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
    </>
  );
}
