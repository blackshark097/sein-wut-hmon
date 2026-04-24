"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

type MilestoneKey = "founding" | "distribution" | "fleet";

const MILESTONE_KEYS: MilestoneKey[] = ["founding", "distribution", "fleet"];

export function Timeline() {
  const containerRef = useRef<HTMLOListElement>(null);
  const t = useTranslations("about.timeline");

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
        <p className="text-subheading text-gold">{t("eyebrow")}</p>
        <h2 id="heritage-heading" className="mt-4 text-heading text-text">
          {t("heading")}
        </h2>
        <p className="mt-4 max-w-2xl text-body text-text-muted">{t("intro")}</p>

        <ol
          ref={containerRef}
          className="relative mt-16 md:mt-20 border-l border-border/60 pl-8 md:pl-12"
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-gold/60 via-gold/20 to-transparent"
          />
          {MILESTONE_KEYS.map((key) => (
            <li
              key={key}
              className="swh-milestone relative pb-14 last:pb-0 md:pb-20"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-1 inline-block h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-bg md:-left-[7px] md:h-3.5 md:w-3.5"
              />
              <div className="flex items-baseline gap-3">
                <time className="font-display text-3xl text-gold md:text-4xl tabular-nums">
                  {t(`items.${key}.year`)}
                </time>
                <span className="inline-flex items-center rounded-full border border-gold/40 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold/80">
                  {t("tbdBadge")}
                </span>
              </div>
              <h3 className="mt-3 font-display text-2xl text-text md:text-3xl leading-tight">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 max-w-2xl text-body text-text-muted">
                {t(`items.${key}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Timeline;
