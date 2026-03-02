// gold-prices-portal/src/app/[country]/page.tsx
import { countries, CountryCode } from '@/lib/countries';
import PriceTable, { PriceRow } from '@/components/prices/PriceTable';
import AdBanner from '@/components/ads/AdBanner';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return Object.keys(countries).map((code) => ({
        country: code,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
    const resolvedParams = await params;
    const code = resolvedParams.country as CountryCode;
    const config = countries[code];

    if (!config) return { title: 'Not Found' };

    return {
        title: `Live Gold Prices in ${config.name} (${config.currency}) | GoldPrices Portal`,
        description: `Get real-time 24k, 21k, 18k gold prices and silver prices in ${config.name}. Updated instantly.`,
    };
}

async function getPrices(country: string) {
    // In Next.js App Router, we fetch directly from our own API route or the external source.
    // Using an absolute URL because it runs on the server.
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');

    try {
        const res = await fetch(`${baseUrl}/api/prices?country=${country}`, {
            next: { revalidate: 60 } // Revalidate every 60 seconds for freshness
        });

        if (!res.ok) {
            console.error(`API Error: ${res.status} ${res.statusText}`);
            return null;
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching prices:', error);
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
        { label: 'Market Data Unavailable', price: 0, previousPrice: 0 }
    ];

    const silverPrices: PriceRow[] = liveData?.silver || [
        { label: 'Market Data Unavailable', price: 0, previousPrice: 0 }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Page Header */}
            <section className="text-center md:text-left">
                <h1 className="text-3xl md:text-5xl justify-center md:justify-start font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                    <span className="text-4xl text-yellow-500">🏆</span>
                    Gold Prices in {config.name}
                </h1>
                <p className="text-slate-500 mt-3 text-lg font-medium">
                    Live market tracking in {config.currency} ({config.currencySymbol})
                    {liveData?.timestamp && (
                        <span className="block text-sm text-slate-400 mt-1 font-normal">
                            Last Updated: {new Date(liveData.timestamp).toLocaleTimeString()}
                        </span>
                    )}
                </p>
            </section>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Left Column (Prices) */}
                <div className="xl:col-span-2 space-y-8">
                    <PriceTable
                        title="Gold Prices"
                        currencySymbol={config.currencySymbol}
                        data={goldPrices}
                    />

                    {/* In-Feed AdSense Banner */}
                    <AdBanner className="w-full h-[90px] md:h-[250px] lg:max-w-[728px] mx-auto" />

                    <PriceTable
                        title="Silver Prices"
                        currencySymbol={config.currencySymbol}
                        data={silverPrices}
                    />
                </div>

                {/* Right Column (Sidebar for Ads & News) */}
                <aside className="space-y-6">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 shadow-xl text-white">
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            Market Status
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            Global gold markets are currently open. Local {config.name} pricing may vary based on merchant premiums and local supply.
                        </p>
                    </div>

                    {/* Sidebar Sticky AdSense Placeholder (300x600) */}
                    <div className="sticky top-24">
                        <AdBanner className="w-full h-[250px] md:h-[600px] border-none shadow-inner bg-slate-100" />
                        <p className="text-xs text-center text-slate-400 mt-2 uppercase tracking-wider font-semibold">Sponsored</p>
                    </div>
                </aside>

            </div>
        </div>
    );
}
