"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const GRAIN_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export function IndustrialHero() {
  const reduce = useReducedMotion();

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
      aria-label="Industrial Inputs hero"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-bg"
      style={{ minHeight: "60vh" }}
    >
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/images/legacy/swh-mmfcl-cooperation-thilawa-thumb.jpg"
          alt="Sein Wut Hmon and Marubeni Myanmar Fertilizer cooperation at Thilawa"
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
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: "160px 160px" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-32 text-center sm:px-10 md:py-40">
        <motion.span
          {...fadeUp(0.1)}
          className="text-subheading text-gold"
        >
          Division
        </motion.span>

        <motion.h1
          {...fadeUp(0.25)}
          className="mt-6 font-display tracking-tight text-text"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1.05,
          }}
        >
          Industrial Inputs
        </motion.h1>

        <motion.p
          {...fadeUp(0.45)}
          className="mt-8 max-w-2xl text-body text-text-muted"
        >
          Fertilizer, lubricants, and raw materials supporting Myanmar&apos;s agriculture and transportation sectors.
        </motion.p>
      </div>
    </section>
  );
}

export default IndustrialHero;
