"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

const GRAIN_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export function FertilizerHero() {
  const reduce = useReducedMotion();
  const t = useTranslations("fertilizer.hero");

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0.6 : 1.1,
      ease: EASE,
      delay,
    },
  });

  return (
    <section
      aria-label={t("ariaLabel")}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-bg"
      style={{ minHeight: "70vh" }}
    >
      <Image
        src="/images/fertilizer/fertilizer-hero.jpg"
        alt={t("imageAlt")}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 30% 0%, rgba(0,173,238,0.10), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(96,165,250,0.05), transparent 65%), linear-gradient(180deg, rgba(7,11,21,0.78) 0%, rgba(7,11,21,0.55) 45%, rgba(7,11,21,0.85) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="grain-pulse pointer-events-none absolute inset-0 mix-blend-overlay"
        style={
          {
            backgroundImage: GRAIN_URL,
            backgroundSize: "160px 160px",
            "--grain-opacity-min": "0.035",
            "--grain-opacity-max": "0.05",
          } as React.CSSProperties
        }
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-32 text-center sm:px-10 md:py-40">
        <motion.h1
          {...fadeUp(0.25)}
          className="font-display tracking-tight text-text"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1.05,
          }}
        >
          {t.rich("heading", {
            em: (chunks) => (
              <em className="font-normal italic text-accent">{chunks}</em>
            ),
          })}
        </motion.h1>

        <motion.p
          {...fadeUp(0.45)}
          className="mt-8 max-w-2xl text-base font-normal leading-relaxed text-text-muted md:text-lg md:font-medium"
        >
          {t("intro")}
        </motion.p>
      </div>
    </section>
  );
}

export default FertilizerHero;
