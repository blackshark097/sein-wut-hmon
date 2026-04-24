import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CsrHero from "@/components/csr/CsrHero";
import CsrOverview from "@/components/csr/CsrOverview";
import Initiatives from "@/components/csr/Initiatives";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.csr" });
  return {
    title: t("title"),
    description: t("description"),
  };
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
