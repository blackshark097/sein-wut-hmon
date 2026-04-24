"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Milestone = {
  year: string;
  title: string;
  description: string;
};

const MILESTONES: Milestone[] = [
  {
    year: "YYYY",
    title: "Founding of Sein Wut Hmon",
    description:
      "The group is founded in Yangon with a focus on essential consumer distribution.",
  },
  {
    year: "YYYY",
    title: "First distribution operations",
    description:
      "The logistics arm launches, seeding the branch network that reaches every state and region today.",
  },
  {
    year: "YYYY",
    title: "Marine fleet launch",
    description:
      "Sein Wut Hmon expands into marine harvest, building toward a twenty vessel fleet.",
  },
];

export function Timeline() {
  const containerRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const items = gsap.utils.toArray<HTMLElement>(
        containerRef.current.querySelectorAll(".swh-milestone"),
      );

      items.forEach((item) => {
        gsap.from(item, {
          x: -24,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
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
      aria-labelledby="heritage-heading"
      className="relative bg-bg py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <p className="text-subheading text-gold">Heritage</p>
        <h2 id="heritage-heading" className="mt-4 text-heading text-text">
          Milestones
        </h2>
        <p className="mt-4 max-w-2xl text-body text-text-muted">
          Decades of building in Myanmar, one industry at a time. Dates shown
          with a TBD marker are being confirmed.
        </p>

        <ol
          ref={containerRef}
          className="relative mt-16 md:mt-20 border-l border-border/60 pl-8 md:pl-12"
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-gold/60 via-gold/20 to-transparent"
          />
          {MILESTONES.map((m) => (
            <li
              key={m.title}
              className="swh-milestone relative pb-14 last:pb-0 md:pb-20"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-1 inline-block h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-bg md:-left-[7px] md:h-3.5 md:w-3.5"
              />
              <div className="flex items-baseline gap-3">
                <time className="font-display text-3xl text-gold md:text-4xl tabular-nums">
                  {m.year}
                </time>
                <span className="inline-flex items-center rounded-full border border-gold/40 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold/80">
                  TBD
                </span>
              </div>
              <h3 className="mt-3 font-display text-2xl text-text md:text-3xl leading-tight">
                {m.title}
              </h3>
              <p className="mt-2 max-w-2xl text-body text-text-muted">
                {m.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Timeline;
