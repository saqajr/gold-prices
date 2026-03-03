// gold-prices-portal/src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { countries } from '@/lib/countries';
import { Coins } from 'lucide-react';

export default function Header() {
    const pathname = usePathname();

    const navLinks = [
        { name: 'الرئيسية', href: '/' },
        { name: 'أخبار الذهب', href: '/blog' },
        { name: 'تحليل السوق', href: '/analysis' },
    ];

    return (
        <header className="bg-white border-b border-gold/20 sticky top-0 z-50 backdrop-blur-md bg-white/90">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center shadow-lg shadow-gold/20 group-hover:scale-105 transition-transform">
                            <Coins className="text-white" size={24} />
                        </div>
                        <span className="text-2xl font-black text-slate-900 tracking-tight">
                            بوابة<span className="text-gold">الذهب</span>
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative py-1 text-sm font-bold transition-colors hover:text-gold ${isActive ? 'text-gold' : 'text-slate-600'
                                        }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <span className="absolute -bottom-1 right-0 w-full h-0.5 bg-gold rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Country Selector */}
                    <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
                        {Object.values(countries).map((country) => {
                            const isActive = pathname === `/${country.code}`;
                            return (
                                <Link
                                    key={country.code}
                                    href={`/${country.code}`}
                                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${isActive
                                            ? 'bg-white text-gold shadow-sm border border-gold/20'
                                            : 'text-slate-500 hover:text-slate-900'
                                        }`}
                                >
                                    {country.code === 'eg' ? 'مصر' :
                                        country.code === 'sa' ? 'السعودية' :
                                            country.code === 'ae' ? 'الإمارات' : 'الكويت'}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </header>
    );
}
