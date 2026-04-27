import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:locale(en|my)/industrial-inputs",
        destination: "/:locale/fertilizer",
        permanent: true,
      },
      {
        source: "/industrial-inputs",
        destination: "/fertilizer",
        permanent: true,
      },
    ];
  },
};

// Points next-intl at our request-scoped config. The default path is
// `./i18n/request.ts`, which matches our layout so no argument is needed.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
