import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

// Contact details sourced from content/scraped-content.md (legacy seinwuthmon.com).
// Address and phone are the real values from the legacy site footer.
// Email canonicalized as nwa@swh.com.mm; keep in sync with contact/ContactInfo.tsx.
const PHONE_DISPLAY = "(+959) 73126116";
const PHONE_HREF = "+95973126116";
const EMAIL = "nwa@swh.com.mm";

type ExploreKey =
  | "about"
  | "fisheries"
  | "industrialInputs"
  | "distribution"
  | "csr"
  | "contact";

const exploreLinks: Array<{ href: string; key: ExploreKey }> = [
  { href: "/about", key: "about" },
  { href: "/fisheries", key: "fisheries" },
  { href: "/industrial-inputs", key: "industrialInputs" },
  { href: "/distribution", key: "distribution" },
  { href: "/csr", key: "csr" },
  { href: "/contact", key: "contact" },
];

const subheadingClass = "mb-4 text-xs uppercase tracking-wider text-text-muted";

const linkBaseClass =
  "text-text-muted transition hover:text-text focus-visible:outline focus-visible:outline-gold";

export function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const activeLocale = useLocale() as Locale;
  // usePathname here returns the pathname without the locale prefix, which is
  // exactly what the locale-aware <Link> expects when switching languages.
  const pathname = usePathname();

  return (
    <footer
      role="contentinfo"
      className="w-full border-t border-border bg-bg-elev py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Image
              src="/images/legacy/logo.png"
              alt={t("logoAlt")}
              width={160}
              height={44}
              className="h-auto w-40"
            />
            <p className="font-display text-xl text-text">{t("brand")}</p>
            <p className="text-sm text-text-muted">{t("address")}</p>
          </div>

          {/* Explore column */}
          <nav aria-label={t("navigationLabel")}>
            <h2 className={subheadingClass}>{t("exploreHeading")}</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkBaseClass}>
                    {tNav(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <div>
            <h2 className={subheadingClass}>{t("contactHeading")}</h2>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a href={`tel:${PHONE_HREF}`} className={linkBaseClass}>
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className={linkBaseClass}>
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {/* Language column */}
          <div>
            <h2 className={subheadingClass}>{t("languageHeading")}</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {routing.locales.map((candidate) => {
                const isActive = candidate === activeLocale;
                const label = tNav(`languages.${candidate}`);
                if (isActive) {
                  return (
                    <li key={candidate}>
                      <span aria-current="true" className="text-accent">
                        {label}
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={candidate}>
                    <Link
                      href={pathname}
                      locale={candidate}
                      className={linkBaseClass}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-border/40 pt-8 text-xs text-text-muted md:flex-row">
          <p>{t("copyright", { year })}</p>
          <p>{t("builtIn")}</p>
        </div>
      </div>
    </footer>
  );
}
