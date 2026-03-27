'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    id: 'zinfurn',
    title: 'Zinfurn',
    url: 'https://zinfurn.uz/',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'AI Chat', 'SEO'],
    images: [
      '/projects/zinfurn-1.jpg',
      '/projects/zinfurn-2.jpg',
      '/projects/zinfurn-3.jpg',
    ],
    shortDesc: 'Premium furniture e-commerce platform with AI chat assistant',
    fullDesc: 'Zinfurn is a premium furniture e-commerce platform built with Next.js and Node.js. Features include an AI-powered chat assistant that helps users find furniture by budget and style, advanced real-time filtering by category, material, and color, a community section for user reviews and discussions, agent listings, repair service booking, and a customer support system. The platform serves global clients with full SEO optimization and responsive design across all devices.',
  },
  {
    id: 'zuhorbooks',
    title: 'ZuhorBooks',
    url: 'http://zuhorbooks.uz/',
    technologies: ['React', 'TypeScript', 'REST API', 'Responsive'],
    images: [
      '/projects/zuhorbooks-1.jpg',
      '/projects/zuhorbooks-2.jpg',
      '/projects/zuhorbooks-3.jpg',
    ],
    shortDesc: 'Online book platform with rich catalog and reader-focused UI',
    fullDesc: 'ZuhorBooks is an online book platform built with React. It offers a rich catalog of books organized by genre and category, with a clean reader-focused UI. Users can browse books, view detailed descriptions, and explore curated collections. The platform features smooth navigation, responsive layout for all screen sizes, and optimized performance.',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 relative">
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
              Selected Works
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/50 to-gold/20" />
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: typeof projects[0];
  index: number;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="group relative bg-background rounded-2xl overflow-hidden border border-white/10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{
        y: -6,
        boxShadow: '0 12px 32px rgba(201,168,76,0.08)',
        borderColor: 'rgba(201,168,76,0.3)',
        transition: { duration: 0.4, ease: 'easeOut' },
      }}
    >
      {/* Image Slideshow */}
      <div className="relative aspect-video overflow-hidden group/s slideshow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Image
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-gold/50 text-gold flex items-center justify-center opacity-0 group-hover/s:opacity-100 transition-opacity duration-300 hover:bg-gold hover:text-background"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % project.images.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-gold/50 text-gold flex items-center justify-center opacity-0 group-hover/s:opacity-100 transition-opacity duration-300 hover:bg-gold hover:text-background"
          aria-label="Next image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Navigation Dots — mobile: forced perfect circles via inline style, desktop: original Tailwind classes */}
        <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1">
          {project.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="hidden md:block w-[6px] h-[6px] rounded-[9999px] flex-shrink-0 transition-all duration-300 bg-white/50 hover:bg-white/80"
              style={{ backgroundColor: idx === currentImageIndex ? '#C9A84C' : undefined }}
            />
          ))}
          {project.images.map((_, idx) => (
            <button
              key={`m-${idx}`}
              onClick={() => setCurrentImageIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="block md:hidden"
              style={{
                width: idx === currentImageIndex ? '8px' : '6px',
                height: idx === currentImageIndex ? '8px' : '6px',
                minWidth: idx === currentImageIndex ? '8px' : '6px',
                minHeight: idx === currentImageIndex ? '8px' : '6px',
                borderRadius: '50%',
                backgroundColor: idx === currentImageIndex ? '#C9A84C' : 'rgba(255,255,255,0.5)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Visit Site Button - appears on hover */}
        <motion.a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 px-5 py-2.5 rounded-full border-2 border-gold/70 text-gold font-body text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-400 hover:bg-gold/10"
          initial={{ opacity: 0, y: -10 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          VISIT SITE
        </motion.a>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-heading font-bold text-cream mb-2 group-hover:text-gold transition-colors">
          {project.title}
        </h3>

        {/* Description with Read More */}
        <div className="mb-4">
          <div className={`text-cream/70 font-body text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
            {isExpanded ? project.fullDesc : project.shortDesc}
          </div>

          {project.fullDesc !== project.shortDesc && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-gold font-body text-sm hover:text-gold-light transition-colors flex items-center gap-1"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
              <svg
                className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full bg-gold/10 text-gold font-body border border-gold/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* View Project Link */}
        <motion.a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gold font-body text-sm hover:text-gold-light transition-colors"
          whileHover={{ x: 5 }}
        >
          View Project
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
}