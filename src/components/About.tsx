'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-20 md:py-32 relative bg-background/50">
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
              {t('about.title')}
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/50 to-gold/20" />
          </div>
        </motion.div>

        {/* Two-column layout: Image LEFT (40%), Text RIGHT (60%) */}
        <motion.div
          className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 md:gap-12 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Left column: Image (40%) */}
          <div className="md:col-span-2 order-1">
            <motion.div
              className="relative w-full aspect-[4/5] max-w-md mx-auto md:max-w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <ImageWithFallback
                src="/about.jpg"
                alt="Asadbek Husanov"
                fallbackText="A"
                className="w-full h-full object-cover rounded-lg border border-gold/30 shadow-gold-glow"
              />
              {/* Overlay shadow from all 4 sides */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-black/15 via-transparent to-black/15 pointer-events-none" />
            </motion.div>
          </div>

          {/* Right column: Text content (60%) */}
          <div className="md:col-span-3 order-2">
            <div className="relative">
              {/* Left border accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold via-gold/50 to-transparent rounded-full" />
              
              <p className="pl-6 text-lg md:text-xl text-cream/80 font-body leading-relaxed">
                {t('about.description')}
              </p>
            </div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 md:gap-6 mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                { number: '2+', label: t('about.stats.years') },
                { number: '20+', label: t('about.stats.projects') },
                { number: '15+', label: t('about.stats.technologies') },
                { number: '100%', label: t('about.stats.satisfaction') },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-xl bg-background border border-white/5 hover:border-gold/30 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5, borderColor: '#C9A84C' }}
                >
                  <div className="text-3xl md:text-4xl font-heading font-bold text-gold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-cream/60 text-sm font-body">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
  className,
}: {
  src: string;
  alt: string;
  fallbackText: string;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gold/10 border border-gold/30 ${className}`}>
        <span className="text-6xl md:text-7xl font-heading font-bold text-gold">{fallbackText}</span>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
