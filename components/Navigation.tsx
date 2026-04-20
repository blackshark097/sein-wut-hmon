"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
};

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Food & Agriculture", href: "/food-agriculture" },
  { label: "Fisheries", href: "/fisheries" },
  { label: "Industrial Inputs", href: "/industrial-inputs" },
  { label: "Distribution", href: "/distribution" },
  { label: "CSR", href: "/csr" },
  { label: "Contact", href: "/contact" },
];

/**
 * Navigation renders the fixed top bar and the full-screen overlay menu as a
 * single continuous unit: the top bar lives inside the overlay layer, so the
 * logo, language pill, and menu toggle stay mounted and visible in both states.
 * Framer Motion drives every transition here; no GSAP inside this component.
 */
export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Close on Escape while the overlay is open.
  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((value) => !value);

  const linkInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 40 };
  const linkAnimate = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0 };
  const linkExit = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 20 };

  return (
    <>
      {/* Fixed top bar, always visible above overlay content. */}
      <div className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-bg/40 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-5 md:px-10">
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="Sein Wut Hmon Group, home"
            className="relative z-[70] inline-flex items-center"
          >
            <Image
              src="/images/legacy/logo.png"
              alt="Sein Wut Hmon Group"
              width={140}
              height={40}
              priority
            />
          </Link>

          <div className="relative z-[70] flex items-center gap-4">
            {/* TODO: replace with next-intl locale switcher. Rendered as static
                text (not buttons) to avoid fake interactivity until routing exists. */}
            <div
              aria-label="Current language: English"
              className="inline-flex items-center rounded-full border border-border/60 bg-bg-elev/40 p-1 text-sm font-sans tracking-wide"
            >
              <span className="rounded-full px-3 py-1 text-text">EN</span>
              <span className="rounded-full px-3 py-1 text-text-muted">MM</span>
            </div>

            <button
              type="button"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-bg-elev/40 text-text transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen overlay menu. Sits just below the top bar controls. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="swh-nav-overlay"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            {/* Hover gradient placeholder. TODO: swap for real hover imagery per link */}
            <AnimatePresence>
              {hoveredIndex !== null && !prefersReducedMotion && (
                <motion.div
                  key={`hover-${hoveredIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent"
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>

            <nav
              aria-label="Primary"
              className="relative flex min-h-full items-center px-6 pt-28 pb-16 md:px-10"
            >
              <ul className="flex w-full flex-col gap-3 md:gap-4">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={prefersReducedMotion ? false : linkInitial}
                    animate={linkAnimate}
                    exit={prefersReducedMotion ? linkAnimate : linkExit}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: prefersReducedMotion ? 0 : 0.08 + index * 0.06,
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() =>
                      setHoveredIndex((current) =>
                        current === index ? null : current,
                      )
                    }
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() =>
                      setHoveredIndex((current) =>
                        current === index ? null : current,
                      )
                    }
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="font-display block text-4xl font-semibold leading-[1.05] tracking-tight text-text transition-colors hover:text-gold focus-visible:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold md:text-6xl lg:text-7xl"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;
