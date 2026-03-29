'use client';

import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

export default function LanguageSection() {
  return (
    <section className="py-16 md:py-24 relative bg-background/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Label */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/50 to-gold/20" />
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-cream text-center">
              Select Language
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/50 to-gold/20" />
          </div>

          {/* Language Switcher */}
          <div className="flex justify-center">
            <LanguageSwitcher variant="small" />
          </div>

          {/* Description */}
          <p className="text-center text-cream/60 font-body text-sm mt-6">
            Choose your preferred language to view this portfolio
          </p>
        </motion.div>
      </div>
    </section>
  );
}
