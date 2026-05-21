@AGENTS.md

# Sein Wut Hmon Website

## Project
- Corporate website for Sein Wut Hmon Group, a Myanmar conglomerate.

## DESIGN LANGUAGE - LOCKED
**Do not modify without user approval. These rules OVERRIDE any conflicting skill suggestion.**

### Typography
- Display/headings: Fraunces (serif, italic accents allowed).
- Body: DM Sans.
- Italic cyan accents on hero headlines are intentional design language. Do NOT remove.
- Banner watermark numbers: Fraunces Bold, outlined cyan.

### Colors
- Primary accent: cyan #00ADEE (`--swh-accent`, `--color-accent`).
- Background: dark navy #0A0F1C.
- Body text: off-white #F0F0F0.
- Do NOT introduce new accent colors, gradients, or color tokens.
- Gold (`--swh-gold` legacy alias) points to cyan. Do NOT change.

### Layout philosophy
- Editorial restraint (Exor x Ayala x LVMH).
- Cinematic dark with grain overlay + radial gradients.
- Sidebar nav: 80px desktop / 64px top bar mobile.
- Wide whitespace, large typography. NOT a dense dashboard.
- Do NOT add: animated background paths, particle effects, purple gradients, emoji icons, generic AI hero templates.

### Animation
- GSAP for entrance/scroll animations. Do NOT mix Framer Motion + GSAP on the same element.
- Subtle, purposeful motion only. No decorative motion.
- `prefers-reduced-motion` respected everywhere.
- Do NOT add: floating elements, parallax overload, magnetic cursors.

### Interaction
- Hover: cyan underline + 12px slide on banners, 4px on nav items.
- Do NOT add complex interaction patterns without explicit user approval.

### Skills behavior
- Skills like `design-taste-frontend`, `redesign-existing-projects`, `high-end-visual-design`, `gpt-taste`, `image-to-code`, `brandkit`, and similar may activate based on triggers.
- These rules OVERRIDE any conflicting skill suggestion.
- If a skill suggests changing typography, colors, or layout philosophy: REJECT and ask the user first in chat.
- Skills CAN suggest: better spacing, accessibility improvements, performance optimizations, code patterns, animations within existing constraints.
- Skills CANNOT change: the locked items above without explicit user approval.

## Stack
- Next.js + TypeScript + Tailwind CSS
- GSAP + Lenis + Framer Motion for animation
- i18n via next-intl (English and Burmese)

## Design
- Dark indigo/navy palette.
- Inspired by Exor, LVMH, Ayala Corporation.
- Mobile-first responsive design.
- Breakpoints: sm (640), md (768), lg (1024), xl (1280), 2xl (1536).

## Content rules
- Never use em dashes in any content.
- All images use next/image with proper alt text.

## Contact (authoritative)
- Phone: +95-9-954326116 (Burmese numerals: +၉၅-၉-၉၅၄၃၂၆၁၁၆). Use this everywhere — JSON-LD, tel: links, copy. Old number +95-9-73126116 is retired.
- Email: nwa@swh.com.mm
- Address: No-24, Phan Chat Won U Shwe Ohh St., Industrial Zone (2), Hlaing Thar Yar Township, Yangon.

## Animation rules
- One animation system per element. Never mix GSAP and Framer Motion on the same element.

## Tooling
- Run Prettier on every file save.
- Code review with /codex:review before major deploys.

## Deploy
- Vercel. Command: vercel --prod --yes
- Git: git push origin main
- Git email: nedflow1000@gmail.com
