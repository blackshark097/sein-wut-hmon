import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next.js 16 renamed `middleware.ts` to `proxy.ts`. next-intl still ships as
 * `next-intl/middleware`; the factory is unchanged, only the host file name
 * moved. See node_modules/next/dist/docs/01-app/02-guides/internationalization.md
 * for the new convention.
 */
export default createMiddleware(routing);

export const config = {
  // Match every path except:
  //  - Next.js internals (_next, _vercel)
  //  - API and tRPC routes (none today, but preempt the shape)
  //  - anything with a dot (favicon.ico, static assets, sitemap.xml, etc.)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
