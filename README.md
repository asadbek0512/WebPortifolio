# Asadbek Husanov (DONI) - Full Stack Developer Portfolio

A professional portfolio website built with Next.js 14, TypeScript, and modern web technologies.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, GSAP + ScrollTrigger
- **3D Effects:** Three.js with React Three Fiber + Drei
- **i18n:** next-intl (English / Korean)

## 🎨 Design Features

- **Color Scheme:**
  - Background: Black (#080808)
  - Accent: Gold (#C9A84C)
  - Text: Cream (#F5F0E8)

- **Typography:**
  - Headings: Cormorant Garamond
  - Body/Code: Space Mono

- **Special Features:**
  - Sticky navbar with scroll hide/show behavior
  - Custom gold cursor (desktop only)
  - Mobile hamburger menu with fullscreen overlay
  - Three.js particle background
  - GSAP scroll-triggered animations
  - Bilingual support (EN/KO)
  - Fully responsive design with mobile tabs for tech stack

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── Navbar.tsx           # Sticky navbar with mobile menu
│   ├── LanguageToggle.tsx   # EN/KO language switcher
│   ├── Hero.tsx             # Hero with social icons & download buttons
│   ├── About.tsx            # About Me section with stats
│   ├── TechStack.tsx        # 3-column tech stack with icons
│   ├── Projects.tsx         # Project cards with expandable descriptions
│   ├── Experience.tsx       # Timeline experience section
│   ├── Education.tsx        # Education section
│   ├── Contact.tsx          # Contact links section
│   └── ParticlesBackground.tsx
├── i18n.ts
└── messages/
    ├── en.json
    └── ko.json
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Add your files:
   - `public/profile.jpg` - Profile photo (512x512px recommended)
   - `public/bucheon-logo.png` - University logo (optional)
   - `public/projects/*.jpg` - Project screenshots
   - `public/files/portfolio.pdf` - Portfolio PDF
   - `public/files/resume.pdf` - Resume PDF

3. Update contact info in `src/messages/en.json` and `src/messages/ko.json`:
   - Email address
   - Telegram username
   - LinkedIn profile
   - Instagram username

4. Run the development server:
```bash
npm run dev
```

5. Open your browser:
   - Root: http://localhost:3000 (redirects to /en)
   - English: http://localhost:3000/en
   - Korean: http://localhost:3000/ko

## 🌐 Internationalization

The site supports two languages with URL-based routing:
- **English:** `/en`
- **Korean:** `/ko`

Language toggle is available in the top-right corner of the website.

## 📱 Sections

1. **Navbar** - Sticky, hides on scroll down, shows on scroll up, mobile hamburger menu
2. **Hero** - Profile photo with spinning gold ring, social icons (Email, Telegram, LinkedIn, GitHub, Instagram), download buttons
3. **About Me** - Introduction paragraph with animated stats grid
4. **Tech Stack** - 3 columns (Frontend/Backend/DevOps) with icons, mobile tabs
5. **Projects** - Slideshow cards with expandable descriptions (Zinfurn, ZuhorBooks)
6. **Experience** - Timeline layout with 2 entries (NovaBuild Tech, PageWave Solutions)
7. **Education** - Bucheon University card with logo
8. **Contact** - Contact links (Email, GitHub, LinkedIn, Telegram)

## 🎯 Customization

### Update Personal Info
Edit the message files:
- `src/messages/en.json` - English content
- `src/messages/ko.json` - Korean content

### Add/Modify Projects
Edit `src/components/Projects.tsx` and add corresponding images to `public/projects/`

### Add Experience
Edit `src/components/Experience.tsx` - there's a TODO comment where you can add new entries.

### Change Colors
Update `tailwind.config.js` color values in the `theme.extend.colors` section

### Update Tech Stack
Edit the `techStack` object in `src/components/TechStack.tsx`

## 📄 Build & Deploy

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to Other Platforms
The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Docker

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📝 Notes

- The custom cursor only appears on desktop (screen width > 768px)
- Three.js particles are disabled on mobile for performance
- Tech stack shows as 3 columns on desktop, tabs on mobile
- Navbar hides when scrolling down, shows when scrolling up
- Images should be added to the `public/` folder before building
- The site uses static generation (SSG) for optimal performance
- All text content is bilingual (EN/KO) via next-intl

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 👤 Author

**Asadbek Husanov (DONI)**
- Location: Seoul, Korea
- University: Bucheon University
- Visa: D-10
- Status: Open to Work

---

Built with ❤️ in Seoul, Korea
