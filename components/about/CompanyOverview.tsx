"use client";

import { motion, useReducedMotion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "250+", label: "Employees across SWH entities" },
  { value: "14", label: "Branch offices" },
  { value: "20", label: "Fishing vessels" },
  { value: "145+", label: "Distribution vehicles" },
] as const;

export function CompanyOverview() {
  const reduce = useReducedMotion();

  const content = (
    <>
      <p className="text-subheading text-gold">The Business</p>
      <h2 id="overview-heading" className="mt-4 text-heading text-text">
        An integrated operator
      </h2>
      <p className="mt-6 text-body text-text-muted">
        Sein Wut Hmon Group is one of Myanmar&apos;s leading conglomerates,
        operating across marine resources, industrial supply, and nationwide
        distribution. The businesses reinforce each other: the fishery fleet
        anchors the marine line, industrial inputs serve agriculture and
        manufacturing, and the distribution network moves every product to 14
        branch offices across Lower and Upper Myanmar.
      </p>
      <p className="mt-6 text-body text-text-muted">
        Today the group counts 250+ employees, 145+ distribution vehicles, 80
        motorcycles, and 20 fishing vessels.
      </p>

      <dl className="mt-10 grid grid-cols-2 gap-y-8 gap-x-6 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <dt className="font-display text-2xl md:text-3xl text-gold leading-none tracking-tight tabular-nums">
              {stat.value}
            </dt>
            <dd className="text-subheading text-text-muted">{stat.label}</dd>
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
