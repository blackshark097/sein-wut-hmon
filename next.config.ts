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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

// Points next-intl at our request-scoped config. The default path is
// `./i18n/request.ts`, which matches our layout so no argument is needed.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
