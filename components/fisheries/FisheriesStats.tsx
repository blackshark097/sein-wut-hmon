"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type StatKey = "vessels" | "assetBase" | "coastline" | "since";

type StatConfig = {
  key: StatKey;
  value: number;
  prefix?: string;
  unit?: string;
  hasPreLabel?: boolean;
  noGroup?: boolean;
};

const STATS: StatConfig[] = [
  { key: "vessels", value: 20 },
  { key: "assetBase", value: 10, prefix: "$", unit: "M" },
  { key: "coastline", value: 2832, unit: "km" },
  { key: "since", value: 2000, hasPreLabel: true, noGroup: true },
];

const formatValue = (n: number, noGroup?: boolean) =>
  noGroup ? String(n) : n.toLocaleString();

export function FisheriesStats() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const t = useTranslations("fisheries.stats");

  useGSAP(
    () => {
      const trigger = containerRef.current;
      if (!trigger) return;

      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        STATS.forEach((stat, i) => {
          const el = numberRefs.current[i];
          if (el) el.textContent = formatValue(stat.value, stat.noGroup);
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger, start: "top 80%", once: true },
      });

      STATS.forEach((stat, i) => {
        const el = numberRefs.current[i];
        if (!el) return;
        const proxy = { v: 0 };
        tl.to(
          proxy,
          {
            v: stat.value,
            duration: 2.2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = formatValue(Math.round(proxy.v), stat.noGroup);
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
      className="relative overflow-hidden border-y border-border/60 bg-bg-elev"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 80% at 0% 50%, rgba(96,165,250,0.05), transparent 60%), radial-gradient(ellipse 50% 80% at 100% 50%, rgba(0,173,238,0.04), transparent 60%)",
        }}
      />
      <div
        ref={containerRef}
        className="relative mx-auto grid max-w-[1280px] grid-cols-2 gap-y-14 gap-x-8 px-6 py-24 md:gap-x-10 md:gap-y-16 md:px-10 md:py-32 lg:grid-cols-4"
      >
        {STATS.map((stat, i) => (
          <div key={stat.key} className="group min-w-0 text-left">
            <div
              className="flex min-w-0 items-baseline gap-1 font-display font-medium text-gold tabular-nums tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4.25rem)", lineHeight: 1 }}
            >
              {stat.hasPreLabel ? (
                <span
                  className="font-display font-normal italic opacity-85"
                  style={{ fontSize: "0.6em", marginRight: 6 }}
                >
                  {t(`items.${stat.key}.preLabel`)}
                </span>
              ) : null}
              {stat.prefix ? (
                <span
                  style={{
                    fontSize: "0.5em",
                    marginRight: 2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {stat.prefix}
                </span>
              ) : null}
              <span
                ref={(el) => {
                  numberRefs.current[i] = el;
                }}
              >
                0
              </span>
              {stat.unit ? (
                <span
                  className="font-display font-normal italic text-gold opacity-80"
                  style={{
                    fontSize: "0.45em",
                    marginLeft: 6,
                    letterSpacing: 0,
                  }}
                >
                  {stat.unit}
                </span>
              ) : null}
            </div>
            <div
              aria-hidden="true"
              className="mt-3.5 h-px w-full"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,173,238,0.35), transparent)",
              }}
            />
            <div className="mt-4 text-subheading text-text-muted transition-colors duration-200 group-hover:text-text">
              {t(`items.${stat.key}.label`)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FisheriesStats;
