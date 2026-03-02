// gold-prices-portal/src/components/layout/Header.tsx
import Link from 'next/link';
import { countries } from '@/lib/countries';

export default function Header() {
    return (
        <header className="bg-slate-900 text-white py-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tighter text-yellow-400">
                    Gold<span className="text-white">Portal</span>
                </Link>

                {/* Navigation & Country Selector */}
                <nav className="flex items-center gap-6">
                    <Link href="/blog" className="hover:text-yellow-400 transition-colors">
                        Market News
                    </Link>

                    <div className="flex bg-slate-800 rounded-md overflow-hidden border border-slate-700">
                        {Object.values(countries).map((country) => (
                            <Link
                                key={country.code}
                                href={`/${country.code}`}
                                className="px-3 py-1.5 text-sm font-medium hover:bg-slate-700 transition-colors border-r border-slate-700 last:border-r-0 uppercase"
                                title={`${country.name} Prices`}
                            >
                                {country.code}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </header>
    );
}
