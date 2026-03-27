'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative bg-background/50">
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
              Get In Touch
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/50 to-gold/20" />
          </div>
        </motion.div>

        {/* Contact Content: Icons LEFT, Form RIGHT */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-[60px] items-stretch">
          {/* LEFT: Contact Items (vertical list) */}
          <motion.div
            className="flex flex-col justify-center h-full w-full"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            {/* Email */}
            <a
              href="mailto:khusanovasadbek777@gmail.com"
              className="flex items-center gap-4 p-4 md:p-[16px_20px] border border-[rgba(201,168,76,0.15)] rounded-[8px] mb-3 transition-all duration-200 hover:border-[rgba(201,168,76,0.6)] hover:bg-[rgba(201,168,76,0.05)]"
            >
              <svg className="w-6 h-6 text-[#C9A84C] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <div>
                <div className="text-[11px] tracking-[3px] text-[rgba(245,240,232,0.5)] uppercase mb-1">
                  Email
                </div>
                <div className="text-[14px] text-[#F5F0E8]">
                  khusanovasadbek777@gmail.com
                </div>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/asadbek0512"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 md:p-[16px_20px] border border-[rgba(201,168,76,0.15)] rounded-[8px] mb-3 transition-all duration-200 hover:border-[rgba(201,168,76,0.6)] hover:bg-[rgba(201,168,76,0.05)]"
            >
              <svg className="w-6 h-6 text-[#C9A84C] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              <div>
                <div className="text-[11px] tracking-[3px] text-[rgba(245,240,232,0.5)] uppercase mb-1">
                  GitHub
                </div>
                <div className="text-[14px] text-[#F5F0E8]">
                  github.com/asadbek0512
                </div>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/asadbek-khusanov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 md:p-[16px_20px] border border-[rgba(201,168,76,0.15)] rounded-[8px] mb-3 transition-all duration-200 hover:border-[rgba(201,168,76,0.6)] hover:bg-[rgba(201,168,76,0.05)]"
            >
              <svg className="w-6 h-6 text-[#C9A84C] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <div>
                <div className="text-[11px] tracking-[3px] text-[rgba(245,240,232,0.5)] uppercase mb-1">
                  LinkedIn
                </div>
                <div className="text-[14px] text-[#F5F0E8]">
                  linkedin.com/in/asadbek-khusanov
                </div>
              </div>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/Khusanov_Asadbek2000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 md:p-[16px_20px] border border-[rgba(201,168,76,0.15)] rounded-[8px] mb-3 transition-all duration-200 hover:border-[rgba(201,168,76,0.6)] hover:bg-[rgba(201,168,76,0.05)]"
            >
              <svg className="w-6 h-6 text-[#26A5E4] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <div>
                <div className="text-[11px] tracking-[3px] text-[rgba(245,240,232,0.5)] uppercase mb-1">
                  Telegram
                </div>
                <div className="text-[14px] text-[#F5F0E8]">
                  @Khusanov_Asadbek2000
                </div>
              </div>
            </a>
          </motion.div>

          {/* RIGHT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-heading font-bold text-cream mb-6">
              Get In Touch
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-cream/80 font-body mb-2 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-[12px] rounded-[4px] bg-[#1a1a1a] border border-[rgba(201,168,76,0.3)] text-cream font-body focus:border-[#C9A84C] focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-cream/80 font-body mb-2 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-[12px] rounded-[4px] bg-[#1a1a1a] border border-[rgba(201,168,76,0.3)] text-cream font-body focus:border-[#C9A84C] focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-cream/80 font-body mb-2 text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-[12px] rounded-[4px] bg-[#1a1a1a] border border-[rgba(201,168,76,0.3)] text-cream font-body focus:border-[#C9A84C] focus:outline-none transition-colors resize-none"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="w-full py-[12px] rounded-full bg-[#C9A84C] text-background font-body font-semibold hover:bg-[#D4B76E] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
