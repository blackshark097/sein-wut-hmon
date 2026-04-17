"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    name: "Food & Agriculture",
    blurb: "Livestock feed, poultry, and veterinary products.",
    href: "/food-agriculture",
    image: "/images/legacy/feed-mill-intro.jpg",
  },
  {
    name: "Fisheries",
    blurb: "Marine harvest from a twenty vessel fleet across Myanmar waters.",
    href: "/fisheries",
    image: "/images/legacy/fishery-intro.jpg",
  },
  {
    name: "Trading & Distribution",
    blurb: "Nationwide reach through 14 branch offices and 145+ vehicles.",
    href: "/distribution",
    image: "/images/legacy/distributing-intro.jpg",
  },
  {
    name: "Industrial Inputs",
    blurb: "Fertilizer, feed ingredients, and industrial raw materials.",
    href: "/industrial-inputs",
    image: "/images/legacy/fertilizer-intro.jpg",
  },
  {
    name: "Hospitality",
    blurb: "Vista Heights, a modern residence in the heart of Yangon.",
    href: "/hospitality",
    image: null,
  },
  {
    name: "CSR",
    blurb: "Schools, disaster relief, and community investment.",
    href: "/csr",
    image:
      "/images/legacy/school-donation-north-shanstate-lasho-20150717-full.jpg",
  },
] as const;

type Pillar = (typeof PILLARS)[number];

export function BusinessPillars() {
  const containerRef = useRef<HTMLDivElement | null>(null);

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

      // Recompute trigger positions once layout has settled so cards already
      // in the viewport on load still progress to opacity 1.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: containerRef }
  );

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative bg-bg py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div>
          <p className="text-subheading text-gold">PORTFOLIO</p>
          <h2 id="portfolio-heading" className="text-heading mt-3">
            Our Portfolio
          </h2>
          <p className="text-body max-w-2xl mt-4">
            Six integrated divisions operating across Myanmar&apos;s essential
            industries, from farm to distribution.
          </p>
        </div>

        <div
          ref={containerRef}
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {PILLARS.map((pillar: Pillar) => (
            <Link
              key={pillar.name}
              href={pillar.href}
              className="swh-pillar-card group relative overflow-hidden rounded-lg border border-border/60 bg-bg-elev transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_0_0_1px_rgba(197,165,78,0.25),0_24px_60px_-20px_rgba(197,165,78,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <div className="relative block w-full aspect-[4/3]">
                {pillar.image ? (
                  <Image
                    src={pillar.image}
                    alt={pillar.name}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-surface via-bg-elev to-bg"
                      aria-hidden="true"
                    />
                    <span
                      className="absolute inset-0 flex items-center justify-center font-display text-gold/40 text-6xl"
                      aria-hidden="true"
                    >
                      VH
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
                  {pillar.name}
                </h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">
                  {pillar.blurb}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-gold">
                  Explore
                  <ArrowUpRight
                    className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BusinessPillars;
