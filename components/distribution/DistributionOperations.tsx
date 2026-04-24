"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Op = {
  num: string;
  eyebrow: string;
  title: string;
  body: string;
  meta: string;
};

const OPS: Op[] = [
  {
    num: "01",
    eyebrow: "Network",
    title: "Branch Network",
    body: "Fourteen offices across Lower and Upper Myanmar, positioned to reach population centers from Yangon to Mandalay, with last-mile coverage into secondary cities and townships.",
    meta: "14 Offices · Nationwide",
  },
  {
    num: "02",
    eyebrow: "Fleet",
    title: "Fleet Capacity",
    body: "A combined fleet of one hundred forty-five vehicles and eighty motorcycles, scaled for the realities of Myanmar's road network and sized to handle cold chain, dry goods, and industrial distribution in parallel.",
    meta: "145 Vehicles · 80 Motorcycles",
  },
  {
    num: "03",
    eyebrow: "Categories",
    title: "Category Breadth",
    body: "Consumer electronics, food and beverage imports, industrial lubricants, and specialty retail. Each category supported by dedicated trade teams with product expertise.",
    meta: "4 Trade Categories",
  },
  {
    num: "04",
    eyebrow: "Partnerships",
    title: "Partner Relationships",
    body: "Long-term partnerships with international brands seeking reliable, compliant, nationwide distribution in Myanmar, backed by documented performance and regulatory coverage.",
    meta: "International · Long-term",
  },
];

export function DistributionOperations() {
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
        root.querySelectorAll(".swh-dist-card"),
      );
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        });
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: containerRef },
  );

  return (
    <section
      aria-labelledby="distribution-ops-heading"
      className="relative bg-bg py-32 md:py-44"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="mb-16 max-w-xl md:mb-20">
          <span className="inline-flex items-center gap-3.5 text-subheading text-accent before:block before:h-px before:w-7 before:bg-accent">
            Operations
          </span>
          <h2
            id="distribution-ops-heading"
            className="mt-5 font-display font-medium tracking-[-0.02em] text-text"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.08 }}
          >
            A network built for the whole country.
          </h2>
          <p className="mt-5 max-w-lg text-body text-text-muted">
            Four connected capabilities that turn international product into
            nationwide availability.
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
        >
          {OPS.map((op) => (
            <article
              key={op.num}
              className="swh-dist-card group relative flex min-h-[380px] flex-col overflow-hidden border border-border/70 bg-bg-elev px-10 pt-12 pb-11 transition duration-500 hover:-translate-y-1 hover:border-accent/55 hover:bg-[#131c2f] hover:shadow-[0_0_0_1px_rgba(0,173,238,0.25),0_30px_60px_-20px_rgba(0,173,238,0.18)]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse 60% 60% at 100% 0%, rgba(0,173,238,0.16), transparent 60%), radial-gradient(ellipse 80% 40% at 0% 100%, rgba(96,165,250,0.06), transparent 65%)",
                }}
              />

              <span
                aria-hidden="true"
                className="absolute right-8 top-9 font-display italic text-accent/30 transition-all duration-500 group-hover:text-accent"
                style={{
                  fontSize: 48,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {op.num}
              </span>

              <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent before:block before:h-px before:w-6 before:bg-accent">
                {op.eyebrow}
              </span>
              <h3
                className="mt-5 max-w-[14ch] font-display font-medium tracking-[-0.02em] text-text"
                style={{
                  fontSize: "clamp(1.75rem, 2.5vw, 2.375rem)",
                  lineHeight: 1.1,
                }}
              >
                {op.title}
              </h3>
              <p className="mt-5 max-w-[44ch] text-[15.5px] leading-relaxed text-text-muted">
                {op.body}
              </p>

              <div className="mt-auto flex items-center justify-between pt-9 text-[11px] uppercase tracking-[0.16em] text-text-muted">
                <span>{op.meta}</span>
                <span className="inline-flex items-center gap-2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent">
                  Detail
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DistributionOperations;
