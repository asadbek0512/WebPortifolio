'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Tech brand colors
const techColors: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  React: '#61DAFB',
  'Next.js': '#000000',
  'React Native': '#61DAFB',
  Redux: '#764ABC',
  GraphQL: '#E10098',
  'Three.js': '#000000',
  HTML5: '#E34F26',
  CSS3: '#1572B6',
  Sass: '#CC6699',
  'Socket.IO': '#010101',
  'Node.js': '#339933',
  NestJS: '#E0234E',
  'Express.js': '#000000',
  Python: '#3776AB',
  MongoDB: '#47A248',
  MySQL: '#4479A1',
  Docker: '#2496ED',
  Git: '#F05032',
  GitHub: '#181717',
  Linux: '#FCC624',
  NGINX: '#009639',
  PM2: '#2B037A',
  'CI/CD': '#C9A84C',
  VPS: '#C9A84C',
  'REST API': '#C9A84C',
  JWT: '#F7DF1E',
  WebSocket: '#C9A84C',
};

// Technologies that use PNG images instead of SVG
const pngTechs = ['Python', 'Docker', 'GitHub', 'MySQL', 'JWT', 'Linux', 'PM2', 'NestJS', 'NGINX', 'Socket.IO', 'WebSocket', 'REST API', 'Next.js', 'Express.js', 'VPS'];

// Simple Icons SVG paths for technologies that have them
const techIcons: Record<string, JSX.Element> = {
  TypeScript: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.335 0h21.33L24 21.335H0L1.335 0zm3.81 17.678h3.177v-5.62h2.544v5.62h3.177V6.322H1.335v11.356h3.81zm13.692 0h3.177v-1.903h-3.177v1.903zm0-4.445h3.177v-1.902h-3.177v1.902zm0-4.444h3.177V6.887h-3.177v1.902z"/>
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
    </svg>
  ),
  React: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="2.5"/><ellipse cx="12" cy="12" rx="10" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(120 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  'Next.js': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.087c-5.563 0-10.087-4.524-10.087-10.087S6.437 1.913 12 1.913 22.087 6.437 22.087 12 17.563 22.087 12 22.087zm4.743-6.344l-4.125-6.438a.435.435 0 0 0-.75.281v4.688H9.656V9.656h1.719l4.125 6.438a.435.435 0 0 1-.757.281z"/>
    </svg>
  ),
  'React Native': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="2.5"/><circle cx="6" cy="8" r="1.5"/><circle cx="18" cy="8" r="1.5"/><circle cx="6" cy="16" r="1.5"/><circle cx="18" cy="16" r="1.5"/>
    </svg>
  ),
  Redux: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5c-5.799 0-10.5-4.701-10.5-10.5S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5zm4.5-9h-3v3h-3v-3h-3v-3h3v-3h3v3h3v3z"/>
    </svg>
  ),
  GraphQL: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5zm0-19.5c-4.971 0-9 4.029-9 9s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9z"/>
    </svg>
  ),
  'Three.js': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 3.5L12 8l7.5-4.5L12 0 4.5 3.5zm0 8.5L12 16.5l7.5-4.5L12 7.5 4.5 12zm0 8.5L12 24l7.5-4.5L12 15 4.5 20.5z"/>
    </svg>
  ),
  HTML5: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L12 24 3.41 21.563 1.5 0zm10.5 19.5l6.406-1.781.328-3.719H7.5l.281 2.813 4.219 1.125V19.5zm-1-6h5.781l.281-3H5.781l.281 3H11z"/>
    </svg>
  ),
  CSS3: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L12 24 3.41 21.563 1.5 0zm18.328 5.438H12v2.813h6.094l-.563 5.25L12 15.188V18l5.344-1.5 1.031-11.062z"/>
    </svg>
  ),
  Sass: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.875 3.975v15.937L12 24l10.125-4.088V3.975L12 0 1.875 3.975zm14.77 12.21c-2.506 1.006-5.938.468-7.594-1.188-1.656-1.656-2.194-5.088-1.188-7.594.225-.563.506-1.069.844-1.5l6.438 6.438c-.431.337-.938.618-1.5 1.125-1.656 1.656-1.656 4.344 0 6s4.344 1.656 6 0c1.656-1.656 1.656-4.344 0-6-.431-.431-.938-.769-1.5-1.05l-6.438-6.438c.431-.337.938-.618 1.5-1.125 1.656-1.656 4.344-1.656 6 0 1.656 1.656 1.656 4.344 0 6-1.656 1.656-4.344 1.656-6 0z"/>
    </svg>
  ),
  'Socket.IO': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5zm-1.5-6.75v-7.5l6 3.75-6 3.75z"/>
    </svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.629 0 12.001 0zm4.545 17.326l-4.545 2.625-4.545-2.625V6.674l4.545-2.625 4.545 2.625v10.652zm-1.5-9.188l-3.045 1.763-3.045-1.763V4.65l3.045-1.763 3.045 1.763v3.488z"/>
    </svg>
  ),
  'Express.js': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0v24h21V0H1.5zm15.75 16.5H6.75v-1.5h10.5v1.5zm0-4.5H6.75v-1.5h10.5v1.5zm0-4.5H6.75V6h10.5v1.5z"/>
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5zm0-18c-4.142 0-7.5 3.358-7.5 7.5 0 2.578 1.305 4.851 3.281 6.219V9.75h8.438v8.469c1.976-1.368 3.281-3.641 3.281-6.219 0-4.142-3.358-7.5-7.5-7.5z"/>
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5zm-3-9h6v1.5H9v-1.5zm0-3h6v1.5H9v-1.5z"/>
    </svg>
  ),
  'CI/CD': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5zm-1.5-6.75v-7.5l6 3.75-6 3.75z"/>
    </svg>
  ),
  VPS: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5zm-3-9h6v1.5H9v-1.5zm0-3h6v1.5H9v-1.5z"/>
    </svg>
  ),
  'REST API': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5zm-3-9h6v1.5H9v-1.5zm0-3h6v1.5H9v-1.5z"/>
    </svg>
  ),
  WebSocket: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5zm-1.5-6.75v-7.5l6 3.75-6 3.75z"/>
    </svg>
  ),
};

const techStack = {
  frontend: [
    'TypeScript', 'JavaScript', 'React', 'Next.js', 'React Native',
    'Redux', 'GraphQL', 'Three.js', 'HTML5', 'CSS3', 'Sass', 'Socket.IO',
  ],
  backend: [
    'Node.js', 'NestJS', 'Express.js', 'Python', 'MongoDB',
    'MySQL', 'JWT', 'WebSocket', 'Docker', 'REST API',
  ],
  devops: [
    'Linux', 'NGINX', 'Docker', 'PM2', 'CI/CD', 'Git', 'GitHub', 'VPS',
  ],
};

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'devops'>('frontend');
  const sectionRef = useRef<HTMLElement>(null);
  const frontendRef = useRef<HTMLDivElement>(null);
  const backendRef = useRef<HTMLDivElement>(null);
  const devopsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [frontendRef, backendRef, devopsRef].forEach((ref) => {
        if (ref.current) {
          gsap.fromTo(
            ref.current.children,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.03,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" ref={sectionRef} className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Label */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/50 to-gold/20" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-cream text-center">
              Tech Stack
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/50 to-gold/20" />
          </div>
        </motion.div>

        {/* Mobile Tabs */}
        <div className="md:hidden mb-8">
          <div className="flex border-b border-[rgba(201,168,76,0.2)]">
            <button
              onClick={() => setActiveTab('frontend')}
              className={`flex-1 py-3 text-[11px] font-body tracking-[5px] uppercase transition-all duration-200 ${
                activeTab === 'frontend'
                  ? 'text-[#C9A84C] border-b-2 border-[#C9A84C]'
                  : 'text-cream/50'
              }`}
            >
              Frontend
            </button>
            <button
              onClick={() => setActiveTab('backend')}
              className={`flex-1 py-3 text-[11px] font-body tracking-[5px] uppercase transition-all duration-200 ${
                activeTab === 'backend'
                  ? 'text-[#C9A84C] border-b-2 border-[#C9A84C]'
                  : 'text-cream/50'
              }`}
            >
              Backend
            </button>
            <button
              onClick={() => setActiveTab('devops')}
              className={`flex-1 py-3 text-[11px] font-body tracking-[5px] uppercase transition-all duration-200 ${
                activeTab === 'devops'
                  ? 'text-[#C9A84C] border-b-2 border-[#C9A84C]'
                  : 'text-cream/50'
              }`}
            >
              DevOps
            </button>
          </div>
        </div>

        {/* Desktop: 3 Columns with dividers */}
        <div className="hidden md:grid grid-cols-3 gap-0 max-w-6xl mx-auto">
          {/* Frontend Column */}
          <div ref={frontendRef} className="pl-0 pr-8">
            <h3 className="text-[14px] font-body font-semibold text-[#C9A84C] tracking-[6px] uppercase mb-6 pb-3 border-b border-[rgba(201,168,76,0.2)]">
              Frontend
            </h3>
            <div className="flex flex-wrap justify-start items-start gap-[10px] w-full">
              {techStack.frontend.map((tech) => (
                <TechPill key={tech} name={tech} />
              ))}
            </div>
          </div>

          {/* Backend Column */}
          <div ref={backendRef} className="pl-8 pr-8 border-l border-[rgba(201,168,76,0.15)]">
            <h3 className="text-[14px] font-body font-semibold text-[#C9A84C] tracking-[6px] uppercase mb-6 pb-3 border-b border-[rgba(201,168,76,0.2)]">
              Backend
            </h3>
            <div className="flex flex-wrap justify-start items-start gap-[10px] w-full">
              {techStack.backend.map((tech) => (
                <TechPill key={tech} name={tech} />
              ))}
            </div>
          </div>

          {/* DevOps Column */}
          <div ref={devopsRef} className="pl-8 pr-0 border-l border-[rgba(201,168,76,0.15)]">
            <h3 className="text-[14px] font-body font-semibold text-[#C9A84C] tracking-[6px] uppercase mb-6 pb-3 border-b border-[rgba(201,168,76,0.2)]">
              DevOps
            </h3>
            <div className="flex flex-wrap justify-start items-start gap-[10px] w-full">
              {techStack.devops.map((tech) => (
                <TechPill key={tech} name={tech} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Tab Content */}
        <div className="md:hidden">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap justify-start items-start gap-[10px] w-full pt-6">
              {techStack[activeTab].map((tech) => (
                <TechPill key={tech} name={tech} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TechPill({ name }: { name: string }) {
  const color = techColors[name] || '#C9A84C';
  const useImage = pngTechs.includes(name);

  // Special icon mappings for technologies without SVG
  const specialIcons: Record<string, string> = {
    'Socket.IO': 'socketio',
    'WebSocket': 'websocket',
    'REST API': 'restapi',
    'Next.js': 'nextjs',
    'Express.js': 'expressjs',
    'VPS': 'vps',
  };

  return (
    <motion.div
      className="inline-flex items-center gap-3 px-5 py-3 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)] rounded-[8px] cursor-pointer transition-all duration-200"
      style={{ whiteSpace: 'nowrap' }}
      whileHover={{
        y: -2,
        borderColor: 'rgba(255,255,255,0.25)',
      }}
    >
      <div
        className="w-6 h-6 flex items-center justify-center"
        style={{ color }}
      >
        {useImage ? (
          specialIcons[name] ? (
            <img
              src={`/icons/${specialIcons[name]}.png`}
              width="24"
              height="24"
              style={{
                objectFit: 'contain',
                filter: name === 'Next.js' ? 'invert(1)' : 'brightness(0) invert(1)'
              }}
              alt={name}
            />
          ) : (
            <img
              src={`/icons/${name.toLowerCase()}.png`}
              width="24"
              height="24"
              style={{ objectFit: 'contain' }}
              alt={name}
            />
          )
        ) : (
          techIcons[name] || techIcons['Git']
        )}
      </div>
      <span className="text-[15px] text-[#C9A84C] font-body font-medium">
        {name}
      </span>
    </motion.div>
  );
}
