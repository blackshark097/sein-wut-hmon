"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Operation = {
  name: string;
  blurb: string;
  image: string | null;
};

const OPERATIONS: Operation[] = [
  {
    name: "Breeder Farms",
    blurb:
      "Grandparent and parent stock farms producing the foundation genetics for the commercial chain.",
    image: "/images/legacy/poultry-i.jpg",
  },
  {
    name: "Hatchery",
    blurb:
      "Day old chick production at volume, supplying both our own farms and commercial growers.",
    image: null,
  },
  {
    name: "Broiler Production",
    blurb:
      "Commercial meat bird farms running on Crystal Diamond Quality Feed.",
    image: "/images/legacy/poultry-intro.jpg",
  },
  {
    name: "Layer Farms",
    blurb: "Egg production at scale for the domestic market.",
    image: null,
  },
  {
    name: "Feed Mill",
    blurb:
      "Integrated feed manufacturing under the Crystal Diamond Quality Feed label.",
    image: "/images/legacy/feed-mill-intro.jpg",
  },
  {
    name: "Veterinary Products",
    blurb:
      "Animal health inputs that keep every stage of the production chain healthy.",
    image: "/images/legacy/veterinary-product-intro.jpg",
  },
];

export function Operations() {
  const containerRef = useRef<HTMLDivElement | null>(null);

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
        root.querySelectorAll(".swh-op-card"),
      );
      if (!cards.length) return;

      cards.forEach((card, index) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: index * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            once: true,
          },
        });
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: containerRef },
  );

  return (
    <section
      aria-labelledby="ops-heading"
      className="relative bg-bg py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div>
          <p className="text-subheading text-gold">Operations</p>
          <h2 id="ops-heading" className="mt-3 text-heading text-text">
            An integrated chain
          </h2>
          <p className="mt-4 max-w-2xl text-body text-text-muted">
            Six operations, one continuous production line.
          </p>
        </div>

        <div
          ref={containerRef}
          className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {OPERATIONS.map((op) => (
            <article
              key={op.name}
              className="swh-op-card group relative overflow-hidden rounded-lg border border-border/60 bg-bg-elev transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_0_0_1px_rgba(197,165,78,0.25),0_24px_60px_-20px_rgba(197,165,78,0.2)]"
            >
              <div className="relative block aspect-[4/3] w-full">
                {op.image ? (
                  <Image
                    src={op.image}
                    alt={op.name}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-[#15261a] via-[#1A2332] to-[#050a0d]"
                      aria-hidden="true"
                    />
                    <span
                      className="absolute inset-0 flex items-center justify-center font-display text-6xl text-gold/40"
                      aria-hidden="true"
                    >
                      {op.name.charAt(0)}
                    </span>
                  </>
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="p-6 md:p-7">
                <p className="text-subheading text-gold">Operation</p>
                <h3 className="mt-3 font-display text-2xl leading-tight tracking-tight text-text md:text-3xl">
                  {op.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {op.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Operations;
