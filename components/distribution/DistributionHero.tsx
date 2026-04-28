"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

const GRAIN_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export function DistributionHero() {
  const reduce = useReducedMotion();
  const t = useTranslations("distribution.hero");

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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 90% 60% at 15% 100%, rgba(0,173,238,0.14), transparent 55%)",
            "radial-gradient(ellipse 70% 50% at 85% 10%, rgba(96,165,250,0.10), transparent 60%)",
            "radial-gradient(ellipse 120% 80% at 50% 120%, rgba(10,30,56,0.9), transparent 70%)",
            "linear-gradient(180deg, #050914 0%, #0A1628 35%, #0A0F1C 70%, #04070E 100%)",
          ].join(","),
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(105deg, transparent 40%, rgba(0,173,238,0.05) 50%, transparent 60%), linear-gradient(95deg, transparent 55%, rgba(96,165,250,0.03) 62%, transparent 68%)",
          opacity: 0.9,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: "160px 160px" }}
      />

      {/* Decorative network schematic: abstract country-shaped region with routes and branch nodes. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 800 900"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute right-[-6%] top-[8%] z-0 w-[62%] max-w-[820px] opacity-[0.11]"
        style={{ filter: "drop-shadow(0 0 40px rgba(0,173,238,0.15))" }}
      >
        <g
          style={{
            stroke: "var(--swh-accent)",
            fill: "none",
            strokeWidth: 1.1,
            vectorEffect: "non-scaling-stroke",
          }}
        >
          <path
            d="M380,40 C430,70 470,110 495,170 C515,220 510,270 525,320 C545,380 590,410 610,470 C625,520 610,570 585,610 C560,650 520,680 500,720 C480,770 470,820 440,860 C420,880 390,870 375,840 C355,800 360,760 340,720 C315,670 270,650 250,600 C235,560 255,520 240,480 C220,430 175,410 165,360 C155,310 190,270 210,230 C235,180 255,130 300,90 C325,65 350,45 380,40 Z"
            opacity="0.55"
          />
          <path
            d="M320,180 L420,240 L510,310 L540,420 L470,520 L520,620 L430,720 L360,820"
            style={{ strokeDasharray: "3 6", opacity: 0.7 }}
          />
          <path
            d="M320,180 L240,290 L210,400 L260,520 L230,640"
            style={{ strokeDasharray: "3 6", opacity: 0.7 }}
          />
          <path
            d="M420,240 L560,350"
            style={{ strokeDasharray: "3 6", opacity: 0.7 }}
          />
          <path
            d="M510,310 L610,470"
            style={{ strokeDasharray: "3 6", opacity: 0.7 }}
          />
        </g>
        <g style={{ fill: "var(--swh-accent)", opacity: 0.9 }}>
          <circle cx="320" cy="180" r="3.5" />
          <circle cx="420" cy="240" r="3.5" />
          <circle cx="510" cy="310" r="3.5" />
          <circle cx="540" cy="420" r="3.5" />
          <circle cx="470" cy="520" r="3.5" />
          <circle cx="520" cy="620" r="3.5" />
          <circle cx="430" cy="720" r="3.5" />
          <circle cx="360" cy="820" r="3.5" />
          <circle cx="240" cy="290" r="3" />
          <circle cx="210" cy="400" r="3" />
          <circle cx="260" cy="520" r="3" />
          <circle cx="230" cy="640" r="3" />
          <circle cx="560" cy="350" r="3" />
          <circle cx="610" cy="470" r="3" />
        </g>
      </svg>

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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 top-44 hidden origin-top-right rotate-90 text-[11px] font-sans uppercase tracking-[0.32em] text-text-muted xl:block"
      >
        <span className="mx-3.5 text-accent">◆</span>
        {t("marginYangon")}
        <span className="mx-3.5 text-accent">◆</span>
        {t("marginMandalay")}
        <span className="mx-3.5 text-accent">◆</span>
        {t("marginNetwork")}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col px-6 pt-40 pb-32 md:px-10 md:pt-44 md:pb-36">
        <motion.h1
          {...fadeUp(0.3)}
          className="font-display font-medium tracking-[-0.04em] text-text"
          style={{
            fontSize: "clamp(2.75rem, 8vw, 7.5rem)",
            lineHeight: 1.0,
            maxWidth: "14ch",
          }}
        >
          {t.rich("heading", {
            em: (chunks) => (
              <span className="text-accent">{chunks}</span>
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
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center"
        aria-hidden="true"
      >
        <span
          className="block h-12 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--swh-accent))",
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

export default DistributionHero;
