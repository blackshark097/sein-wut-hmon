"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const LOGOS = [
  {
    key: "hisense",
    src: "/images/partners/hisense.png",
    width: 1780,
    height: 291,
    alt: "Hisense",
  },
  {
    key: "ok",
    src: "/images/partners/ok.png",
    width: 163,
    height: 204,
    alt: "OK",
  },
  {
    key: "nasa",
    src: "/images/partners/nasa.png",
    width: 1024,
    height: 427,
    alt: "NASA",
  },
  {
    key: "shwe-myay-thee",
    src: "/images/partners/shwe-myay-thee.png",
    width: 230,
    height: 288,
    alt: "Shwe Myay Thee",
  },
] as const;

export function Brands() {
  const t = useTranslations("home.portfolio");

  return (
    <section
      aria-labelledby="brands-heading"
      className="relative flex flex-col items-center gap-12 border-b border-border bg-bg px-6 py-24 md:px-10 lg:gap-16 lg:px-20 lg:py-32"
    >
      <span
        id="brands-heading"
        className="inline-flex items-center gap-3.5 font-sans text-xs font-medium uppercase tracking-[0.32em] text-accent before:block before:h-px before:w-7 before:bg-accent after:block after:h-px after:w-7 after:bg-accent"
      >
        {t("partnerBrands.eyebrow")}
      </span>

      <div className="flex w-full max-w-[1100px] flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:gap-x-12">
        {LOGOS.map((logo) => (
          <div
            key={logo.key}
            className="flex h-12 w-28 items-center justify-center lg:h-14 lg:w-36"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>

      <p className="max-w-[60ch] text-center font-sans text-[13px] tracking-[0.04em] text-[#CBD5E1]">
        {t("partnerBrands.caption")}
      </p>
    </section>
  );
}

export default Brands;
