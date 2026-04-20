"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FisheriesOverview() {
  const reduce = useReducedMotion();

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: reduce ? 0.6 : 0.9, ease: EASE, delay },
  });

  return (
    <section
      aria-labelledby="fisheries-overview-heading"
      className="relative bg-bg py-28 md:py-40"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 md:grid-cols-[1fr_1.4fr] md:gap-20 md:px-10">
        <motion.div {...anim(0)}>
          <span className="inline-flex items-center gap-3.5 text-subheading text-gold before:block before:h-px before:w-7 before:bg-gold">
            The Geography
          </span>
          <h2
            id="fisheries-overview-heading"
            className="mt-5 font-display font-medium tracking-[-0.02em] text-text"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.08,
            }}
          >
            Built for the water that built it.
          </h2>
        </motion.div>

        <motion.div {...anim(0.15)} className="text-body">
          <p className="mb-7">
            Myanmar&apos;s marine geography is among the most productive in the
            region. A{" "}
            <strong className="font-display font-normal italic text-text">
              2,832 km coastline
            </strong>
            ,{" "}
            <strong className="font-display font-normal italic text-text">
              0.5 million hectares
            </strong>{" "}
            of coastal swampland, and{" "}
            <strong className="font-display font-normal italic text-text">
              8.2 million hectares
            </strong>{" "}
            of inland water bodies together yield roughly{" "}
            <strong className="font-display font-normal italic text-text">
              70,000 tons
            </strong>{" "}
            of flood fisheries output each year.
          </p>
          <p>
            SWH&apos;s fishery division was built to operate at the scale this
            geography allows, pairing a modernized fleet with onboard handling,
            shoreside cold storage, and documented traceability from vessel to
            market.
          </p>
          <blockquote
            className="mt-12 border-l border-gold/50 pl-7 font-display italic text-text"
            style={{
              fontSize: "clamp(1.25rem, 1.8vw, 1.625rem)",
              lineHeight: 1.4,
            }}
          >
            A single operator from harvest to export, rare in Myanmar, and
            deliberately so.
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}

export default FisheriesOverview;
