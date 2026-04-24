"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

type ProductKey = "fertilizer" | "lubricants";

type ProductConfig = {
  key: ProductKey;
  image: string | null;
  placeholder?: { gradient: string; initial: string };
};

const PRODUCTS: ProductConfig[] = [
  {
    key: "fertilizer",
    image: "/images/legacy/fertilizer-intro.jpg",
  },
  {
    key: "lubricants",
    image: "/images/legacy/nasa-intro.jpg",
  },
];

const BULLET_KEYS = ["item1", "item2", "item3"] as const;

export function Products() {
  const reduce = useReducedMotion();
  const t = useTranslations("industrialInputs.products");

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
          <p className="text-subheading text-gold">{t("eyebrow")}</p>
          <h2 id="products-heading" className="mt-3 text-heading text-text">
            {t("heading")}
          </h2>
          <p className="mt-4 max-w-2xl text-body text-text-muted">
            {t("intro")}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-2 md:gap-10">
          {PRODUCTS.map((product) => {
            const name = t(`items.${product.key}.name`);
            return (
              <motion.article
                key={product.key}
                {...fadeUp}
                className="group relative overflow-hidden rounded-lg border border-border/60 bg-bg-elev transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_0_0_1px_rgba(0,173,238,0.25),0_24px_60px_-20px_rgba(0,173,238,0.2)]"
              >
                <div className="relative block aspect-[4/3] w-full">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={name}
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
                        {product.placeholder?.initial ?? name.charAt(0)}
                      </span>
                    </>
                  )}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent"
                    aria-hidden="true"
                  />
                </div>

                <div className="p-6 md:p-8 lg:p-10">
                  <p className="text-subheading text-gold">
                    {t(`items.${product.key}.partner`)}
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-tight tracking-tight text-text md:text-4xl">
                    {name}
                  </h3>
                  <p className="mt-4 text-body text-text-muted">
                    {t(`items.${product.key}.blurb`)}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {BULLET_KEYS.map((bulletKey) => (
                      <li
                        key={bulletKey}
                        className="flex gap-3 text-sm leading-relaxed text-text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-4 flex-shrink-0 bg-gold/70"
                        />
                        <span>
                          {t(`items.${product.key}.bullets.${bulletKey}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Products;
