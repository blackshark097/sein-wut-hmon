import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

export const SITE_URL = "https://sein-wut-hmon.vercel.app";

export type PageKey =
  | "home"
  | "about"
  | "fisheries"
  | "distribution"
  | "fertilizer"
  | "csr"
  | "contact";

const PAGE_PATHS: Record<PageKey, string> = {
  home: "",
  about: "/about",
  fisheries: "/fisheries",
  distribution: "/distribution",
  fertilizer: "/fertilizer",
  csr: "/csr",
  contact: "/contact",
};

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  my: "my_MM",
};

export function pageUrl(locale: Locale, page: PageKey) {
  return `${SITE_URL}/${locale}${PAGE_PATHS[page]}`;
}

export async function buildPageMetadata(
  locale: Locale,
  page: PageKey
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `Metadata.${page}` });
  const tSite = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("title");
  const description = t("description");
  const url = pageUrl(locale, page);
  const path = `/${locale}${PAGE_PATHS[page]}`;

  const languages: Record<string, string> = {};
  for (const candidate of routing.locales) {
    languages[candidate] = `/${candidate}${PAGE_PATHS[page]}`;
  }
  languages["x-default"] = `/${routing.defaultLocale}${PAGE_PATHS[page]}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages,
    },
    openGraph: {
      type: "website",
      url,
      siteName: tSite("siteName"),
      title,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
