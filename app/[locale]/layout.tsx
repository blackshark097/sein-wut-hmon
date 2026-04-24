import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { fontDisplay, fontSans } from "../fonts";
import { Layout } from "@/components/Layout";
import { routing } from "@/i18n/routing";
import "../globals.css";

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
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
 * Generate locale-aware <title>/<description> so shared crawlers get the
 * right language. Individual pages can still override this.
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
  return {
    title: t("siteName"),
    description: t("defaultDescription"),
  };
}

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
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${fontDisplay.variable} ${fontSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text font-sans">
        <NextIntlClientProvider locale={locale}>
          <Layout>{children}</Layout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
