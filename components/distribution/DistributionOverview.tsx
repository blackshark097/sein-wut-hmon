"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function DistributionOverview() {
  const reduce = useReducedMotion();

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: reduce ? 0.6 : 0.9, ease: EASE, delay },
  });

  return (
    <section
      aria-labelledby="distribution-overview-heading"
      className="relative bg-bg py-28 md:py-40"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 md:grid-cols-[1fr_1.4fr] md:gap-20 md:px-10">
        <motion.div {...anim(0)}>
          <span className="inline-flex items-center gap-3.5 text-subheading text-accent before:block before:h-px before:w-7 before:bg-accent">
            The Discipline
          </span>
          <h2
            id="distribution-overview-heading"
            className="mt-5 font-display font-medium tracking-[-0.02em] text-text"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.08,
            }}
          >
            The country, reached.
          </h2>
        </motion.div>

        <motion.div {...anim(0.15)} className="text-body">
          <p className="mb-7">
            Distribution in Myanmar is{" "}
            <strong className="font-display font-normal italic text-text">
              not a logistics problem
            </strong>
            . It is an infrastructure challenge, a relationship business, and a
            test of operational discipline across geography that spans
            coastline, delta, and highland.
          </p>
          <p>
            Sein Wut Hmon has spent decades building the branch network, fleet
            capacity, and partner trust that turn imported products into
            nationwide availability.
          </p>
          <blockquote
            className="mt-12 border-l border-accent/50 pl-7 font-display italic text-text"
            style={{
              fontSize: "clamp(1.25rem, 1.8vw, 1.625rem)",
              lineHeight: 1.4,
            }}
          >
            Reach is not a route. It is the sum of fourteen offices, a fleet
            that runs, and the people who keep the promises behind both.
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}

export default DistributionOverview;
