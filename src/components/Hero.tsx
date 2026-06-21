'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  const socialLinks = [
    {
      name: 'email',
      href: 'mailto:asadbek@example.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'telegram',
      href: 'https://t.me/Khusanov_Asadbek2000',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
    },
    {
      name: 'linkedin',
      href: 'https://www.linkedin.com/in/asadbek-khusanov',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'github',
      href: 'https://github.com/asadbek0512',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: 'instagram',
      href: 'https://instagram.com/INSTAGRAM_PLACEHOLDER',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const cutCorner = {
    clipPath:
      'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Top label (pixila uslubi) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 text-[10px] md:text-[11px] tracking-[0.55em] text-gold/70 font-body uppercase"
      >
        Full-Stack Developer
      </motion.div>

      <motion.div
        className="flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile photo — kichik, nafis */}
        <motion.div variants={itemVariants} className="relative mb-6 md:mb-8">
          <div className="absolute -inset-3 rounded-full border border-gold/20 animate-spin-slow" style={{ animationDuration: '14s' }} />
          <div className="relative w-[104px] h-[104px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden border border-gold/50 shadow-gold-glow">
            <Image
              src="/profile.jpg"
              alt="Khusanov Asadbek"
              fill
              className="object-cover"
              style={{ objectPosition: 'center 15%' }}
              priority
            />
          </div>
        </motion.div>

        {/* ULKAN ism — Anton, 3D chuqurlik */}
        <motion.h1
          variants={itemVariants}
          className="font-display leading-[0.82] tracking-tight select-none"
        >
          <span
            className="block text-[clamp(2.2rem,7vw,6rem)] text-cream"
            style={{ textShadow: '0 2px 0 rgba(0,0,0,0.6), 0 14px 50px rgba(201,168,76,0.22)' }}
          >
            KHUSANOV
          </span>
          <span
            className="block text-[clamp(2.2rem,7vw,6rem)] bg-gradient-to-b from-[#F3E2A8] via-gold to-gold-dark bg-clip-text text-transparent"
            style={{ filter: 'drop-shadow(0 8px 28px rgba(201,168,76,0.3))' }}
          >
            ASADBEK
          </span>
        </motion.h1>

        {/* Divider + subtitle */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mt-6 mb-8">
          <span className="h-px w-10 bg-gold/40" />
          <p className="text-xs md:text-sm tracking-[0.3em] text-cream/70 font-body uppercase">
            {t('hero.subtitle')}
          </p>
          <span className="h-px w-10 bg-gold/40" />
        </motion.div>

        {/* Tugmalar — burchakli (cut-corner) */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-9">
          <motion.a
            href="/files/resume.pdf"
            download
            style={cutCorner}
            className="group flex items-center gap-3 px-8 py-3.5 bg-gold text-background font-body font-bold uppercase tracking-wider text-sm hover:bg-gold-light transition-colors duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {t('hero.download_resume')}
          </motion.a>

          <motion.a
            href="/files/portfolio.pdf"
            download
            style={cutCorner}
            className="group flex items-center gap-3 px-8 py-3.5 border border-gold/50 text-gold font-body font-bold uppercase tracking-wider text-sm hover:bg-gold/10 transition-colors duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {t('hero.download_portfolio')}
          </motion.a>
        </motion.div>

        {/* Social */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.name !== 'email' ? '_blank' : undefined}
              rel={social.name !== 'email' ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-center w-10 h-10 border border-gold/30 text-gold/80 hover:text-background hover:bg-gold hover:border-gold transition-all duration-300"
              style={cutCorner}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Burchak yorliqlari (pixila uslubi) */}
      <div className="absolute bottom-8 left-8 text-[10px] tracking-[0.3em] text-cream/40 uppercase font-body hidden md:block">
        &lt;/&gt; Web · Mobile · API
      </div>
      <div className="absolute bottom-8 right-8 text-[10px] tracking-[0.3em] text-cream/40 uppercase font-body hidden md:block">
        Seoul — Korea
      </div>
    </section>
  );
}
