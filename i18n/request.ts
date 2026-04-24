import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * Per-request i18n config. `createNextIntlPlugin` in `next.config.ts` points
 * here. The plugin reads `requestLocale` from the incoming segment params, we
 * validate it against `routing.locales`, then load the matching messages file
 * from `/messages`.
 *
 * If the incoming locale is missing or unsupported we fall back to the
 * default locale (English) rather than 404. The `app/[locale]/layout.tsx`
 * still calls `notFound()` for unknown locales, so this fallback only covers
 * the narrow window where the plugin runs before that guard.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
