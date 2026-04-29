"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const IMAGES = [
  {
    src: "/images/fertilizer/rice-paddy-farmer.jpg",
    width: 854,
    height: 641,
    altKey: "image1Alt",
  },
  {
    src: "/images/fertilizer/farmers-field.jpg",
    width: 1200,
    height: 1600,
    altKey: "image2Alt",
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

const INTERVAL_MS = 5000;

export function FertilizerGallery() {
  const t = useTranslations("fertilizer.reach");
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) {
      return;
    }
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % IMAGES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  return (
    <div className="mt-12 md:mt-16">
      <div
        className="relative aspect-[3/2] w-full overflow-hidden border border-border/70 bg-bg-elev"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
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
              onClick={() => setIndex(i)}
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
