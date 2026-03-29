'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Logo from '@/components/Logo';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/asadbek0512',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/asadbek-khusanov',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'Telegram',
      href: 'https://t.me/Khusanov_Asadbek2000',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/PLACEHOLDER',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:khusanovasadbek777@gmail.com',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative bg-[#080808] border-t border-[rgba(201,168,76,0.2)]">
      <div className="container mx-auto px-4 py-12">
        
        {/* Desktop Layout — 4 Columns */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Branding */}
          <div className="space-y-3">
            <Logo size="sm" />
            <div className="text-sm text-[rgba(245,240,232,0.5)] font-body">
              {t('footer.full_stack_dev') || 'Full Stack Developer'}
            </div>
            <div className="text-sm text-[#C9A84C] font-body">
              {t('footer.seoul_korea') || 'Seoul, South Korea'}
            </div>
          </div>

          {/* Column 2: Navigate */}
          <div>
            <h4 className="text-[11px] tracking-[3px] text-[#C9A84C] uppercase mb-4 font-body">
              {t('footer.navigate') || 'NAVIGATE'}
            </h4>
            <ul className="space-y-2">
              {[
                { key: 'about', label: t('nav.about') || 'About' },
                { key: 'projects', label: t('nav.projects') || 'Projects' },
                { key: 'experience', label: t('nav.experience') || 'Experience' },
                { key: 'contact', label: t('nav.contact') || 'Contact' }
              ].map((item, index) => (
                <li key={item.key}>
                  <a
                    href={`#${item.key}`}
                    onClick={(e) => handleNavClick(e, `#${item.key}`)}
                    className="text-sm text-[rgba(245,240,232,0.7)] hover:text-[#C9A84C] transition-colors duration-200 font-body"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-[11px] tracking-[3px] text-[#C9A84C] uppercase mb-4 font-body">
              {t('footer.services') || 'SERVICES'}
            </h4>
            <ul className="space-y-2">
              {[
                t('footer.web_development') || 'Web Development',
                t('footer.api_design') || 'API Design',
                t('footer.ui_ux') || 'UI/UX'
              ].map((item, index) => (
                <li key={index}>
                  <span className="text-sm text-[rgba(245,240,232,0.7)] font-body">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="text-[11px] tracking-[3px] text-[#C9A84C] uppercase mb-4 font-body">
              {t('footer.connect') || 'CONNECT'}
            </h4>
            
            {/* Social Icons */}
            <div className="flex gap-2 mb-4">
              {socialLinks.slice(0, 4).map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.name !== 'Email' ? '_blank' : undefined}
                  rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="w-9 h-9 flex items-center justify-center border border-[rgba(201,168,76,0.3)] rounded text-[#C9A84C] hover:border-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)] hover:scale-110 transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Email */}
            <a
              href="mailto:khusanovasadbek777@gmail.com"
              className="text-sm text-[rgba(245,240,232,0.7)] hover:text-[#C9A84C] transition-colors duration-200 font-body break-all"
            >
              khusanovasadbek777@gmail.com
            </a>
          </div>
        </div>

        {/* Mobile Layout — CTA Centered */}
        <div className="md:hidden flex flex-col items-center text-center space-y-6 mb-8">
          <p className="text-sm text-[rgba(245,240,232,0.5)] font-body">
            {t('footer.ready_text') || 'Ready to build something great?'}
          </p>
          <h3 className="text-2xl font-heading font-bold text-[#C9A84C]">
            {t('footer.work_text') || "Let's work together"}
          </h3>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-8 py-3 border-2 border-[#C9A84C] text-[#C9A84C] font-body font-semibold rounded-full hover:bg-[#C9A84C] hover:text-[#080808] transition-all duration-200"
          >
            {t('footer.get_in_touch') || 'Get in touch →'}
          </a>

          {/* Social Icons Row */}
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.name !== 'Email' ? '_blank' : undefined}
                rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="w-10 h-10 flex items-center justify-center border border-[rgba(201,168,76,0.3)] rounded-full text-[#C9A84C] hover:border-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)] hover:scale-110 transition-all duration-200"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />

        {/* Bottom Text */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 gap-4">
          <p className="text-sm text-[rgba(245,240,232,0.5)] font-body">
            © {currentYear} Khusanov Asadbek. {t('footer.copyright') || 'All rights reserved.'}
          </p>
          <p className="hidden md:block text-sm text-[rgba(245,240,232,0.5)] font-body">
            {t('footer.built_with') || 'Built with Next.js & ♥'}
          </p>
        </div>
      </div>
    </footer>
  );
}
