"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

type InitiativeKey = "education" | "disaster" | "community";

type InitiativeConfig = {
  key: InitiativeKey;
  image: string | null;
  placeholder?: { gradient: string; initial: string };
};

const INITIATIVES: InitiativeConfig[] = [
  {
    key: "education",
    image: "/images/legacy/donation-basic-school-ayeyarwady-thumb.jpg",
  },
  {
    key: "disaster",
    image:
      "/images/legacy/donations-disaster-flood-ayeyarwadi-2015-08-08-thumb.jpg",
  },
  {
    key: "community",
    image: "/images/csr/community-development.jpg",
  },
];

export function Initiatives() {
  const reduce = useReducedMotion();
  const t = useTranslations("csr.initiatives");

  return (
    <section
      aria-labelledby="initiatives-heading"
      className="relative bg-bg py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-subheading text-gold">{t("eyebrow")}</p>
        <h2 id="initiatives-heading" className="mt-4 text-heading text-text">
          {t("heading")}
        </h2>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {INITIATIVES.map((initiative, index) => {
            const name = t(`items.${initiative.key}.name`);
            return (
              <motion.article
                key={initiative.key}
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  ease: EASE,
                  delay: index * 0.07,
                }}
                className="group relative overflow-hidden rounded-lg border border-border/60 bg-bg-elev transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]"
              >
                <div className="relative block w-full aspect-[4/3]">
                  {initiative.image ? (
                    <Image
                      src={initiative.image}
                      alt={name}
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
                        {initiative.placeholder?.initial ?? name.charAt(0)}
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
                    {t(`items.${initiative.key}.eyebrow`)}
                  </span>
                  <h3 className="mt-3 font-display text-2xl md:text-3xl text-text tracking-tight leading-tight">
                    {name}
                  </h3>
                  <p className="mt-3 text-sm text-text-muted leading-relaxed">
                    {t(`items.${initiative.key}.blurb`)}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Initiatives;
