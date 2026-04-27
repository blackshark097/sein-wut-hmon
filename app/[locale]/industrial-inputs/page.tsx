import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import IndustrialHero from "@/components/industrial-inputs/IndustrialHero";
import Products from "@/components/industrial-inputs/Products";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale as Locale, "industrialInputs");
}

export default async function IndustrialInputsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <IndustrialHero />
      <Products />
    </>
  );
}
