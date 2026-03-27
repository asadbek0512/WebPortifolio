/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        gold: {
          DEFAULT: '#C9A84C',
          light: '#D4B76E',
          dark: '#A68A3A',
        },
        cream: '#F5F0E8',
      },
      fontFamily: {
        heading: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-space-mono)', 'monospace'],
      },
      cursor: {
        gold: 'none',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 168, 76, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(201, 168, 76, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(201, 168, 76, 0.5)',
        'gold-glow-lg': '0 0 50px rgba(201, 168, 76, 0.7)',
      },
    },
  },
  plugins: [],
};
