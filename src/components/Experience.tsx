'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Experience() {
  const { t } = useLanguage();

  const experiences = [
    {
      company: 'NovaBuild Tech',
      role: t('experience.nova_role'),
      period: t('experience.nova_period'),
      location: t('experience.nova_location'),
      description: Array.from({ length: 14 }, (_, i) => t(`experience.nova_desc${i + 1}`)).filter(Boolean),
    },
  ];
  
  return (
    <section id="experience" className="py-20 md:py-32 relative bg-background/50">
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
              {t('experience.title')}
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/50 to-gold/20" />
          </div>
        </motion.div>

        {/* Timeline replaced with centered layout for single experience */}
        <div className="max-w-5xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Card */}
              <motion.div
                className="p-8 md:p-12 rounded-2xl bg-background/80 border border-white/10 hover:border-gold/30 transition-all duration-500 backdrop-blur-sm"
                whileHover={{
                  y: -5,
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 20px rgba(201, 168, 76, 0.1)',
                }}
              >
                {/* Header: Role, Company, Period */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-8">
                  <div>
                    <div className="text-gold font-body text-sm font-medium tracking-widest uppercase mb-3">
                      {exp.period}
                    </div>
                    <h3 className="text-3xl md:text-5xl font-heading font-bold text-cream mb-2">
                      {exp.role}
                    </h3>
                    <div className="text-xl text-cream/60 font-body">
                      <span className="text-gold font-bold">{exp.company}</span> • {exp.location}
                    </div>
                  </div>
                </div>
                
                {/* Description Grid */}
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                  {exp.description.map((item, i) => (
                    <motion.div
                      key={i}
                      className="group flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-gold/50 group-hover:bg-gold shadow-[0_0_8px_rgba(201,168,76,0.3)] transition-all duration-300" />
                      <p className="text-cream/70 font-body text-sm md:text-base leading-relaxed group-hover:text-cream transition-colors duration-300">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
