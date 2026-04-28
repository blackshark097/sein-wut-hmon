"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

gsap.registerPlugin(ScrollTrigger);

const BANNERS = [
  { key: "distribution", href: "/distribution" },
  { key: "fisheries", href: "/fisheries" },
  { key: "fertilizer", href: "/fertilizer" },
] as const;

export function BusinessPillars() {
  const containerRef = useRef<HTMLElement | null>(null);
  const t = useTranslations("home.portfolio");

  useGSAP(
    () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const root = containerRef.current;
      if (!root) return;

      const banners = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(".swh-pf-banner"),
      );
      banners.forEach((banner, index) => {
        gsap.from(banner, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: index * 0.08,
          scrollTrigger: {
            trigger: banner,
            start: "top 92%",
            once: true,
          },
        });
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative bg-bg"
    >
      {/* Intro */}
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-border px-6 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:items-end lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-3.5 font-sans text-xs font-medium uppercase tracking-[0.32em] text-accent before:block before:h-px before:w-7 before:bg-accent">
            {t("eyebrow")}
          </p>
          <h2
            id="portfolio-heading"
            className="mt-9 font-display font-normal leading-[0.98] tracking-[-0.035em] text-text"
            style={{ fontSize: "clamp(3rem, 7.5vw, 6rem)", maxWidth: "14ch" }}
          >
            {t.rich("headline", {
              em: (chunks) => (
                <span className="text-text-muted">{chunks}</span>
              ),
            })}
          </h2>
        </div>
        <p className="relative max-w-[44ch] text-lg leading-relaxed text-text-muted before:mb-6 before:block before:h-px before:w-10 before:bg-[#2a3548] lg:self-end lg:pb-3">
          {t("subhead")}
        </p>
      </div>

      {/* Banners */}
      <div className="flex flex-col">
        {BANNERS.map((banner, index) => {
          const idx = String(index + 1).padStart(2, "0");
          return (
            <Link
              key={banner.key}
              href={banner.href}
              className="swh-pf-banner group relative grid grid-cols-1 items-center gap-10 overflow-hidden border-b border-border px-6 pb-16 pt-14 md:px-10 lg:h-[50vh] lg:min-h-[460px] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.66fr)] lg:gap-16 lg:px-20"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none font-sans font-black leading-none text-transparent md:right-8 lg:right-12"
                style={{
                  fontSize: "clamp(180px, 28vw, 360px)",
                  WebkitTextStroke: "1.5px rgba(0,173,238,0.45)",
                  letterSpacing: "-0.02em",
                  zIndex: 0,
                }}
              >
                {idx}
              </span>
              <div className="relative z-10">
                <span className="inline-block transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3">
                  <h3
                    className="relative inline-block font-display font-normal leading-[0.96] tracking-[-0.035em] text-text after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-[450ms] after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:after:scale-x-100"
                    style={{ fontSize: "clamp(2.75rem, 7vw, 5.75rem)" }}
                  >
                    {t.rich(`banners.${banner.key}.name`, {
                      em: (chunks) => (
                        <span className="text-text-muted transition-colors duration-[350ms] group-hover:text-text">
                          {chunks}
                        </span>
                      ),
                      br: () => <br />,
                    })}
                  </h3>
                </span>
              </div>
              <div className="relative z-10 flex max-w-[44ch] flex-col items-start gap-7">
                <span className="inline-flex items-center gap-2.5 font-sans text-[10px] uppercase tracking-[0.24em] text-[#CBD5E1] before:block before:h-1 before:w-1 before:rounded-full before:bg-[#CBD5E1]">
                  {t(`banners.${banner.key}.eyebrow`)}
                </span>
                <p className="text-[17px] font-light leading-relaxed text-text-muted">
                  {t(`banners.${banner.key}.blurb`)}
                </p>
                <span className="inline-flex items-center gap-3.5 font-sans text-xs font-medium uppercase tracking-[0.24em] text-accent">
                  {t("exploreLabel")}
                  <span
                    aria-hidden="true"
                    className="relative block h-px w-7 bg-accent transition-[width] duration-300 ease-out group-hover:w-11"
                  >
                    <span className="absolute -top-[3px] right-0 block h-[7px] w-[7px] origin-right rotate-45 border-r border-t border-accent" />
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default BusinessPillars;
