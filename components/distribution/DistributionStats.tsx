"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Stat = {
  value: number;
  label: string;
};

const STATS: Stat[] = [
  { value: 14, label: "Branch offices" },
  { value: 145, label: "Vehicles" },
  { value: 80, label: "Motorcycles" },
  { value: 250, label: "Employees" },
];

export function DistributionStats() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([]);

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
          if (el) el.textContent = stat.value.toLocaleString();
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
              el.textContent = Math.round(proxy.v).toLocaleString();
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
      aria-label="Distribution key statistics"
      className="relative overflow-hidden border-y border-border/60 bg-bg-elev"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 80% at 0% 50%, rgba(0,173,238,0.06), transparent 60%), radial-gradient(ellipse 50% 80% at 100% 50%, rgba(96,165,250,0.04), transparent 60%)",
        }}
      />
      <div
        ref={containerRef}
        className="relative mx-auto grid max-w-[1280px] grid-cols-2 gap-y-14 gap-x-8 px-6 py-24 md:grid-cols-4 md:gap-10 md:px-10 md:py-32"
      >
        {STATS.map((stat, i) => (
          <div key={stat.label} className="group text-left">
            <div
              className="flex items-baseline font-display font-medium text-accent tabular-nums tracking-[-0.03em]"
              style={{ fontSize: "clamp(3.25rem, 6vw, 5.5rem)", lineHeight: 1 }}
            >
              <span
                ref={(el) => {
                  numberRefs.current[i] = el;
                }}
              >
                0
              </span>
            </div>
            <div
              aria-hidden="true"
              className="mt-3.5 h-px w-full"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,173,238,0.4), transparent)",
              }}
            />
            <div className="mt-4 text-subheading text-text-muted transition-colors duration-200 group-hover:text-text">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DistributionStats;
