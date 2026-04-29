"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Timeline() {
  const reduce = useReducedMotion();
  const t = useTranslations("about.timeline");

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: reduce ? 0.6 : 0.9, ease: EASE, delay },
  });

  return (
    <section
      aria-labelledby="heritage-heading"
      className="relative bg-bg py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
        <motion.span
          {...fadeUp(0)}
          className="inline-flex items-center justify-center gap-3.5 text-subheading text-accent"
        >
          {t("eyebrow")}
        </motion.span>
        <motion.h2
          {...fadeUp(0.1)}
          id="heritage-heading"
          className="mt-5 font-display font-medium tracking-[-0.02em] text-text"
          style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.08 }}
        >
          {t("heading")}
        </motion.h2>
        <motion.p
          {...fadeUp(0.18)}
          className="mt-12 font-display italic font-normal text-accent leading-none"
          style={{ fontSize: "clamp(120px, 18vw, 240px)" }}
        >
          {t("foundingYear")}
        </motion.p>
        <motion.span
          {...fadeUp(0.26)}
          className="mt-8 inline-block text-subheading text-text-muted"
        >
          {t("foundingLabel")}
        </motion.span>
      </div>
    </section>
  );
}

export default Timeline;
