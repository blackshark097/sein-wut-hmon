"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

const ADDRESS_FOR_MAP =
  "No-24, Phan Chat Won U Shwe Ohh St., Industrial Zone (2), Hlaing Thar Yar Township, Yangon";
const MAP_URL = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_FOR_MAP)}&output=embed`;

export function ContactMap() {
  const reduce = useReducedMotion();
  const t = useTranslations("contact.map");

  const header = (
    <>
      <span className="text-subheading text-gold">{t("eyebrow")}</span>
      <h3 className="mt-4 text-heading text-text">{t("heading")}</h3>
    </>
  );

  return (
    <section aria-label={t("ariaLabel")} className="relative bg-bg py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {reduce ? (
          <div>{header}</div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {header}
          </motion.div>
        )}

        <div className="mt-8 overflow-hidden rounded-lg border border-border/60 bg-bg-elev aspect-[16/9]">
          <iframe
            src={MAP_URL}
            title={t("mapTitle")}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

export default ContactMap;
