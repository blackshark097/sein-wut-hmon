"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({});

    // Lenis drives scroll, so ScrollTrigger must read its position to stay in sync.
    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    // Late-loading priority images (Hero <Image fill>) shift document height
    // after Lenis init. Recompute ScrollTrigger end positions once everything
    // has loaded, so triggers near the bottom still fire correctly.
    const refreshAfterLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", refreshAfterLoad);

    return () => {
      gsap.ticker.remove(rafCallback);
      window.removeEventListener("load", refreshAfterLoad);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-bg text-text lg:pl-20">
      <Sidebar />
      <main className="flex-1 pt-16 lg:pt-0">{children}</main>
      <Footer />
    </div>
  );
}
