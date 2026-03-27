import type { Metadata } from 'next';
import { Cormorant_Garamond, Space_Mono } from 'next/font/google';
import { CustomCursor } from '@/components/CustomCursor';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Asadbek Husanov (DONI) - Full Stack Developer Portfolio',
  description: 'Professional portfolio of Asadbek Husanov, a Full Stack Developer based in Seoul, Korea. Specializing in modern web and mobile applications.',
  keywords: ['Full Stack Developer', 'Web Developer', 'Seoul', 'Korea', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Asadbek Husanov' }],
  openGraph: {
    title: 'Asadbek Husanov (DONI) - Full Stack Developer',
    description: 'Professional portfolio of Asadbek Husanov, a Full Stack Developer based in Seoul, Korea.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${spaceMono.variable}`}>
      <body className="font-body bg-background text-cream antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
