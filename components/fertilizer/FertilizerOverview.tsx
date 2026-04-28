"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

const BULLET_KEYS = ["item1", "item2", "item3"] as const;

export function FertilizerOverview() {
  const reduce = useReducedMotion();
  const t = useTranslations("fertilizer.overview");

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: reduce ? 0.5 : 0.9, ease: EASE, delay },
  });

  return (
    <section
      aria-labelledby="fertilizer-overview-heading"
      className="relative bg-bg py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.div {...fadeUp(0)} className="max-w-3xl">
          <span className="inline-flex items-center gap-3.5 text-subheading text-accent before:block before:h-px before:w-7 before:bg-accent">
            {t("eyebrow")}
          </span>
          <h2
            id="fertilizer-overview-heading"
            className="mt-5 font-display font-medium tracking-[-0.02em] text-text"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.08,
            }}
          >
            {t("heading")}
          </h2>
          <p className="mt-6 max-w-xl text-body text-text-muted">
            {t("body")}
          </p>
          <ul className="mt-10 space-y-4">
            {BULLET_KEYS.map((bulletKey) => (
              <li
                key={bulletKey}
                className="flex gap-4 text-[15.5px] leading-relaxed text-text"
              >
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-px w-6 flex-shrink-0 bg-accent"
                />
                <span>{t(`bullets.${bulletKey}`)}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export default FertilizerOverview;
