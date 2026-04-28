"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

type OpKey = "fleet" | "capture" | "coldChain" | "export";

type Op = { num: string; key: OpKey; image?: string };

const OPS: Op[] = [
  { num: "01", key: "fleet" },
  { num: "02", key: "capture" },
  { num: "03", key: "coldChain" },
  { num: "04", key: "export" },
];

export function FisheriesOperations() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("fisheries.operations");

  useGSAP(
    () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const root = containerRef.current;
      if (!root) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(".swh-fish-card"),
      );
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        });
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: containerRef },
  );

  return (
    <section
      aria-labelledby="fisheries-ops-heading"
      className="relative bg-bg py-32 md:py-44"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="mb-16 max-w-xl md:mb-20">
          <span className="inline-flex items-center gap-3.5 text-subheading text-gold before:block before:h-px before:w-7 before:bg-gold">
            {t("eyebrow")}
          </span>
          <h2
            id="fisheries-ops-heading"
            className="mt-5 font-display font-medium tracking-[-0.02em] text-text"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.08 }}
          >
            {t("heading")}
          </h2>
          <p className="mt-5 max-w-lg text-body text-text-muted">
            {t("intro")}
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
        >
          {OPS.map((op) => (
            <article
              key={op.num}
              className="swh-fish-card group relative isolate flex min-h-[340px] flex-col overflow-hidden border border-border/70 bg-bg-elev px-6 pt-10 pb-9 transition duration-500 hover:-translate-y-1 hover:border-gold/55 hover:bg-[#131c2f] hover:shadow-[0_0_0_1px_rgba(0,173,238,0.25),0_30px_60px_-20px_rgba(0,173,238,0.18)] sm:px-8 md:min-h-[380px] md:px-10 md:pt-12 md:pb-11"
            >
              {op.image ? (
                <>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0"
                  >
                    <Image
                      src={op.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-85"
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-bg-elev/85 via-bg-elev/75 to-bg-elev/95"
                  />
                </>
              ) : null}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse 60% 60% at 100% 0%, rgba(0,173,238,0.14), transparent 60%), radial-gradient(ellipse 80% 40% at 0% 100%, rgba(96,165,250,0.06), transparent 65%)",
                }}
              />

              <span
                aria-hidden="true"
                className="absolute right-6 top-8 z-10 font-display italic text-gold/25 transition-all duration-500 group-hover:text-gold md:right-8 md:top-9"
                style={{
                  fontSize: "clamp(2.25rem, 4vw, 3rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {op.num}
              </span>

              <div className="relative z-10 flex flex-1 flex-col">
                <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold before:block before:h-px before:w-6 before:bg-gold">
                  {t(`items.${op.key}.eyebrow`)}
                </span>
                <h3
                  className="mt-5 max-w-[14ch] font-display font-medium tracking-[-0.02em] text-text"
                  style={{
                    fontSize: "clamp(1.75rem, 2.5vw, 2.375rem)",
                    lineHeight: 1.1,
                  }}
                >
                  {t(`items.${op.key}.title`)}
                </h3>
                <p className="mt-5 max-w-[42ch] text-[15.5px] leading-relaxed text-text-muted">
                  {t(`items.${op.key}.body`)}
                </p>

                <div className="mt-auto pt-9 text-[11px] uppercase tracking-[0.16em] text-text-muted">
                  <span>{t(`items.${op.key}.meta`)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FisheriesOperations;
