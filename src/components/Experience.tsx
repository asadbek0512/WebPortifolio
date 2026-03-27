'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'NovaBuild Tech',
    role: 'Full Stack Developer',
    period: 'Aug 2023 – Nov 2024',
    location: 'Remote (International)',
    description: [
      'Worked with 8-person international development team',
      'Built SEO-optimized web apps using Next.js, TypeScript, Node.js',
      'Collaborated on feature design and global client deployments',
    ],
  },
  {
    company: 'PageWave Solutions',
    role: 'Frontend Developer',
    period: 'Oct 2022 – Jun 2023',
    location: 'Uzbekistan',
    description: [
      'Worked with 6-person frontend software team',
      'Participated in sprint planning, code reviews, UI/UX discussions',
      'Built responsive interfaces using React and Next.js',
    ],
  },
  // TODO: Add new experience entry here when employed
];

export default function Experience() {
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
              Experience
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/50 to-gold/20" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/0 via-gold/50 to-gold/0 md:-translate-x-1/2" />

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 top-0 w-3 h-3 rounded-full bg-gold transform md:-translate-x-1/2 -translate-x-1/2 shadow-gold-glow z-10" />

                {/* Content */}
                <div className={`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  <motion.div
                    className="p-6 rounded-xl bg-background border border-white/5 hover:border-gold/30 transition-all duration-300"
                    whileHover={{
                      y: -5,
                      boxShadow: '0 10px 40px rgba(201, 168, 76, 0.2)',
                    }}
                  >
                    {/* Period */}
                    <div className="text-gold font-body text-sm mb-2">
                      {exp.period}
                    </div>
                    
                    {/* Role */}
                    <h3 className="text-xl font-heading font-bold text-cream mb-1">
                      {exp.role}
                    </h3>
                    
                    {/* Company & Location */}
                    <div className="text-cream/60 font-body text-sm mb-4">
                      {exp.company} • {exp.location}
                    </div>
                    
                    {/* Description */}
                    <ul className={`space-y-2 ${index % 2 === 0 ? 'md:space-y-reverse' : ''}`}>
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="text-cream/70 font-body text-sm flex items-start gap-2"
                        >
                          <span className="text-gold mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
