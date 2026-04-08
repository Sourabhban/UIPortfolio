// Developed By Sourabh Ban
import type {Metadata} from 'next';
import { Inter, Space_Grotesk, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

import Preloader from '@/components/Preloader';

export const metadata: Metadata = {
  title: 'SOURABH BAN | UI/UX Developer & Design Engineer',
  description: 'Portfolio of Sourabh Ban - A disruptive UI/UX Developer and Design Engineer specializing in high-performance web experiences and design systems.',
  authors: [{ name: 'Sourabh Ban' }],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="bg-[#f0f0f0] text-black selection:bg-[#00FF00] selection:text-black">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
