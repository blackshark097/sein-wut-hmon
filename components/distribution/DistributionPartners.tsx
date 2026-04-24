"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

type PartnerKey = "ok" | "hisense" | "nasa";

const PARTNER_KEYS: PartnerKey[] = ["ok", "hisense", "nasa"];

export function DistributionPartners() {
  const reduce = useReducedMotion();
  const t = useTranslations("distribution.partners");

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: reduce ? 0.6 : 0.9, ease: EASE, delay },
  });

  return (
    <section
      aria-labelledby="distribution-partners-heading"
      className="relative bg-bg pb-32 md:pb-44"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.div {...anim(0)} className="mb-14 max-w-xl">
          <span className="inline-flex items-center gap-3.5 text-subheading text-accent before:block before:h-px before:w-7 before:bg-accent">
            {t("eyebrow")}
          </span>
          <h2
            id="distribution-partners-heading"
            className="mt-5 font-display font-medium tracking-[-0.02em] text-text"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              lineHeight: 1.1,
            }}
          >
            {t("heading")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {PARTNER_KEYS.map((key, i) => (
            <motion.article
              key={key}
              {...anim(0.08 * (i + 1))}
              className="group relative flex min-h-[320px] flex-col border border-border/70 bg-bg-elev p-9 transition duration-500 hover:-translate-y-1 hover:border-accent/55 hover:bg-[#131c2f]"
            >
              <div
                aria-hidden="true"
                className="mb-8 flex w-full items-center justify-center border border-dashed border-accent/25 font-display font-semibold tracking-[-0.02em] text-accent transition-colors duration-500 group-hover:border-accent/55"
                style={{
                  aspectRatio: "16 / 7",
                  fontSize: "clamp(2rem, 3vw, 2.5rem)",
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(0,173,238,0.04) 0 8px, transparent 8px 16px)",
                }}
              >
                {t(`items.${key}.name`)}
              </div>

              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                {t(`items.${key}.category`)}
              </span>
              <h3
                className="mt-3.5 font-display font-medium tracking-[-0.02em] text-text"
                style={{
                  fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
                  lineHeight: 1.1,
                }}
              >
                {t(`items.${key}.name`)}
              </h3>

              <div className="mt-auto pt-7 text-sm leading-[1.55] text-text-muted">
                <span className="block text-[10.5px] uppercase tracking-[0.18em] text-text-muted/70">
                  {t("importedFromLabel")}
                </span>
                <span className="mt-1.5 block text-text">
                  {t(`items.${key}.origin`)}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DistributionPartners;
