"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMAGES = [
  {
    src: "/images/fertilizer/rice-paddy-farmer.jpg",
    width: 854,
    height: 641,
    altKey: "image1Alt",
  },
  {
    src: "/images/fertilizer/03-warehouse-material.jpg",
    width: 1600,
    height: 1200,
    altKey: "image3Alt",
  },
  {
    src: "/images/fertilizer/04-warehouse-bags.jpg",
    width: 1600,
    height: 1200,
    altKey: "image4Alt",
  },
  {
    src: "/images/fertilizer/05-distribution-truck.jpg",
    width: 1600,
    height: 1200,
    altKey: "image5Alt",
  },
  {
    src: "/images/fertilizer/06-community-training.jpg",
    width: 1600,
    height: 1200,
    altKey: "image6Alt",
  },
] as const;

const INTERVAL_MS = 2500;

export function FertilizerGallery() {
  const t = useTranslations("fertilizer.reach");
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

  return (
    <div className="mt-12 md:mt-16">
      <div className="relative aspect-[3/2] w-full overflow-hidden border border-border/70 bg-bg-elev">
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
    </div>
  );
}

export default FertilizerGallery;
