"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function CompanyIntro() {
  const prefersReducedMotion = useReducedMotion();

  const content = (
    <>
      <span className="text-subheading text-gold">THE GROUP</span>
      <h2 id="intro-heading" className="mt-4 text-heading text-text">
        About Sein Wut Hmon
      </h2>
      <p className="mt-6 text-body text-text-muted max-w-3xl mx-auto md:mx-0">
        Sein Wut Hmon Group is one of Myanmar&apos;s leading conglomerates,
        operating integrated businesses across marine resources, industrial
        supply, and nationwide distribution.
      </p>
      <Link
        href="/about"
        className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.12em] text-gold transition hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        Learn more <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </>
  );

  return (
    <section
      aria-labelledby="intro-heading"
      className="relative bg-bg py-24 md:py-32 lg:py-36"
    >
      {prefersReducedMotion ? (
        <div className="mx-auto max-w-4xl px-6 md:px-10 text-center md:text-left">
          {content}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="mx-auto max-w-4xl px-6 md:px-10 text-center md:text-left"
        >
          {content}
        </motion.div>
      )}
    </section>
  );
}

export default CompanyIntro;
