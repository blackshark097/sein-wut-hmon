import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import CsrHero from "@/components/csr/CsrHero";
import CsrOverview from "@/components/csr/CsrOverview";
import Initiatives from "@/components/csr/Initiatives";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale as Locale, "csr");
}

export default async function CsrPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <CsrHero />
      <CsrOverview />
      <Initiatives />
    </>
  );
}
