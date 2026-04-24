"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const GRAIN_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export function ContactHero() {
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0.5 : 0.9,
      ease: EASE,
      delay,
    },
  });

  return (
    <section
      aria-label="Contact hero"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-bg"
      style={{ minHeight: "40vh" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-bg"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 30% 0%, rgba(0,173,238,0.12), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(96,165,250,0.05), transparent 65%), linear-gradient(180deg, #0A0F1C 0%, #070B15 100%)",
        }}
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

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-36 pb-20 text-center sm:px-10 md:pt-40 md:pb-24">
        <motion.span {...fadeUp(0.1)} className="text-subheading text-gold">
          Contact
        </motion.span>

        <motion.h1
          {...fadeUp(0.2)}
          className="mt-6 font-display tracking-tight text-text"
          style={{
            fontSize: "clamp(2.25rem, 5vw, 4rem)",
            lineHeight: 1.05,
          }}
        >
          Contact
        </motion.h1>

        <motion.p
          {...fadeUp(0.35)}
          className="mt-6 max-w-2xl text-body text-text-muted"
        >
          Get in touch with Sein Wut Hmon Group.
        </motion.p>
      </div>
    </section>
  );
}

export default ContactHero;
