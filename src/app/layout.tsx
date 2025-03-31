import './globals.css';
import type { Metadata } from 'next';
import { Inter, Raleway } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
});

export const metadata: Metadata = {
  title: 'Diamond Studs | Premium Lab-Created Diamond Jewelry',
  description: 'Discover our premium collection of lab-created diamond studs. Play our Diamond Street game to unlock exclusive discounts of up to 50% off.',
  keywords: 'diamond studs, lab-created diamonds, diamond jewelry, diamond earrings',
  openGraph: {
    title: 'Diamond Studs | Premium Lab-Created Diamond Jewelry',
    description: 'Discover our premium collection of lab-created diamond studs. Play our Diamond Street game to unlock exclusive discounts of up to 50% off.',
    url: 'https://diamondstuds.example.com',
    siteName: 'Diamond Studs',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Diamond Studs',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diamond Studs | Premium Lab-Created Diamond Jewelry',
    description: 'Discover our premium collection of lab-created diamond studs. Play our Diamond Street game to unlock exclusive discounts of up to 50% off.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${raleway.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
