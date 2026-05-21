import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const activeLocale = useLocale() as Locale;
  const pathname = usePathname();

  return (
    <footer
      role="contentinfo"
      className="w-full bg-bg py-8 md:py-10"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="flex items-center gap-6">
            <Image
              src="/images/swh-logo.png"
              alt={t("logoAlt")}
              width={157}
              height={105}
              className="h-10 w-auto shrink-0 object-contain"
            />
            <div className="flex flex-col gap-1">
              <p className="font-display text-base leading-tight text-text">
                {t("brand")}
              </p>
              <p className="text-caption">{t("address")}</p>
              <p className="text-caption">
                <a
                  href="tel:+959954326116"
                  className="transition-colors hover:text-text"
                >
                  {t("phone")}
                </a>
              </p>
              <p className="text-caption">
                <a
                  href="mailto:nwa@swh.com.mm"
                  className="transition-colors hover:text-text"
                >
                  {t("email")}
                </a>
              </p>
            </div>
          </div>

          <div
            role="group"
            aria-label={tNav("languageCurrent", {
              language: tNav(`languages.${activeLocale}`),
            })}
            className="flex items-center gap-3 font-sans text-xs font-medium tracking-[0.12em]"
          >
            {routing.locales.map((candidate, index) => {
              const isActive = candidate === activeLocale;
              const short = tNav(`languageShort.${candidate}`);
              return (
                <span key={candidate} className="contents">
                  {isActive ? (
                    <span aria-current="true" className="text-accent">
                      {short}
                    </span>
                  ) : (
                    <Link
                      href={pathname}
                      locale={candidate}
                      title={tNav("languageSwitchTo", {
                        language: tNav(`languages.${candidate}`),
                      })}
                      className="text-text-muted transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {short}
                    </Link>
                  )}
                  {index === 0 && (
                    <span
                      aria-hidden="true"
                      className="text-text-muted/40"
                    >
                      /
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        <div className="mt-6 border-t border-border/40 pt-4">
          <p className="text-caption">{t("copyright", { year })}</p>
        </div>
      </div>
    </footer>
  );
}
