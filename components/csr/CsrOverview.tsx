"use client";

import { motion, useReducedMotion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function CsrOverview() {
  const prefersReducedMotion = useReducedMotion();

  const content = (
    <>
      <span className="text-subheading text-gold">Approach</span>
      <h2
        id="csr-overview-heading"
        className="mt-4 text-heading text-text"
      >
        Why we invest
      </h2>
      <p className="mt-6 text-body text-text-muted">
        Community investment runs alongside the business. Where Sein Wut Hmon operates, schools, families, and neighbours are part of the operating picture. The group contributes through school support and learning facilities, disaster relief during floods and other emergencies, and longer term community development tied to the places it does business in.
      </p>
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
