"use client";

import { motion, useReducedMotion } from "framer-motion";

type Leader = {
  title: string;
  initial: string;
  brief: string;
};

const LEADERS: Leader[] = [
  {
    title: "Chairman",
    initial: "C",
    brief:
      "Sets the long term direction for the group and anchors founding family stewardship.",
  },
  {
    title: "Managing Director",
    initial: "M",
    brief:
      "Runs the holding structure day to day, linking operating companies and the boardroom.",
  },
  {
    title: "Chief Operating Officer",
    initial: "O",
    brief: "Owns cross group operations, from distribution to marine harvest.",
  },
];

export function Leadership() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="leaders-heading"
      className="relative bg-bg-elev py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="text-subheading text-gold">Leadership</p>
        <h2 id="leaders-heading" className="mt-4 text-heading text-text">
          The people in charge
        </h2>
        <p className="mt-4 max-w-2xl text-body text-text-muted">
          Names and portraits are being confirmed. This section will be
          completed as part of the next content pass.
        </p>

        <ul className="mt-16 md:mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {LEADERS.map((leader, index) => (
            <motion.li
              key={leader.title}
              initial={reduce ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.07,
              }}
              className="group relative overflow-hidden rounded-lg border border-border/60 bg-bg transition duration-500 hover:-translate-y-1 hover:border-gold/50"
            >
              <div className="relative aspect-[4/5] w-full">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-surface via-bg-elev to-bg"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center font-display text-gold/40 text-7xl md:text-8xl"
                >
                  {leader.initial}
                </span>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent"
                />
              </div>
              <div className="p-6 md:p-7">
                <p className="text-subheading text-gold">{leader.title}</p>
                <h3 className="mt-3 font-display text-xl md:text-2xl text-text tracking-tight leading-tight">
                  Name to be confirmed
                </h3>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  {leader.brief}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Leadership;
