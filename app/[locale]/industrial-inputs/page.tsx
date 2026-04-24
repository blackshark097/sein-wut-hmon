import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import IndustrialHero from "@/components/industrial-inputs/IndustrialHero";
import Products from "@/components/industrial-inputs/Products";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Metadata.industrialInputs",
  });
  return {
    title: t("title"),
    description: t("description"),
  };
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
