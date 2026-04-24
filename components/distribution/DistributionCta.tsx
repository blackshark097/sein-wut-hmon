"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function DistributionCta() {
  const reduce = useReducedMotion();

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: reduce ? 0.6 : 0.9, ease: EASE, delay },
  });

  return (
    <section
      aria-labelledby="distribution-cta-heading"
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
        <motion.span
          {...anim(0)}
          className="inline-flex items-center justify-center gap-3.5 text-subheading text-accent"
        >
          Partnership
        </motion.span>

        <motion.h2
          {...anim(0.12)}
          id="distribution-cta-heading"
          className="mt-6 font-display font-medium tracking-[-0.028em] text-text"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.04 }}
        >
          Partner with{" "}
          <em className="font-normal italic text-accent">Sein Wut Hmon</em>.
        </motion.h2>

        <motion.p
          {...anim(0.22)}
          className="mx-auto mt-8 max-w-xl text-body text-text-muted"
        >
          For distribution inquiries, brand partnerships, and market entry into
          Myanmar.
        </motion.p>

        <motion.div {...anim(0.32)} className="mt-12">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3.5 overflow-hidden border border-accent/50 px-10 py-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-accent transition-all duration-300 hover:gap-5 hover:text-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 -translate-x-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
            />
            Get in touch
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default DistributionCta;
