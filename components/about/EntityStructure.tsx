"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

type EntityKey = "swhCoLtd" | "imu" | "seinMyoDaw" | "starWay";

const ENTITY_KEYS: EntityKey[] = ["swhCoLtd", "imu", "seinMyoDaw", "starWay"];

export function EntityStructure() {
  const reduce = useReducedMotion();
  const t = useTranslations("about.entities");

  return (
    <section
      aria-labelledby="entities-heading"
      className="relative bg-bg py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="text-subheading text-gold">{t("eyebrow")}</p>
        <h2 id="entities-heading" className="mt-4 text-heading text-text">
          {t("heading")}
        </h2>
        <p className="mt-4 max-w-2xl text-body text-text-muted">{t("intro")}</p>

        <ul className="mt-16 md:mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {ENTITY_KEYS.map((key, index) => {
            const roleKey = t(`items.${key}.roleKey`);
            return (
              <motion.li
                key={key}
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.05,
                }}
                className="group relative overflow-hidden rounded-lg border border-border/60 bg-bg-elev p-8 md:p-10 transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_0_0_1px_rgba(0,173,238,0.25),0_24px_60px_-20px_rgba(0,173,238,0.2)]"
              >
                <span className="text-subheading text-gold">
                  {t(`roles.${roleKey}`)}
                </span>
                <h3 className="mt-4 font-display text-2xl md:text-3xl text-text tracking-tight leading-tight">
                  {t(`items.${key}.name`)}
                </h3>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  {t(`items.${key}.description`)}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default EntityStructure;
