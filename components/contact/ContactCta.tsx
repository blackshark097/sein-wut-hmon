"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ContactCta() {
  const reduce = useReducedMotion();
  const t = useTranslations("contact.cta");

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: reduce ? 0.6 : 0.9, ease: EASE, delay },
  });

  return (
    <section
      aria-labelledby="contact-cta-heading"
      className="relative overflow-hidden border-t border-border/60 py-36 md:py-44"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(0,173,238,0.10), transparent 65%), radial-gradient(ellipse 80% 50% at 50% 0%, rgba(96,165,250,0.05), transparent 60%), linear-gradient(180deg, var(--swh-bg) 0%, #060A14 100%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <motion.h2
          {...anim(0)}
          id="contact-cta-heading"
          className="font-display font-medium tracking-[-0.028em] text-text"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.04 }}
        >
          {t.rich("heading", {
            em: (chunks) => (
              <em className="font-normal italic text-accent">{chunks}</em>
            ),
          })}
        </motion.h2>

        <motion.p
          {...anim(0.12)}
          className="mx-auto mt-8 max-w-xl text-body text-text-muted"
        >
          {t("intro")}
        </motion.p>
      </div>
    </section>
  );
}

export default ContactCta;
