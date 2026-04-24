"use client";

import { motion, useReducedMotion } from "framer-motion";

type Entity = {
  name: string;
  role: string;
  description: string;
};

const ENTITIES: Entity[] = [
  {
    name: "Sein Wut Hmon Co., Ltd.",
    role: "Distribution",
    description:
      "The distribution parent, running the branch network and consumer reach across Myanmar.",
  },
  {
    name: "IMU Enterprise Ltd.",
    role: "Manufacturing",
    description:
      "Manufacturing arm covering industrial inputs, feed processing, and related production.",
  },
  {
    name: "Sein Myo Daw Co., Ltd.",
    role: "Trading",
    description:
      "The trading house for imports, raw materials, and cross-sector commercial partnerships.",
  },
  {
    name: "Star Way Co., Ltd.",
    role: "Distribution",
    description:
      "A specialist distributor within the group, complementing the Sein Wut Hmon network.",
  },
];

export function EntityStructure() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="entities-heading"
      className="relative bg-bg py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="text-subheading text-gold">Structure</p>
        <h2 id="entities-heading" className="mt-4 text-heading text-text">
          Companies in the group
        </h2>
        <p className="mt-4 max-w-2xl text-body text-text-muted">
          Four operating companies, one shared brand and leadership.
        </p>

        <ul className="mt-16 md:mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {ENTITIES.map((entity, index) => (
            <motion.li
              key={entity.name}
              initial={reduce ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.05,
              }}
              className="group relative overflow-hidden rounded-lg border border-border/60 bg-bg-elev p-8 md:p-10 transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_0_0_1px_rgba(0,173,238,0.25),0_24px_60px_-20px_rgba(0,173,238,0.2)]"
            >
              <span className="text-subheading text-gold">{entity.role}</span>
              <h3 className="mt-4 font-display text-2xl md:text-3xl text-text tracking-tight leading-tight">
                {entity.name}
              </h3>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">
                {entity.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default EntityStructure;
