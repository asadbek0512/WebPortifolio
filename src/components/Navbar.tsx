'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#stack', label: 'Stack' },
  { href: '#experience', label: 'Experience' },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="text-2xl font-bold text-gold font-heading">
              {'< />'}
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-cream/80 hover:text-gold transition-colors duration-200 text-sm font-body"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="px-6 py-2.5 rounded-full bg-gold text-background font-body text-sm font-semibold hover:bg-gold-light transition-colors duration-200"
              >
                Contact
              </a>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden relative" ref={menuRef}>
              <button
                className="p-2 text-cream hover:text-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    className="absolute top-[60px] right-0 w-[200px] bg-[#111111] border border-[rgba(201,168,76,0.3)] rounded-[8px] py-2 shadow-[0_8px_32px_rgba(0,0,0,0.6)] z-[999]"
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    {navLinks.map((link, index) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="block px-5 py-3 text-[13px] tracking-[2px] text-[#F5F0E8] hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,0.05)] transition-colors"
                        style={{
                          borderBottom: index < navLinks.length ? '1px solid rgba(201,168,76,0.08)' : 'none',
                        }}
                      >
                        {link.label}
                      </a>
                    ))}
                    <a
                      href="#contact"
                      onClick={(e) => handleNavClick(e, '#contact')}
                      className="block px-5 py-3 text-[13px] tracking-[2px] text-[#C9A84C] hover:bg-[rgba(201,168,76,0.05)] transition-colors"
                    >
                      Contact
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
