"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { LeafMark } from "./LeafMark";

const EASE = [0.22, 1, 0.36, 1] as const;

// SVG feTurbulence noise, ~5% opacity
const GRAIN_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/** Splits a heading segment into word spans the GSAP reveal can stagger.
 *  Whitespace is preserved as plain text nodes between the spans. */
function headingWords(text: string, keyPrefix: string, accentClass?: string) {
  return text.split(/(\s+)/).map((part, i) => {
    if (part === "") return null;
    if (/^\s+$/.test(part)) {
      return <span key={`${keyPrefix}-${i}`}> </span>;
    }
    return (
      <span
        key={`${keyPrefix}-${i}`}
        className={
          accentClass ? `swh-hero-word ${accentClass}` : "swh-hero-word"
        }
        style={{ display: "inline-block", willChange: "filter, opacity" }}
      >
        {part}
      </span>
    );
  });
}

export function Hero() {
  const reduce = useReducedMotion();
  const t = useTranslations("home.hero");
  const locale = useLocale();

  // Italic cyan accent is design language (EN). Burmese gets color only:
  // Noto Sans Myanmar has no real italic and synthetic oblique breaks
  // stacked diacritics.
  const accentClass = locale === "my" ? "text-accent" : "italic text-accent";

  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const introRef = useRef<HTMLParagraphElement | null>(null);

  // Word-by-word blur reveal. The words are pre-split into spans in JSX
  // (so the accent word keeps its styling), and the H1 paints in its
  // final visible state for LCP (Phase 5.2 intent) before GSAP briefly
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

      const wordEls =
        heading.querySelectorAll<HTMLSpanElement>(".swh-hero-word");
      if (!wordEls.length) return;

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
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-bg"
      />

      {/* Leaf watermark from the SWH mark, draws on once via CSS
          (.leaf-draw in globals.css), then stays static. Width-driven
          sizing (the mark is ~1.76:1 wide) keeps both leaf tips and the
          stem crossing fully inside the hero at every breakpoint:
          desktop 97vh wide ~= 55vh tall, capped at 60vw for narrow
          tablets; mobile 78vw wide so it never reaches the left edge. */}
      <div
        aria-hidden="true"
        className="leaf-draw pointer-events-none absolute bottom-[5vh] right-[4vw] z-0 w-[78vw] max-w-[380px] text-white opacity-[0.04] md:w-[97vh] md:max-w-[60vw] md:opacity-[0.06]"
      >
        <LeafMark className="h-auto w-full" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center sm:px-10">
        <h1
          ref={headingRef}
          className="text-display font-display tracking-tight text-text"
          style={{
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            lineHeight: 1.02,
          }}
        >
          {headingWords(t("headingPre"), "pre")}
          {headingWords(t("headingAccent"), "accent", accentClass)}
          {headingWords(t("headingPost"), "post")}
        </h1>

        <p
          ref={introRef}
          className="mt-8 max-w-2xl text-base font-normal leading-relaxed text-text-muted md:text-lg md:font-medium"
        >
          {t("intro")}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.0 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center"
        aria-hidden="true"
      >
        <motion.span
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
