"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const IMAGES = [
  {
    src: "/images/fisheries/01-underbridge-bow.jpg",
    width: 641,
    height: 855,
    altKey: "image1Alt",
  },
  {
    src: "/images/fisheries/02-fleet-port.jpg",
    width: 854,
    height: 641,
    altKey: "image2Alt",
  },
  {
    src: "/images/fisheries/03-vessel-side.jpg",
    width: 854,
    height: 641,
    altKey: "image3Alt",
  },
  {
    src: "/images/fisheries/04-vessel-stern.jpg",
    width: 641,
    height: 855,
    altKey: "image4Alt",
  },
] as const;

const INTERVAL_MS = 2500;

export function FisheriesGallery() {
  const t = useTranslations("fisheries.gallery");
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    if (reduce) {
      return;
    }
    intervalRef.current = window.setInterval(() => {
      setIndex((current) => (current + 1) % IMAGES.length);
    }, INTERVAL_MS);
  }, [clearTimer, reduce]);

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer, clearTimer]);

  const goPrev = useCallback(() => {
    setIndex((current) => (current - 1 + IMAGES.length) % IMAGES.length);
    startTimer();
  }, [startTimer]);

  const goNext = useCallback(() => {
    setIndex((current) => (current + 1) % IMAGES.length);
    startTimer();
  }, [startTimer]);

  const goTo = useCallback(
    (i: number) => {
      setIndex(i);
      startTimer();
    },
    [startTimer],
  );

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: reduce ? 0.6 : 0.9, ease: EASE, delay },
  });

  return (
    <section
      aria-labelledby="fisheries-gallery-heading"
      aria-label={t("ariaLabel")}
      className="relative bg-bg pb-32 md:pb-44"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.div {...fadeUp(0)} className="max-w-2xl">
          <span className="inline-flex items-center gap-3.5 text-subheading text-accent before:block before:h-px before:w-7 before:bg-accent">
            {t("eyebrow")}
          </span>
          <h2
            id="fisheries-gallery-heading"
            className="mt-5 font-display font-medium tracking-[-0.02em] text-text"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.08,
            }}
          >
            {t.rich("heading", {
              em: (chunks) => (
                <em className="font-normal italic text-accent">{chunks}</em>
              ),
            })}
          </h2>
          <p className="mt-6 max-w-xl text-body text-text-muted">{t("body")}</p>
        </motion.div>

        <motion.div {...fadeUp(0.15)} className="mt-12 md:mt-16">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-border/70 bg-bg-elev sm:aspect-[3/2]">
            {IMAGES.map((image, i) => (
              <Image
                key={image.src}
                src={image.src}
                alt={t(image.altKey)}
                fill
                sizes="(min-width: 1280px) 1140px, 100vw"
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                className={`object-cover transition-opacity duration-700 ease-out ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            <button
              type="button"
              onClick={goPrev}
              aria-label={t("galleryPrevLabel")}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-white/60 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:left-4"
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={t("galleryNextLabel")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/60 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:right-4"
            >
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          </div>

          <div
            role="tablist"
            aria-label={t("galleryDotsLabel")}
            className="mt-6 flex items-center justify-center gap-2.5"
          >
            {IMAGES.map((_, i) => {
              const isActive = i === index;
              return (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={t("galleryDotLabel", {
                    index: i + 1,
                    total: IMAGES.length,
                  })}
                  onClick={() => goTo(i)}
                  className={`h-2 w-2 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                    isActive ? "bg-accent" : "bg-border hover:bg-text-muted"
                  }`}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FisheriesGallery;
