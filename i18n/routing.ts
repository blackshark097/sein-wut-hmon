import { defineRouting } from "next-intl/routing";

/**
 * Central routing config for next-intl. Shared between the proxy (Next.js 16
 * renamed middleware.ts to proxy.ts), navigation helpers in
 * `i18n/navigation.ts`, and the request-scoped config in `i18n/request.ts`.
 *
 * Locales:
 *   - en: English, the default. Most legacy content on seinwuthmon.com is EN.
 *   - my: Burmese. ISO 639-1 for Myanmar (Burmese) is `my`; we keep the short
 *     code in routes/messages. The visible pill still reads "MM" per brand
 *     preference, but the URL locale stays `my` so it matches the `html lang`
 *     attribute and what most tooling expects.
 *
 * Prefix strategy: `always`. Every URL carries its locale segment, so the
 * homepage is `/en` and the Burmese variant is `/my`. Root `/` redirects to
 * `/en`. `localeDetection: false` stops next-intl from auto-redirecting to
 * `/my` based on the visitor's Accept-Language header: we always land new
 * visitors on English and let them opt in to Burmese via the EN/MM toggle.
 */
export const routing = defineRouting({
  locales: ["en", "my"] as const,
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
