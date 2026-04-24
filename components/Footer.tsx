import Image from "next/image";
import Link from "next/link";

// Contact details sourced from content/scraped-content.md (legacy seinwuthmon.com).
// Address and phone are the real values from the legacy site footer.
// TODO: No public email address was listed on the legacy site. Replace the
// placeholder below once marketing confirms a canonical contact address.
const ADDRESS =
  "No-24, Phan Chat Won U Shwe Ohh St., Industrial Zone (2), Hlaing Thar Yar Township, Yangon";
const PHONE_DISPLAY = "(+959) 73126116";
const PHONE_HREF = "+95973126116";
const EMAIL = "nwa@swh.com.mm";

const exploreLinks = [
  { href: "/about", label: "About" },
  { href: "/fisheries", label: "Fisheries" },
  { href: "/industrial-inputs", label: "Industrial Inputs" },
  { href: "/distribution", label: "Distribution" },
  { href: "/csr", label: "CSR" },
  { href: "/contact", label: "Contact" },
];

const subheadingClass = "mb-4 text-xs uppercase tracking-wider text-text-muted";

const linkBaseClass =
  "text-text-muted transition hover:text-text focus-visible:outline focus-visible:outline-gold";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="w-full border-t border-border bg-bg-elev py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Image
              src="/images/legacy/logo.png"
              alt="Sein Wut Hmon Group"
              width={160}
              height={44}
              className="h-auto w-40"
            />
            <p className="font-display text-xl text-text">
              Sein Wut Hmon Group
            </p>
            <p className="text-sm text-text-muted">{ADDRESS}</p>
          </div>

          {/* Explore column */}
          <nav aria-label="Footer navigation">
            <h2 className={subheadingClass}>Explore</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkBaseClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <div>
            <h2 className={subheadingClass}>Contact</h2>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a href={`tel:${PHONE_HREF}`} className={linkBaseClass}>
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className={linkBaseClass}>
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {/* Language column */}
          <div>
            <h2 className={subheadingClass}>Language</h2>
            {/* TODO: replace with next-intl locale links once i18n routing exists.
                Rendered as static text today to avoid fake interactivity. */}
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <span className="text-accent">English</span>
              </li>
              <li>
                <span className="text-text-muted">Myanmar</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-border/40 pt-8 text-xs text-text-muted md:flex-row">
          <p>&copy; {year} Sein Wut Hmon Group. All rights reserved.</p>
          <p>Built in Yangon.</p>
        </div>
      </div>
    </footer>
  );
}
