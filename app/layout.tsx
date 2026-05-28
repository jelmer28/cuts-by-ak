import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cuts by AK · Premium Barber Heerenveen',
  description:
    'Premium barbershop in Heerenveen voor strakke fades, beard trims en moderne cuts. Boek direct online.',
  keywords: ['barber', 'heerenveen', 'kapper', 'fade', 'beard trim'],
  openGraph: {
    title: 'Cuts by AK · Premium Barber Heerenveen',
    description: 'Premium barbershop in Heerenveen. Boek direct online.',
    type: 'website',
    locale: 'nl_NL',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Cuts by AK',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-bg text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
