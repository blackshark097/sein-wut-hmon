"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type Initiative = {
  name: string;
  eyebrow: string;
  blurb: string;
  image: string | null;
  placeholder?: { gradient: string; initial: string };
};

const INITIATIVES: Initiative[] = [
  {
    name: "Education",
    eyebrow: "Schools and learning",
    blurb:
      "Supporting basic schools and learning facilities in the regions where the group operates.",
    image: "/images/legacy/donation-basic-school-ayeyarwady-thumb.jpg",
  },
  {
    name: "Disaster Relief",
    eyebrow: "Emergency response",
    blurb:
      "Practical relief during floods, storms, and other community emergencies in Myanmar.",
    image: "/images/legacy/donations-disaster-flood-ayeyarwadi-2015-08-08-thumb.jpg",
  },
  {
    name: "Community Development",
    eyebrow: "Long term investment",
    blurb:
      "Infrastructure, local partnerships, and quiet, ongoing contributions where our branches operate.",
    image: null,
    placeholder: {
      gradient: "from-[#16251a] via-[#1A2332] to-[#050a0d]",
      initial: "C",
    },
  },
];

export function Initiatives() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="initiatives-heading"
      className="relative bg-bg py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-subheading text-gold">Initiatives</p>
        <h2
          id="initiatives-heading"
          className="mt-4 text-heading text-text"
        >
          Where we contribute
        </h2>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {INITIATIVES.map((initiative, index) => (
            <motion.article
              key={initiative.name}
              initial={reduce ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                ease: EASE,
                delay: index * 0.07,
              }}
              className="group relative overflow-hidden rounded-lg border border-border/60 bg-bg-elev transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_0_0_1px_rgba(197,165,78,0.25),0_24px_60px_-20px_rgba(197,165,78,0.2)]"
            >
              <div className="relative block w-full aspect-[4/3]">
                {initiative.image ? (
                  <Image
                    src={initiative.image}
                    alt={initiative.name}
                    fill
                    sizes="(min-width:768px) 33vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${initiative.placeholder?.gradient ?? "from-surface via-bg-elev to-bg"}`}
                      aria-hidden="true"
                    />
                    <span
                      className="absolute inset-0 flex items-center justify-center font-display text-gold/40 text-6xl"
                      aria-hidden="true"
                    >
                      {initiative.placeholder?.initial ?? initiative.name.charAt(0)}
                    </span>
                  </>
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="p-6 md:p-7">
                <span className="text-subheading text-gold">
                  {initiative.eyebrow}
                </span>
                <h3 className="mt-3 font-display text-2xl md:text-3xl text-text tracking-tight leading-tight">
                  {initiative.name}
                </h3>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  {initiative.blurb}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Initiatives;
