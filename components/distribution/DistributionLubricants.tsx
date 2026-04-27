"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

const BULLET_KEYS = ["item1", "item2", "item3"] as const;

export function DistributionLubricants() {
  const reduce = useReducedMotion();
  const t = useTranslations("distribution.lubricants");

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: reduce ? 0.6 : 0.9, ease: EASE, delay },
  });

  return (
    <section
      aria-labelledby="distribution-lubricants-heading"
      aria-label={t("ariaLabel")}
      className="relative bg-bg pb-32 md:pb-44"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
          <motion.div
            {...fadeUp(0)}
            className="md:col-span-6 lg:col-span-5"
          >
            <span className="inline-flex items-center gap-3.5 text-subheading text-accent before:block before:h-px before:w-7 before:bg-accent">
              {t("eyebrow")}
            </span>
            <h2
              id="distribution-lubricants-heading"
              className="mt-5 font-display font-medium tracking-[-0.02em] text-text"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                lineHeight: 1.1,
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

          <motion.div
            {...fadeUp(0.15)}
            className="relative md:col-span-6 lg:col-span-7"
          >
            <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden border border-border/70 bg-bg-elev md:aspect-[5/4] lg:aspect-[4/3]">
              <Image
                src="/images/partners/nasa.png"
                alt={t("imageAlt")}
                fill
                sizes="(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw"
                className="object-contain p-12 md:p-16 lg:p-20"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default DistributionLubricants;
