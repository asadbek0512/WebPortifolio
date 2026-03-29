'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Education() {
  const { t } = useLanguage();
  
  return (
    <section id="education" className="py-20 md:py-32 relative">
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
              {t('education.title')}
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/50 to-gold/20" />
          </div>
        </motion.div>

        {/* Education Card */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row border border-[rgba(201,168,76,0.2)] rounded-[8px] overflow-hidden min-h-[220px] bg-background hover:border-gold/30 transition-all duration-300">
            {/* LEFT: Image (40%) */}
            <div className="sm:w-[40%] relative overflow-hidden rounded-[8px] sm:rounded-r-none sm:rounded-l-[8px]">
              <ImageWithFallback
                src="/bucheon-logo.png"
                alt="Bucheon University"
                fallbackText="BU"
              />
            </div>

            {/* RIGHT: Content (60%) */}
            <div className="sm:w-[60%] p-7">
              {/* University Name */}
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-cream mb-1">
                {t('education.university')}
              </h3>
              <p className="text-lg md:text-xl text-gold font-heading mb-4">
                {t('education.university_kr')}
              </p>

              {/* Degree badges */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold font-body text-sm">
                  {t('education.degree')}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold font-body text-sm">
                  {t('education.degree_kr')}
                </span>
              </div>

              {/* Period */}
              <div className="text-cream/60 font-body text-sm mb-4">
                <span className="inline-flex items-center gap-2">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {t('education.period')}
                </span>
              </div>

              {/* Description */}
              <p className="text-cream/70 font-body text-sm leading-relaxed">
                {t('education.description')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Component with fallback for missing images
function ImageWithFallback({
  src,
  alt,
  fallbackText,
}: {
  src: string;
  alt: string;
  fallbackText: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full min-h-[200px] sm:min-h-0 sm:h-full bg-gold/10 border border-gold/30 flex items-center justify-center">
        <span className="text-4xl md:text-5xl font-heading font-bold text-gold">{fallbackText}</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[200px] sm:min-h-0">
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'contain' }}
        className="bg-white/5"
        onError={() => {
          console.log('Image failed to load:', src);
          setHasError(true);
        }}
        onLoad={() => {
          console.log('Image loaded successfully:', src);
        }}
      />
    </div>
  );
}
