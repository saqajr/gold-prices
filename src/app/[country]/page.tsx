// gold-prices-portal/src/app/[country]/page.tsx
import { countries, CountryCode } from '@/lib/countries';
import PriceTable, { PriceRow } from '@/components/prices/PriceTable';
import AdBanner from '@/components/ads/AdBanner';
import { notFound } from 'next/navigation';
import { ShieldCheck, Zap, Info } from 'lucide-react';

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

    const goldPrices: PriceRow[] = liveData?.gold || [
        { label: 'بيانات السوق غير متوفرة', buyPrice: 0, sellPrice: 0 }
    ];

    const silverPrices: PriceRow[] = liveData?.silver || [
        { label: 'بيانات السوق غير متوفرة', buyPrice: 0, sellPrice: 0 }
    ];

    return (
        <div className="space-y-10 md:space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Hero Section */}
            <section className="text-right bg-slate-50 border border-slate-100 p-6 md:p-16 rounded-[2.5rem] relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 w-96 h-96 bg-gold/10 blur-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full" />

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold-dark rounded-full text-xs font-black mb-8 border border-gold/20 backdrop-blur-sm">
                        <Zap size={14} className="animate-pulse" />
                        تحديث حي ومباشر
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                        سعر الذهب اليوم في <span className="text-gold"> {config.nameAr}</span>
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed mb-10">
                        نقدم لك تقريرًا شاملاً لأسعار الذهب والفضة في {config.nameAr} بالعملة المحلية ({config.currency})، محدثًا لحظة بلحظة من قلب السوق لضمان أدق البيانات.
                    </p>

                    {liveData?.timestamp && (
                        <div className="flex items-center gap-3 text-sm text-slate-400 font-bold bg-white/50 inline-flex px-4 py-2 rounded-lg border border-slate-100">
                            <Info size={16} className="text-gold" />
                            آخر تحديث: {new Date(liveData.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    )}
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-12">

                {/* Left Side: Prices */}
                <div className="xl:col-span-2 space-y-10 md:space-y-16">
                    <section id="gold-prices" className="scroll-mt-24">
                        <PriceTable
                            title="أسعار الذهب"
                            currencySymbol={config.currencySymbol}
                            data={goldPrices}
                        />
                    </section>

                    <div className="w-full">
                        <AdBanner className="w-full h-[150px] md:h-[300px] rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-inner" />
                        <p className="text-[10px] text-center text-slate-300 font-black uppercase mt-2 tracking-widest">إعلان ممول</p>
                    </div>

                    <section id="silver-prices" className="scroll-mt-24">
                        <PriceTable
                            title="أسعار الفضة"
                            currencySymbol={config.currencySymbol}
                            data={silverPrices}
                        />
                    </section>
                </div>

                {/* Right Side: Sidebar */}
                <aside className="space-y-8">
                    <div className="bg-slate-950 rounded-[2.5rem] p-8 md:p-10 shadow-2xl text-white relative overflow-hidden group border border-slate-800">
                        <div className="absolute top-0 right-0 w-full h-1.5 bg-gold" />
                        <h3 className="font-black text-2xl mb-6 flex items-center gap-3">
                            <ShieldCheck className="text-gold" size={28} />
                            نشرة السوق
                        </h3>
                        <p className="text-slate-400 leading-relaxed font-medium mb-8 text-lg">
                            أسواق الذهب العالمية تشهد تحركات مستمرة. يرجى الملاحظة أن الأسعار في {config.nameAr} قد تتغير طوال اليوم بناءً على العرض والطلب وقيمة المصنعية.
                        </p>
                        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            <span className="text-gold font-black text-sm">التداولات مستقرة حالياً</span>
                        </div>
                    </div>

                    <div className="sticky top-28 space-y-4 hidden xl:block">
                        <div className="bg-white border border-slate-100 rounded-[2rem] p-4 shadow-sm">
                            <AdBanner className="w-full h-[600px] rounded-2xl overflow-hidden border-none" />
                        </div>
                        <p className="text-[10px] text-center text-slate-300 font-black uppercase tracking-widest font-sans">Advertisement Space</p>
                    </div>
                </aside>

            </div>
        </div>
    );
}
