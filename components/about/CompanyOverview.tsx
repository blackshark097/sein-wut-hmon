"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const easeOut = [0.22, 1, 0.36, 1] as const;

type StatKey = "employees" | "branches" | "vessels" | "vehicles";

const STATS: Array<{ key: StatKey; value: string }> = [
  { key: "employees", value: "250+" },
  { key: "branches", value: "14" },
  { key: "vessels", value: "20" },
  { key: "vehicles", value: "145+" },
];

export function CompanyOverview() {
  const reduce = useReducedMotion();
  const t = useTranslations("about.overview");

  const content = (
    <>
      <p className="text-subheading text-gold">{t("eyebrow")}</p>
      <h2 id="overview-heading" className="mt-4 text-heading text-text">
        {t("heading")}
      </h2>
      <p className="mt-6 text-body text-text-muted">{t("paragraph1")}</p>
      <p className="mt-6 text-body text-text-muted">{t("paragraph2")}</p>

      <dl className="mt-10 grid grid-cols-2 gap-y-8 gap-x-6 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.key} className="flex flex-col gap-1">
            <dt className="font-display text-2xl md:text-3xl text-gold leading-none tracking-tight tabular-nums">
              {stat.value}
            </dt>
            <dd className="text-subheading text-text-muted">
              {t(`stats.${stat.key}`)}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );

  return (
    <section
      aria-labelledby="overview-heading"
      className="relative bg-bg py-24 md:py-32 lg:py-36"
    >
      {reduce ? (
        <div className="mx-auto max-w-4xl px-6 md:px-10">{content}</div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="mx-auto max-w-4xl px-6 md:px-10"
        >
          {content}
        </motion.div>
      )}
    </section>
  );
}

export default CompanyOverview;
