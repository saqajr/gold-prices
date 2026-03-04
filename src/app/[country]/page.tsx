// gold-prices-portal/src/app/[country]/page.tsx
import { countries, CountryCode } from '@/lib/countries';
import PriceDashboard from '@/components/prices/PriceDashboard';
import { notFound } from 'next/navigation';
import { ShieldCheck, Zap, Info } from 'lucide-react';
import FormattedTime from '@/components/layout/FormattedTime';
import BlogSection from '@/components/layout/BlogSection';

export async function generateStaticParams() {
    return Object.keys(countries).map((code) => ({
        country: code,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
    const resolvedParams = await params;
    const code = resolvedParams.country as CountryCode;
    const config = countries[code];

    if (!config) return { title: 'غير موجود' };

    return {
        title: `أسعار الذهب المباشرة في ${config.nameAr} (${config.currency}) | بوابة الذهب`,
        description: `احصل على أسعار الذهب عيار 24، 21، 18 وأسعار الفضة في ${config.nameAr} لحظة بلحظة. عيار الذهب اليوم وتحديثات الأسواق.`,
    };
}

async function getPrices(country: string) {
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');

    try {
        const res = await fetch(`${baseUrl}/api/prices?country=${country}`, {
            next: { revalidate: 60 }
        });

        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        return null;
    }
}

export default async function CountryDashboard({ params }: { params: Promise<{ country: string }> }) {
    const resolvedParams = await params;
    const code = resolvedParams.country as CountryCode;
    const config = countries[code];

    if (!config) {
        notFound();
    }

    const liveData = await getPrices(code);

    return (
        <div className="space-y-10 md:space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Hero Section */}
            <section className="text-right p-8 md:p-14 rounded-3xl relative overflow-hidden bg-white border border-slate-100 shadow-sm">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full" />

                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold-dark rounded-full text-[10px] font-black tracking-widest uppercase border border-gold/10">
                        <Zap size={12} className="animate-pulse" />
                        تحديث حي ومباشر
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.2]">
                            سعر الذهب اليوم في <span className="text-gold"> {config.nameAr}</span>
                        </h1>
                        <p className="text-slate-500 text-base md:text-lg font-medium max-w-2xl leading-relaxed">
                            نشرة أسعار الذهب والفضة في {config.nameAr} بالعملة المحلية ({config.currency})، يتم التحديث كل 5 دقائق لضمان دقة البيانات.
                        </p>
                    </div>

                    {liveData?.timestamp && (
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold bg-slate-50 inline-flex px-3 py-1.5 rounded-lg border border-slate-100">
                            <Info size={14} className="text-gold" />
                            آخر تحديث: <FormattedTime timestamp={liveData.timestamp} />
                        </div>
                    )}
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-12">

                {/* Left Side: Prices Dashboard */}
                <div className="xl:col-span-2">
                    <PriceDashboard
                        initialData={liveData}
                        currencySymbol={config.currencySymbol}
                    />
                </div>

                {/* Right Side: Sidebar */}
                <aside className="space-y-6">
                    <div className="bg-slate-900 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden border border-slate-800">
                        <div className="absolute top-0 right-0 w-full h-1 bg-gold" />
                        <h3 className="font-black text-xl mb-4 flex items-center gap-2">
                            <ShieldCheck className="text-gold" size={24} />
                            نشرة السوق
                        </h3>
                        <p className="text-slate-400 leading-relaxed font-bold mb-6 text-sm">
                            الأسعار في {config.nameAr} قد تختلف من تاجر لآخر بناءً على قيمة المصنعية والضريبة.
                        </p>
                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-gold font-bold text-[11px] uppercase tracking-wider">التداولات مستقرة</span>
                        </div>
                    </div>
                </aside>

            </div>

            {/* Blog Section at the end */}
            <BlogSection />
        </div>
    );
}
