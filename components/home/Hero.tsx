"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

// SVG feTurbulence noise, ~5% opacity
const GRAIN_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export function Hero() {
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
      aria-label="Hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg"
    >
      {/* future: swap with hero video/image fill */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-bg"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 30% 0%, rgba(197,165,78,0.14), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(96,165,250,0.06), transparent 65%), linear-gradient(180deg, #0A0F1C 0%, #0A0F1C 60%, #070B15 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: "160px 160px" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-bg"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center sm:px-10">
        <motion.span {...fadeUp(0.1)} className="text-subheading text-gold">
          Sein Wut Hmon Group
        </motion.span>

        <motion.h1
          {...fadeUp(0.3)}
          className="text-display mt-6 font-display tracking-tight text-text"
          style={{
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            lineHeight: 1.02,
          }}
        >
          Building Myanmar&apos;s Essential Industries
        </motion.h1>

        <motion.p
          {...fadeUp(0.55)}
          className="text-body mt-8 max-w-2xl text-text-muted"
        >
          A diversified conglomerate powering marine resources, industrial
          supply chains, and distribution networks.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.0 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-caption uppercase tracking-[0.18em] text-text-muted">
          Scroll
        </span>
        <motion.span
          aria-hidden="true"
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={
            reduce
              ? undefined
              : {
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }
          }
          className="text-text-muted"
        >
          <ChevronDown size={18} strokeWidth={1.5} />
        </motion.span>
      </motion.div>
    </section>
  );
}

export default Hero;
