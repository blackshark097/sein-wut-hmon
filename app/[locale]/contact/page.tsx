import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import ContactMap from "@/components/contact/ContactMap";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.contact" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactMap />
    </>
  );
}
