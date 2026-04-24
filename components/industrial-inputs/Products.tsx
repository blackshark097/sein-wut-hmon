"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type Product = {
  name: string;
  partner: string;
  blurb: string;
  bullets: string[];
  image: string | null;
  placeholder?: { gradient: string; initial: string };
};

const PRODUCTS: Product[] = [
  {
    name: "Fertilizer",
    partner: "MMF",
    blurb:
      "Distribution of fertilizer products across Myanmar, backed by the group's joint venture with Marubeni Corporation and a plant at Thilawa Industrial Zone.",
    bullets: [
      "Nationwide fertilizer distribution",
      "Support for smallholder and commercial farms",
      "Integrated with the group's trading and logistics arms",
    ],
    image: "/images/legacy/fertilizer-intro.jpg",
  },
  {
    name: "Lubricants",
    partner: "Nasa and Sunoco",
    blurb:
      "Industrial and automotive lubricants for transportation, machinery, and manufacturing customers across Myanmar. Sole agent of NASA Total Lubricating Solution from AC Lubricants Sdn Bhd, Malaysia.",
    bullets: [
      "Automotive and industrial grades",
      "Nationwide distribution through the group network",
      "Trusted Nasa and Sunoco product lines",
    ],
    image: "/images/legacy/nasa-intro.jpg",
  },
];

export function Products() {
  const reduce = useReducedMotion();

  const fadeUp = {
    initial: { opacity: 0, y: reduce ? 0 : 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: reduce ? 0.5 : 0.9, ease: EASE },
  };

  return (
    <section
      aria-labelledby="products-heading"
      className="relative bg-bg py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div>
          <p className="text-subheading text-gold">Portfolio</p>
          <h2 id="products-heading" className="mt-3 text-heading text-text">
            The product lines
          </h2>
          <p className="mt-4 max-w-2xl text-body text-text-muted">
            Two core lines anchor the division, each built on long standing
            distribution partnerships.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-2 md:gap-10">
          {PRODUCTS.map((product) => (
            <motion.article
              key={product.name}
              {...fadeUp}
              className="group relative overflow-hidden rounded-lg border border-border/60 bg-bg-elev transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_0_0_1px_rgba(0,173,238,0.25),0_24px_60px_-20px_rgba(0,173,238,0.2)]"
            >
              <div className="relative block aspect-[4/3] w-full">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width:768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${product.placeholder?.gradient ?? "from-surface via-bg-elev to-bg"}`}
                      aria-hidden="true"
                    />
                    <span
                      className="absolute inset-0 flex items-center justify-center font-display text-6xl text-gold/40"
                      aria-hidden="true"
                    >
                      {product.placeholder?.initial ?? product.name.charAt(0)}
                    </span>
                  </>
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="p-6 md:p-8 lg:p-10">
                <p className="text-subheading text-gold">{product.partner}</p>
                <h3 className="mt-3 font-display text-3xl leading-tight tracking-tight text-text md:text-4xl">
                  {product.name}
                </h3>
                <p className="mt-4 text-body text-text-muted">
                  {product.blurb}
                </p>
                <ul className="mt-6 space-y-3">
                  {product.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-relaxed text-text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-4 flex-shrink-0 bg-gold/70"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
