"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type NavKey =
  | "home"
  | "about"
  | "fisheries"
  | "distribution"
  | "fertilizer"
  | "csr"
  | "contact";

const NAV_LINKS: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "distribution", href: "/distribution" },
  { key: "fisheries", href: "/fisheries" },
  { key: "fertilizer", href: "/fertilizer" },
  { key: "csr", href: "/csr" },
  { key: "contact", href: "/contact" },
];

export function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const t = useTranslations("Navigation");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const desktopToggleRef = useRef<HTMLButtonElement | null>(null);
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef(false);

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Close on Escape while the overlay is open.
  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  // Return focus to the toggle that opened the menu after it closes.
  useEffect(() => {
    if (!menuOpen && wasOpenRef.current && lastTriggerRef.current) {
      lastTriggerRef.current.focus();
    }
    wasOpenRef.current = menuOpen;
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const toggleFromDesktop = () => {
    lastTriggerRef.current = desktopToggleRef.current;
    setMenuOpen((value) => !value);
  };

  const toggleFromMobile = () => {
    lastTriggerRef.current = mobileToggleRef.current;
    setMenuOpen((value) => !value);
  };

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      return;
    }
    router.replace(pathname, { locale: nextLocale });
  };

  const linkInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 24 };
  const linkAnimate = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0 };
  const linkExit = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 12 };

  return (
    <>
      {/* Desktop sidebar (>=lg). 80px wide, full viewport height, 1px right border. */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-20 flex-col items-center border-r border-border bg-bg lg:flex">
        <Link
          href="/"
          onClick={closeMenu}
          aria-label={t("logoLinkLabel")}
          className="flex h-24 w-full items-center justify-center border-b border-border focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
        >
          <Image
            src="/images/legacy/logo.png"
            alt={t("logoAlt")}
            width={157}
            height={105}
            priority
            className="h-[52px] w-auto object-contain"
          />
        </Link>

        <button
          ref={desktopToggleRef}
          type="button"
          onClick={toggleFromDesktop}
          aria-label={menuOpen ? t("menuClose") : t("menuOpen")}
          aria-expanded={menuOpen}
          className="relative flex w-full flex-1 cursor-pointer items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
        >
          <span className="flex -rotate-90 flex-col items-center gap-[18px] origin-center">
            <span
              className={`whitespace-nowrap font-sans text-[11px] font-semibold uppercase transition-colors duration-200 ${
                menuOpen ? "text-accent" : "text-text"
              }`}
              style={{ letterSpacing: "0.32em" }}
            >
              {menuOpen ? t("sidebarMenuClose") : t("sidebarMenuOpen")}
            </span>
            <span
              aria-hidden="true"
              className={`relative block h-px w-7 bg-text transition-transform duration-300 ${
                menuOpen ? "rotate-180" : ""
              }`}
            >
              <span className="absolute right-0 top-0 block h-px w-2 origin-right rotate-[35deg] bg-text" />
              <span className="absolute right-0 top-0 block h-px w-2 origin-right -rotate-[35deg] bg-text" />
            </span>
          </span>
        </button>

        <div
          role="group"
          aria-label={t("languageCurrent", {
            language: t(`languages.${locale}`),
          })}
          className="flex w-full flex-col items-center gap-1 border-t border-border py-5"
        >
          {routing.locales.map((candidate, index) => {
            const isActive = candidate === locale;
            return (
              <span key={candidate} className="contents">
                <button
                  type="button"
                  onClick={() => switchLocale(candidate)}
                  aria-current={isActive ? "true" : undefined}
                  title={
                    isActive
                      ? t("languageCurrent", {
                          language: t(`languages.${candidate}`),
                        })
                      : t("languageSwitchTo", {
                          language: t(`languages.${candidate}`),
                        })
                  }
                  className={`px-1 py-1.5 font-sans text-xs font-medium tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    isActive
                      ? "text-accent"
                      : "text-text-muted/70 hover:text-text"
                  }`}
                >
                  {t(`languageShort.${candidate}`)}
                </button>
                {index === 0 && (
                  <span
                    aria-hidden="true"
                    className="my-0.5 block h-px w-3.5 bg-border"
                  />
                )}
              </span>
            );
          })}
        </div>
      </aside>

      {/* Mobile top bar (<lg). 64px tall, fixed across the top. */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-bg/70 px-5 backdrop-blur-md lg:hidden">
        <Link
          href="/"
          onClick={closeMenu}
          aria-label={t("logoLinkLabel")}
          className="inline-flex items-center"
        >
          <Image
            src="/images/legacy/logo.png"
            alt={t("logoAlt")}
            width={157}
            height={105}
            priority
            className="h-11 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-3">
          <div
            role="group"
            aria-label={t("languageCurrent", {
              language: t(`languages.${locale}`),
            })}
            className="inline-flex items-center rounded-full border border-border p-1 font-sans text-[11px] font-medium tracking-[0.1em]"
          >
            {routing.locales.map((candidate) => {
              const isActive = candidate === locale;
              return (
                <button
                  key={candidate}
                  type="button"
                  onClick={() => switchLocale(candidate)}
                  aria-current={isActive ? "true" : undefined}
                  title={
                    isActive
                      ? t("languageCurrent", {
                          language: t(`languages.${candidate}`),
                        })
                      : t("languageSwitchTo", {
                          language: t(`languages.${candidate}`),
                        })
                  }
                  className={`rounded-full px-2 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    isActive
                      ? "bg-bg-elev text-accent"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {t(`languageShort.${candidate}`)}
                </button>
              );
            })}
          </div>

          <button
            ref={mobileToggleRef}
            type="button"
            onClick={toggleFromMobile}
            aria-label={menuOpen ? t("menuClose") : t("menuOpen")}
            aria-expanded={menuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-transparent text-text transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {menuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* Shared overlay menu. Covers content area; sidebar/top bar stay visible. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="swh-nav-overlay"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-bg/95 backdrop-blur-xl lg:left-20 lg:top-0"
            role="dialog"
            aria-modal="true"
            aria-label={t("dialogLabel")}
          >
            <nav
              aria-label={t("primaryLabel")}
              className="relative h-full overflow-y-auto px-6 py-10 md:px-12 md:py-16 lg:px-14 lg:py-20"
            >
              <ul className="mx-auto flex w-full max-w-5xl flex-col">
                {NAV_LINKS.map((link, index) => {
                  const idx = String(index + 1).padStart(2, "0");
                  return (
                    <motion.li
                      key={link.href}
                      initial={prefersReducedMotion ? false : linkInitial}
                      animate={linkAnimate}
                      exit={prefersReducedMotion ? linkAnimate : linkExit}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        delay: prefersReducedMotion ? 0 : 0.08 + index * 0.05,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="group grid grid-cols-[40px_1fr] items-baseline gap-x-4 border-b border-white/5 py-4 transition-transform duration-300 hover:translate-x-1 focus-visible:translate-x-1 focus-visible:outline-none md:grid-cols-[56px_1fr] md:gap-x-6 md:py-5"
                      >
                        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-text-muted/70 md:pt-3">
                          {idx}
                        </span>
                        <span className="relative inline-block font-display text-3xl font-normal leading-[1.05] tracking-[-0.025em] text-text after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-500 group-hover:after:w-full group-focus-visible:after:w-full md:text-5xl lg:text-[56px]">
                          {t(`links.${link.key}`)}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
