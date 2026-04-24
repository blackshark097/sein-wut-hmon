import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation primitives. Prefer these over `next/link` and
 * `next/navigation` everywhere inside the app so that the `as-needed` prefix
 * is applied automatically and locale switches round-trip correctly.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
