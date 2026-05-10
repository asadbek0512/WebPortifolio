# Asadbek Portfolio

Personal portfolio site — single-page with smooth scroll navigation, 3D elements, animations, and trilingual support (en, uz, kr). Location: Seoul, South Korea.

## Tech Stack

- Framework: Next.js 14.2 + TypeScript (App Router)
- Styling: Tailwind CSS 3.4
- Animations: Framer Motion 11 + GSAP 3.12
- 3D: Three.js + React Three Fiber + React Three Drei
- Fonts: Cormorant Garamond (headings) + Space Mono (body)
- i18n: Custom `LanguageContext` (localStorage, 3 locales: en, uz, kr)
- Deploy: VPS + Nginx + SSL

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # Fonts, metadata, favicon
│   ├── page.tsx                # Homepage — all sections assembled here
│   └── globals.css             # Global styles
├── components/
│   ├── Navbar.tsx              # Fixed nav, hides on scroll
│   ├── Footer.tsx              # Desktop: 4 columns, Mobile: CTA
│   ├── Hero.tsx                # Profile + 3D cube
│   ├── About.tsx               # Stats section
│   ├── TechStack.tsx           # Skills grid
│   ├── Projects.tsx            # Project carousel
│   ├── Experience.tsx          # Timeline
│   ├── Education.tsx
│   ├── Contact.tsx             # Contact form (console.log — no backend yet)
│   ├── CodeCube.tsx            # 3D rotating cube (desktop only)
│   ├── ParticlesBackground.tsx # Animated background
│   ├── CustomCursor.tsx        # Gold cursor
│   ├── LanguageSwitcher.tsx
│   └── Providers.tsx           # Context providers
└── contexts/
    └── LanguageContext.tsx     # useLanguage() hook

public/
├── files/                      # portfolio.pdf, resume.pdf
├── locales/                    # en/, uz/, kr/ — translation JSON files
└── images/                     # profile.jpg, about.jpg, logos
```

## Key Conventions

- App Router — no Pages Router patterns
- 3D components require `dynamic(() => import(...), { ssr: false })` — never import directly
- i18n: `useLanguage()` hook, `t('key')` pattern, translations in `public/locales/{en,uz,kr}/common.json`
- Design system: `#080808` (background), `#C9A84C` (gold accent), `#F5F0E8` (cream text)
- `CodeCube` renders only on desktop — hidden on mobile via CSS
- Contact form currently logs to console — no backend connected yet

## Commands

```bash
npm run dev     # Dev server
npm run build   # Production build
npm start       # Production server (port 5010)
npm run lint    # ESLint
```

## Environment Variables

No `.env` required — all config is static. Backend env var will be needed when the contact form is connected.

## Deployment

VPS: Nginx with SSL. Production runs on port 5010. Deployed via `deploy.sh`.
