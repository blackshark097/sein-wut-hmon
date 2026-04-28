"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

const GRAIN_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export function FisheriesHero() {
  const reduce = useReducedMotion();
  const t = useTranslations("fisheries.hero");
  const tCommon = useTranslations("Common");

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.6 : 1.1, ease: EASE, delay },
  });

  return (
    <section
      aria-label={t("ariaLabel")}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-bg"
      style={{ minHeight: "90vh" }}
    >
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/images/fisheries/harvest.jpg"
          alt={t("imageAlt")}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/70 to-bg"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: "160px 160px" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10%] right-[-10%] bottom-[22%] h-px opacity-50"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,173,238,0.35), transparent)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col px-6 pt-40 pb-32 md:px-10 md:pt-44 md:pb-36">
        <motion.h1
          {...fadeUp(0.3)}
          className="font-display font-medium tracking-[-0.035em] text-text"
          style={{
            fontSize: "clamp(2.75rem, 7.5vw, 6.75rem)",
            lineHeight: 1.02,
            maxWidth: "16ch",
          }}
        >
          {t.rich("heading", {
            em: (chunks) => (
              <em className="font-normal italic text-gold">{chunks}</em>
            ),
          })}
        </motion.h1>

        <motion.p
          {...fadeUp(0.55)}
          className="mt-10 max-w-2xl text-body text-text-muted"
        >
          {t("intro")}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.0 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5"
        aria-hidden="true"
      >
        <span className="text-caption uppercase tracking-[0.22em] text-text-muted">
          {tCommon("scroll")}
        </span>
        <span
          className="block h-12 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--swh-gold))",
            animation: reduce
              ? undefined
              : "swh-scroll-pulse 2.2s ease-in-out infinite",
          }}
        />
      </motion.div>

      <style jsx>{`
        @keyframes swh-scroll-pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scaleY(0.6);
            transform-origin: top;
          }
          50% {
            opacity: 1;
            transform: scaleY(1);
          }
        }
      `}</style>
    </section>
  );
}

export default FisheriesHero;
