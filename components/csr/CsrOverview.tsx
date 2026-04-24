"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function CsrOverview() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("csr.overview");

  const content = (
    <>
      <span className="text-subheading text-gold">{t("eyebrow")}</span>
      <h2 id="csr-overview-heading" className="mt-4 text-heading text-text">
        {t("heading")}
      </h2>
      <p className="mt-6 text-body text-text-muted">{t("body")}</p>
    </>
  );

  return (
    <section
      aria-labelledby="csr-overview-heading"
      className="relative bg-bg py-24 md:py-32 lg:py-36"
    >
      {prefersReducedMotion ? (
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

export default CsrOverview;
