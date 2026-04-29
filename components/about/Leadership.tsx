"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

type LeaderKey = "chairman" | "viceChairman" | "treasurer";

const LEADERS: LeaderKey[] = ["chairman", "viceChairman", "treasurer"];

export function Leadership() {
  const reduce = useReducedMotion();
  const t = useTranslations("about.leadership");

  return (
    <section
      aria-labelledby="leaders-heading"
      className="relative bg-bg-elev py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="text-subheading text-accent">{t("eyebrow")}</p>
        <h2 id="leaders-heading" className="mt-4 text-heading text-text">
          {t("heading")}
        </h2>

        <ul className="mt-16 md:mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {LEADERS.map((key, index) => (
            <motion.li
              key={key}
              initial={reduce ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.07,
              }}
              className="group relative overflow-hidden rounded-lg border border-border/60 bg-bg transition duration-500 hover:-translate-y-1 hover:border-accent/50"
            >
              <div className="relative aspect-[4/5] w-full">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-surface via-bg-elev to-bg"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center font-display text-accent/40 text-7xl md:text-8xl"
                >
                  {t(`items.${key}.monogram`)}
                </span>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent"
                />
              </div>
              <div className="p-6 md:p-7">
                <p className="text-subheading text-accent">
                  {t(`items.${key}.title`)}
                </p>
                <h3 className="mt-3 font-display text-xl md:text-2xl text-text tracking-tight leading-tight">
                  {t(`items.${key}.name`)}
                </h3>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Leadership;
