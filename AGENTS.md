# AI Agent Guide — Asadbek Portfolio

This file helps AI coding agents understand the portfolio codebase quickly.

## What is this?

A single-page Next.js 14 App Router portfolio with 3D elements (Three.js), animations (Framer Motion + GSAP), and a custom multilingual system (en, uz, kr). No backend — all content is static. Contact form currently logs to console.

## Quick orientation

| What | Where |
|---|---|
| All sections assembled | `src/app/page.tsx` |
| Section components | `src/components/` |
| i18n hook | `src/contexts/LanguageContext.tsx` |
| Translations | `public/locales/{en,uz,kr}/common.json` |
| Global styles | `src/app/globals.css` |
| Profile image | `public/images/profile.jpg` |
| Resume / PDF | `public/files/` |

## Architecture decisions

- Single-page app — all sections imported and assembled in `src/app/page.tsx`
- App Router with no dynamic routes — fully static portfolio
- Custom `LanguageContext` instead of a library — stores locale in `localStorage`
- 3D components loaded with `dynamic(..., { ssr: false })` — required for Three.js
- Design system enforced: only `#080808`, `#C9A84C`, `#F5F0E8` are used

## Key patterns to follow

- New section: create `src/components/{SectionName}.tsx`, import in `src/app/page.tsx`
- New text: add key to all 3 locale files (`public/locales/en/common.json`, `uz/`, `kr/`) simultaneously
- Animations: use Framer Motion `whileInView` for scroll-triggered animations
- 3D component: always wrap with `dynamic(() => import(...), { ssr: false })`
- Mobile: `CodeCube` is desktop-only — everything else must be fully responsive

## Build and verify

```bash
npm run build   # Production build — catches type errors
npm run lint    # ESLint
npm run dev     # Dev server
```

## Things to avoid

- Using Pages Router patterns
- Changing the color palette without approval (`#080808`, `#C9A84C`, `#F5F0E8` only)
- Importing Three.js components without `ssr: false` — will crash server render
- Missing translation keys in any of the 3 locale files
- `console.log` in production (the contact form placeholder is the only exception)
