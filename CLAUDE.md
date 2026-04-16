@AGENTS.md

# Sein Wut Hmon Website

## Project
- Corporate website for Sein Wut Hmon Group, a Myanmar conglomerate.

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

## Animation rules
- One animation system per element. Never mix GSAP and Framer Motion on the same element.

## Tooling
- Run Prettier on every file save.
- Code review with /codex:review before major deploys.

## Deploy
- Vercel. Command: vercel --prod --yes
- Git: git push origin main
- Git email: nedflow1000@gmail.com
