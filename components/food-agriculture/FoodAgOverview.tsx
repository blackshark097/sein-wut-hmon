"use client";

import { motion, useReducedMotion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function FoodAgOverview() {
  const prefersReducedMotion = useReducedMotion();

  const content = (
    <>
      <span className="text-subheading text-gold">The Approach</span>
      <h2 id="food-ag-overview-heading" className="mt-4 text-heading text-text">
        Not just farming
      </h2>
      <p className="mt-6 text-body text-text-muted">
        This is biological manufacturing. Crystal Diamond Co., the group&apos;s livestock arm, runs an end to end production chain that starts with grandparent and parent genetics, moves through hatchery, and ends at commercial broiler and layer farms. Nothing is outsourced that we can do better ourselves.
      </p>
      <p className="mt-6 text-body text-text-muted">
        The chain is anchored by an integrated feed mill under the Crystal Diamond Quality Feed label and a veterinary product line that keeps flocks healthy at every stage. Animals move from genetics to feed to farm within one operator, which is rare in Myanmar.
      </p>
    </>
  );

  return (
    <section
      aria-labelledby="food-ag-overview-heading"
      className="relative bg-bg py-24 md:py-32"
    >
      {prefersReducedMotion ? (
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          {content}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="mx-auto max-w-4xl px-6 md:px-10"
        >
          {content}
        </motion.div>
      )}
    </section>
  );
}

export default FoodAgOverview;
