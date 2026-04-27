import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";

const PATHS = [
  "",
  "/about",
  "/fisheries",
  "/distribution",
  "/fertilizer",
  "/csr",
  "/contact",
] as const;

const PRIORITY: Record<(typeof PATHS)[number], number> = {
  "": 1,
  "/about": 0.9,
  "/fisheries": 0.9,
  "/distribution": 0.9,
  "/fertilizer": 0.8,
  "/csr": 0.7,
  "/contact": 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => {
      const languages: Record<string, string> = {};
      for (const candidate of routing.locales) {
        languages[candidate] = `${SITE_URL}/${candidate}${path}`;
      }
      languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${path}`;

      return {
        url: `${SITE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: PRIORITY[path],
        alternates: { languages },
      };
    })
  );
}
