"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATS = [
  { value: 250, suffix: "+", label: "Employees across SWH entities" },
  { value: 20, suffix: "", label: "Fishing Vessels" },
  { value: 14, suffix: "", label: "Branch Offices" },
  { value: 145, suffix: "+", label: "Distribution Vehicles" },
] as const;

export function Stats() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([]);

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
      aria-label="Key statistics"
      className="relative border-y border-border/60 bg-bg-elev"
    >
      <div
        ref={containerRef}
        className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-24"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-x-12">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
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
                  <span className="font-display text-gold">{stat.suffix}</span>
                ) : null}
              </div>
              <div className="mt-3 text-subheading text-text-muted transition-colors duration-200 group-hover:text-text">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
