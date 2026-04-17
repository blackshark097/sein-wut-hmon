import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industrial Inputs, Sein Wut Hmon Group",
  description: "Fertilizer, feed ingredients, and industrial raw materials.",
};

export default function IndustrialInputsPage() {
  return (
    <section aria-labelledby="page-heading" className="relative min-h-[70vh] bg-bg">
      <div className="mx-auto max-w-5xl px-6 md:px-10 pt-40 pb-24 md:pt-48 md:pb-32">
        <p className="text-subheading text-gold">SEIN WUT HMON GROUP</p>
        <h1 id="page-heading" className="mt-4 text-display text-text">
          Industrial Inputs
        </h1>
        <p className="mt-8 text-body max-w-2xl">
          Coming soon. This section is under construction as we rebuild the Sein Wut Hmon website.
        </p>
      </div>
    </section>
  );
}
