"use client";

import { useTranslations } from "next-intl";

const WORDMARKS = ["OK", "HISENSE", "NASA", "SHWE MYAY THEE"] as const;

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

      <div className="flex w-full max-w-[1100px] flex-wrap items-center justify-center gap-x-12 gap-y-6 lg:gap-x-16">
        {WORDMARKS.map((word) => (
          <span
            key={word}
            className="font-sans text-xl font-medium uppercase leading-none tracking-[0.18em] text-text-muted transition-colors duration-300 hover:text-text lg:text-2xl"
          >
            {word}
          </span>
        ))}
      </div>

      <p className="max-w-[60ch] text-center font-sans text-[13px] tracking-[0.04em] text-[#CBD5E1]">
        {t("partnerBrands.caption")}
      </p>
    </section>
  );
}

export default Brands;
