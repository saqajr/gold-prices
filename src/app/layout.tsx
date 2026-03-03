// gold-prices-portal/src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import AdBanner from '@/components/ads/AdBanner';

export const metadata: Metadata = {
  title: 'بوابة أسعار الذهب | أسعار الذهب والفضة لحظة بلحظة',
  description: 'تعرف على أسعار الذهب والفضة في مصر، السعودية، الإمارات، والكويت مباشرة. تحليلات الخبراء وأخبار السوق.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-white text-slate-900 min-h-screen flex flex-col antialiased">
        <Header />

        {/* Top Global AdSense Banner Placeholder */}
        <div className="container mx-auto px-4 mt-6">
          <AdBanner className="w-full max-w-4xl mx-auto h-[90px] border-none shadow-sm rounded-lg overflow-hidden bg-slate-50" />
        </div>

        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer Global AdSense Banner Placeholder */}
        <div className="container mx-auto px-4 mb-6">
          <AdBanner className="w-full max-w-4xl mx-auto h-[90px] border-none shadow-sm rounded-lg overflow-hidden bg-slate-50" />
        </div>

        <footer className="bg-slate-950 text-white py-12 border-t border-gold/20">
          <div className="container mx-auto px-4 text-center">
            <div className="text-2xl font-bold tracking-tighter text-gold mb-4">
              بوابة<span className="text-white">الذهب</span>
            </div>
            <p className="text-slate-400 max-w-md mx-auto mb-6">
              نحن نوفر لك أدق التفاصيل لأسعار الذهب والفضة في الأسواق العربية والعالمية لحظة بلحظة.
            </p>
            <div className="border-t border-slate-800 pt-6 text-sm text-slate-500">
              <p>&copy; {new Date().getFullYear()} بوابة الذهب. جميع الحقوق محفوظة.</p>
              <p className="mt-2 text-xs">الأسعار استرشادية وقد تختلف من تاجر لآخر حسب المصنعية والعرض والطلب.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
