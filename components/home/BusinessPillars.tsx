"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

gsap.registerPlugin(ScrollTrigger);

type PillarKey = "fisheries" | "distribution" | "industrialInputs" | "csr";

type PillarConfig = {
  key: PillarKey;
  href: string;
  image: string | null;
  placeholder?: { gradient: string; initial: string };
};

const PILLARS: PillarConfig[] = [
  {
    key: "fisheries",
    href: "/fisheries",
    image: null,
    placeholder: {
      gradient: "from-[#071a2e] via-[#0b2a47] to-[#020814]",
      initial: "F",
    },
  },
  {
    key: "distribution",
    href: "/distribution",
    image: "/images/legacy/distribution-map.jpg",
  },
  {
    key: "industrialInputs",
    href: "/industrial-inputs",
    image: "/images/legacy/fertilizer-intro.jpg",
  },
  {
    key: "csr",
    href: "/csr",
    image:
      "/images/legacy/school-donation-north-shanstate-lasho-20150717-full.jpg",
  },
];

export function BusinessPillars() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("home.pillars");

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

      const cards = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(".swh-pillar-card"),
      );
      if (!cards.length) return;

      cards.forEach((card, index) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: index * 0.08,
          scrollTrigger: {
            trigger: card,
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
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative bg-bg py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div>
          <p className="text-subheading text-gold">{t("eyebrow")}</p>
          <h2 id="portfolio-heading" className="text-heading mt-3">
            {t("heading")}
          </h2>
          <p className="text-body max-w-2xl mt-4">{t("intro")}</p>
        </div>

        <div
          ref={containerRef}
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {PILLARS.map((pillar) => {
            const name = t(`items.${pillar.key}.name`);
            const blurb = t(`items.${pillar.key}.blurb`);
            return (
              <Link
                key={pillar.key}
                href={pillar.href}
                className="swh-pillar-card group relative overflow-hidden rounded-lg border border-border/60 bg-bg-elev transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_0_0_1px_rgba(0,173,238,0.25),0_24px_60px_-20px_rgba(0,173,238,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <div className="relative block w-full aspect-[4/3]">
                  {pillar.image ? (
                    <Image
                      src={pillar.image}
                      alt={name}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${pillar.placeholder?.gradient ?? "from-surface via-bg-elev to-bg"}`}
                        aria-hidden="true"
                      />
                      <span
                        className="absolute inset-0 flex items-center justify-center font-display text-gold/40 text-6xl"
                        aria-hidden="true"
                      >
                        {pillar.placeholder?.initial ?? name.charAt(0)}
                      </span>
                    </>
                  )}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent"
                    aria-hidden="true"
                  />
                </div>

                <div className="p-6 md:p-7">
                  <h3 className="font-display text-2xl md:text-3xl text-text tracking-tight leading-tight">
                    {name}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">
                    {blurb}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-gold">
                    {t("exploreLabel")}
                    <ArrowUpRight
                      className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BusinessPillars;
