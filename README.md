# Asadbek Khusanov — Portfolio

Personal portfolio website for Asadbek Khusanov, a Full Stack Developer based in Seoul, South Korea. Built with Next.js 14, 3D visuals, and smooth animations.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion 11 + GSAP 3.12 |
| 3D | Three.js + React Three Fiber + Drei |
| Fonts | Cormorant Garamond + Space Mono |
| i18n | Custom LanguageContext (EN, UZ, KR) |
| Deploy | VPS + Nginx + PM2 |

## Getting Started

```bash
git clone <repo-url>
cd Portifolio

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Features

**Sections**
- **Hero** — animated introduction with interactive 3D rotating code cube (desktop only)
- **About** — personal background, location, and key statistics
- **Tech Stack** — skills and technologies grid with icons
- **Projects** — showcase of real-world projects (Zinfurn, ZuhorBooks, LifeOS, Solven) with live links and descriptions
- **Experience** — work history and professional timeline
- **Education** — academic background including Bucheon University, South Korea
- **Contact** — contact form with social links (Email, Telegram, LinkedIn, GitHub, Instagram)

**Design & UX**
- Dark theme: `#080808` background, `#C9A84C` gold accent, `#F5F0E8` cream text
- Animated particle background
- Custom gold cursor on desktop
- Smooth scroll navigation with fixed navbar that hides on scroll down
- All animations triggered on scroll into view (Framer Motion `whileInView`)
- 3D cube built with React Three Fiber — desktop only, hidden on mobile

**Multilingual**
- English, Uzbek, Korean
- Language preference saved in `localStorage`
- Instant switch with no page reload

**Downloads**
- Portfolio PDF
- Resume PDF

## Project Structure

```
src/
├── app/
│   ├── page.tsx            # All sections assembled here
│   └── globals.css
├── components/             # One component per section
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── TechStack.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Education.tsx
│   ├── Contact.tsx
│   ├── CodeCube.tsx        # 3D cube (dynamic import, SSR disabled)
│   ├── ParticlesBackground.tsx
│   └── CustomCursor.tsx
└── contexts/
    └── LanguageContext.tsx # useLanguage() hook
public/
├── locales/                # en/, uz/, kr/ translation JSON files
├── images/                 # Profile, about, project screenshots
└── files/                  # portfolio.pdf, resume.pdf
```

## Deployment

VPS: built with `npm run build`, served via PM2 on port 5010 behind Nginx with SSL.

## Live

[https://khusanovdev.uz](https://khusanovdev.uz)
