'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'kr', name: '한국어', flag: '🇰🇷' },
  { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
];

interface LanguageSwitcherProps {
  variant?: 'default' | 'small';
}

export default function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isSmall = variant === 'small';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (langCode: string) => {
    setLocale(langCode as 'en' | 'kr' | 'uz');
    setIsOpen(false);
  };

  const currentLangData = languages.find(lang => lang.code === locale) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-full border border-gold/50 text-gold hover:bg-gold/10 transition-all duration-300 ${
          isSmall ? 'px-2.5 py-1.5' : 'px-3 py-2'
        }`}
        aria-label="Select language"
      >
        <span className={isSmall ? 'text-lg' : 'text-xl'}>{currentLangData.flag}</span>
        <span className={`font-body font-semibold hidden sm:block ${isSmall ? 'text-xs' : 'text-sm'}`}>
          {currentLangData.name}
        </span>
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${isSmall ? '' : 'w-4 h-4'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute top-full right-0 mt-2 bg-[#111111] border border-[rgba(201,168,76,0.3)] rounded-[8px] py-2 shadow-[0_8px_32px_rgba(0,0,0,0.6)] z-[9999] ${
              isSmall ? 'w-32' : 'w-40'
            }`}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {languages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-2 px-4 py-2.5 transition-colors hover:bg-[rgba(201,168,76,0.05)] ${
                  isSmall ? 'text-xs' : 'text-sm'
                } ${
                  locale === lang.code ? 'text-gold' : 'text-[#F5F0E8]'
                } ${index < languages.length - 1 ? 'border-b border-[rgba(201,168,76,0.08)]' : ''}`}
              >
                <span className={isSmall ? 'text-base' : 'text-xl'}>{lang.flag}</span>
                <span className="font-body">{lang.name}</span>
                {locale === lang.code && (
                  <svg className={`text-gold ${isSmall ? 'w-3 h-3' : 'w-4 h-4'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
