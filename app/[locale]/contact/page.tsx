import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ContactHero from "@/components/contact/ContactHero";
import ContactCta from "@/components/contact/ContactCta";
import ContactForm from "@/components/contact/ContactForm";
import ContactMap from "@/components/contact/ContactMap";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale as Locale, "contact");
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactHero />
      <ContactCta />
      <ContactForm />
      <ContactMap />
    </>
  );
}
