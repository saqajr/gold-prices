// gold-prices-portal/src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import AdBanner from '@/components/ads/AdBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Live Gold & Silver Prices | Market Portal',
  description: 'Real-time gold and silver prices for Egypt, Saudi Arabia, UAE, and Kuwait. Expert market analysis and news.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <Header />

        {/* Top Global AdSense Banner Placeholder */}
        <div className="container mx-auto px-4 mt-6">
          <AdBanner className="w-full max-w-4xl mx-auto h-[90px]" />
        </div>

        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer Global AdSense Banner Placeholder */}
        <div className="container mx-auto px-4 mb-6">
          <AdBanner className="w-full max-w-4xl mx-auto h-[90px]" />
        </div>

        <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm mt-auto">
          <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} GoldPrices Portal. All rights reserved.</p>
            <p className="mt-2 text-xs">Prices are for informational purposes only. Local market variations apply.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
