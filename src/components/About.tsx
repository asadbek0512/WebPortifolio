'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function About() {
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
              About Me
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
            </motion.div>
          </div>

          {/* Right column: Text content (60%) */}
          <div className="md:col-span-3 order-2">
            <div className="relative">
              {/* Left border accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold via-gold/50 to-transparent rounded-full" />
              
              <p className="pl-6 text-lg md:text-xl text-cream/80 font-body leading-relaxed">
                I&apos;m a Full Stack Developer with 2+ years of experience building scalable web applications. I specialize in React, Next.js, and Node.js ecosystems. Currently based in Seoul, South Korea, holding a D-10 Job Seeker Visa, open to exciting opportunities.
                <br /><br />
                I have worked with international teams delivering production-ready applications for real clients. Passionate about clean code, performance, and turning ideas into polished digital products.
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
                { number: '2+', label: 'Years Experience' },
                { number: '20+', label: 'Projects Completed' },
                { number: '15+', label: 'Technologies' },
                { number: '100%', label: 'Client Satisfaction' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
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
