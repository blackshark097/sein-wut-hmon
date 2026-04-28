"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

const ADDRESS_FOR_MAP =
  "No-24, Phan Chat Won U Shwe Ohh St., Industrial Zone (2), Hlaing Thar Yar Township, Yangon";
const PHONE_DISPLAY = "(+959) 73126116";
const PHONE_HREF = "+95973126116";
const EMAIL = "nwa@swh.com.mm";
const DIRECTIONS_URL = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_FOR_MAP)}`;

export function ContactInfo() {
  const reduce = useReducedMotion();
  const t = useTranslations("contact.info");

  const content = (
    <>
      <span className="text-subheading text-gold">{t("eyebrow")}</span>
      <h2 id="contact-info-heading" className="mt-4 text-heading text-text">
        {t("heading")}
      </h2>

      <dl className="mt-14 grid grid-cols-1 gap-y-10 gap-x-10 md:grid-cols-3">
        <div>
          <dt className="text-subheading text-gold">{t("officeLabel")}</dt>
          <dd className="mt-3 text-body text-text">{t("address")}</dd>
          <dd className="mt-4">
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm uppercase tracking-[0.12em] text-gold transition hover:gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {t("getDirections")}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </dd>
        </div>

        <div>
          <dt className="text-subheading text-gold">{t("phoneLabel")}</dt>
          <dd className="mt-3">
            <a
              href={`tel:${PHONE_HREF}`}
              className="font-display text-2xl text-text transition hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {PHONE_DISPLAY}
            </a>
          </dd>
        </div>

        <div>
          <dt className="text-subheading text-gold">{t("emailLabel")}</dt>
          <dd className="mt-3">
            <a
              href={`mailto:${EMAIL}`}
              className="font-display text-2xl text-text transition hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold break-words"
            >
              {EMAIL}
            </a>
          </dd>
        </div>
      </dl>
    </>
  );

  return (
    <section
      id="contact-info"
      aria-labelledby="contact-info-heading"
      className="relative bg-bg py-20 md:py-24 scroll-mt-16 lg:scroll-mt-0"
    >
      {reduce ? (
        <div className="mx-auto max-w-5xl px-6 md:px-10">{content}</div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto max-w-5xl px-6 md:px-10"
        >
          {content}
        </motion.div>
      )}
    </section>
  );
}

export default ContactInfo;
