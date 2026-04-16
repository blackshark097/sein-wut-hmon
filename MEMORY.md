# SWH Website - Session Log

## 2026-04-16
- Project initialized. Next.js + Vercel setup complete.
- Added project infrastructure: CLAUDE.md rules (stack, design, animation, deploy), MEMORY.md session log, .claude/commands/end-session.md.
- Installed animation and i18n deps: gsap, @gsap/react, lenis, framer-motion, lucide-react, next-intl.
- Updated .gitignore: .vercel, .playwright-mcp/, root-level *.png.
- Added Obsidian integration: ZayVault/03-SWH/ with context.md, log.md, and Sessions/ folder.
- Updated /end-session command to run Evolve Lite, write session summary to Obsidian Sessions/, and append log entry.
- Scraped legacy seinwuthmon.com: 11 pages to content/scraped-content.md (1,476 lines), 42 images to public/images/legacy/ (~4.7 MB) with README manifest.
- Legacy site is mostly English with one Burmese paragraph (Marubeni JV blurb on Fertilizer page). Distributing page has stats: 145 vehicles, 80 motorcycles, 350 persons, 14 branch offices.
- Design system shipped: dark navy palette tokens in app/globals.css @theme (Tailwind v4), Fraunces (display) + Plus Jakarta Sans (body) via next/font/google, components/Layout.tsx with Lenis + GSAP ticker (reduced-motion aware), components/Navigation.tsx full-screen overlay menu with Framer Motion, components/Footer.tsx minimal corporate footer using real scraped address + phone.
- Contact source of truth: No-24, Phan Chat Won U Shwe Ohh St., Industrial Zone (2), Hlaing Thar Yar Township, Yangon. Phone (+959) 73126116. No public email on legacy site yet.
- Codex review pass: fixed focus-visible rings on nav toggle and overlay links, reduced-motion now shortcuts overlay transition, EN/MM language controls rendered as static text in Nav and Footer until next-intl routing lands.
- Production build passes (next build, Turbopack, 4 static routes).
