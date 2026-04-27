import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { fontDisplay, fontSans } from "../fonts";
import { Layout } from "@/components/Layout";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";
import "../globals.css";

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
  themeColor: "#0a0f1c",
  width: "device-width",
  initialScale: 1,
};

/**
 * Pre-generate both locale variants at build time so the static export still
 * works. Without this, requests for unknown locales would only surface the
 * `notFound()` branch at runtime.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Layout-level metadata: site name, default description, and the absolute
 * base URL that page-level metadata uses to resolve canonical/OG URLs.
 * Individual pages override title/description and add their own OG image.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const siteName = t("siteName");
  const description = t("defaultDescription");
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: siteName,
      template: `%s`,
    },
    description,
    applicationName: siteName,
    manifest: "/manifest.webmanifest",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sein Wut Hmon Group",
  url: SITE_URL,
  logo: `${SITE_URL}/images/legacy/logo.png`,
  email: "nwa@swh.com.mm",
  telephone: "+95-9-73126116",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "No-24, Phan Chat Won U Shwe Ohh St., Industrial Zone (2), Hlaing Thar Yar Township",
    addressLocality: "Yangon",
    addressCountry: "MM",
  },
  sameAs: [],
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  // Reject unsupported locales before loading any messages.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enables static rendering for every nested page that calls
  // useTranslations/getTranslations. Must run before any next-intl hook.
  setRequestLocale(locale as Locale);

  return (
    <html
      lang={locale}
      className={`${fontDisplay.variable} ${fontSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text font-sans">
        <NextIntlClientProvider locale={locale}>
          <Layout>{children}</Layout>
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          // JSON.stringify avoids HTML-injection risk; keys are static.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
      </body>
    </html>
  );
}
