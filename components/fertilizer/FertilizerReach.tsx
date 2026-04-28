"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FertilizerReach() {
  const reduce = useReducedMotion();
  const t = useTranslations("fertilizer.reach");

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: reduce ? 0.6 : 0.9, ease: EASE, delay },
  });

  return (
    <section
      aria-labelledby="fertilizer-reach-heading"
      aria-label={t("ariaLabel")}
      className="relative bg-bg pb-32 md:pb-44"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.div {...fadeUp(0)} className="max-w-2xl">
          <span className="inline-flex items-center gap-3.5 text-subheading text-accent before:block before:h-px before:w-7 before:bg-accent">
            {t("eyebrow")}
          </span>
          <h2
            id="fertilizer-reach-heading"
            className="mt-5 font-display font-medium tracking-[-0.02em] text-text"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.08,
            }}
          >
            {t("heading")}
          </h2>
          <p className="mt-6 text-body text-text-muted">{t("body")}</p>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="mt-12 md:mt-16">
          <div className="relative aspect-video w-full overflow-hidden border border-border/70 bg-bg-elev">
            <Image
              src="/images/fertilizer/rice-paddy-farmer.jpg"
              alt={t("featureImageAlt")}
              fill
              sizes="(min-width: 1280px) 1140px, 100vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          {...fadeUp(0.25)}
          className="mx-auto mt-12 w-full max-w-[60%] sm:max-w-[55%] md:mt-16 md:max-w-[52%]"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden border border-border/70 bg-bg-elev">
            <Image
              src="/images/fertilizer/farmers-field.jpg"
              alt={t("insetImageAlt")}
              fill
              sizes="(min-width: 768px) 50vw, 60vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FertilizerReach;
