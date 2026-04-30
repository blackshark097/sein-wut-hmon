"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type StatKey = "employees" | "vessels" | "branches" | "vehicles";

type StatConfig = {
  key: StatKey;
  value: number;
  suffix: string;
};

const STATS: StatConfig[] = [
  { key: "employees", value: 250, suffix: "+" },
  { key: "vessels", value: 20, suffix: "" },
  { key: "branches", value: 14, suffix: "" },
  { key: "vehicles", value: 145, suffix: "+" },
];

export function Stats() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const t = useTranslations("home.stats");

  useGSAP(
    () => {
      const trigger = containerRef.current;
      if (!trigger) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        STATS.forEach((stat, index) => {
          const el = numberRefs.current[index];
          if (el) el.textContent = stat.value.toLocaleString();
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top 80%",
          once: true,
        },
      });

      STATS.forEach((stat, index) => {
        const el = numberRefs.current[index];
        if (!el) return;
        const proxy = { val: 0 };
        tl.to(
          proxy,
          {
            val: stat.value,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = Math.round(proxy.val).toLocaleString();
            },
          },
          0,
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      aria-label={t("ariaLabel")}
      className="relative border-y border-border/60 bg-bg-elev"
    >
      <div
        ref={containerRef}
        className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-24"
      >
        <div className="mb-16 max-w-3xl md:mb-20">
          <span className="inline-flex items-center gap-3.5 font-sans text-xs font-medium uppercase tracking-[0.32em] text-accent before:block before:h-px before:w-7 before:bg-accent">
            {t("eyebrow")}
          </span>
          <h2 className="mt-5 font-display text-4xl font-medium tracking-[-0.02em] text-text md:text-5xl lg:text-6xl">
            {t.rich("heading", {
              em: (chunks) => (
                <em className="font-normal italic text-accent">{chunks}</em>
              ),
            })}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-x-12">
          {STATS.map((stat, index) => {
            const label = t(`items.${stat.key}`);
            return (
              <div
                key={stat.key}
                aria-label={`${stat.value}${stat.suffix} ${label}`}
                className="group flex flex-col gap-2 text-center md:text-left"
              >
                <div className="font-display text-gold text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight tabular-nums">
                  <span
                    ref={(el) => {
                      numberRefs.current[index] = el;
                    }}
                  >
                    0
                  </span>
                  {stat.suffix ? (
                    <span className="font-display text-gold">
                      {stat.suffix}
                    </span>
                  ) : null}
                </div>
                <div className="mt-3 text-subheading text-text-muted transition-colors duration-200 group-hover:text-text">
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Stats;
