import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
};

// Points next-intl at our request-scoped config. The default path is
// `./i18n/request.ts`, which matches our layout so no argument is needed.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
