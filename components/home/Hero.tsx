"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// SVG feTurbulence noise, ~5% opacity
const GRAIN_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export function Hero() {
  const reduce = useReducedMotion();
  const t = useTranslations("home.hero");
  const tCommon = useTranslations("Common");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const introRef = useRef<HTMLParagraphElement | null>(null);

  // Word-by-word blur reveal. Runs after mount so the H1 paints in its
  // final visible state for LCP (Phase 5.2 intent), then GSAP briefly
  // hides the words and animates them back in. Reduced motion skips the
  // timeline entirely.
  useGSAP(
    () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const heading = headingRef.current;
      const intro = introRef.current;
      if (!heading) return;

      const text = (heading.textContent ?? "").trim();
      if (!text) return;

      const words = text.split(/\s+/);
      heading.innerHTML = words
        .map(
          (w) =>
            `<span class="swh-hero-word" style="display:inline-block;will-change:filter,opacity;">${w}</span>`,
        )
        .join(" ");

      const wordEls = heading.querySelectorAll<HTMLSpanElement>(
        ".swh-hero-word",
      );

      const tl = gsap.timeline();
      tl.from(wordEls, {
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });

      if (intro) {
        tl.from(
          intro,
          {
            opacity: 0,
            y: 12,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2",
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      aria-label={t("ariaLabel")}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg"
    >
      {/* future: swap with hero video/image fill */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-bg"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 30% 0%, rgba(0,173,238,0.14), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(96,165,250,0.06), transparent 65%), linear-gradient(180deg, #0A0F1C 0%, #0A0F1C 60%, #070B15 100%)",
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
        <h1
          ref={headingRef}
          className="text-display font-display tracking-tight text-text"
          style={{
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            lineHeight: 1.02,
          }}
        >
          {t("heading")}
        </h1>

        <p
          ref={introRef}
          className="text-body mt-8 max-w-2xl text-text-muted"
        >
          {t("intro")}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.0 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-caption uppercase tracking-[0.18em] text-text-muted">
          {tCommon("scroll")}
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
