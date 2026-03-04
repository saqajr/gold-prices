// gold-prices-portal/src/components/prices/PriceDashboard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import PriceTabs, { CATEGORIES } from './PriceTabs';
import PriceTable, { PriceRow } from './PriceTable';
import PriceRefresher from './PriceRefresher';

interface PriceDashboardProps {
    initialData: {
        gold: PriceRow[];
        bars?: PriceRow[];
        silver: PriceRow[];
        currency?: PriceRow[];
        timestamp: string;
    };
    currencySymbol: string;
}

export default function PriceDashboard({ initialData, currencySymbol }: PriceDashboardProps) {
    const [activeTab, setActiveTab] = useState(CATEGORIES.GOLD);
    const [data, setData] = useState(initialData);

    // Sync state with props when server re-renders (due to router.refresh)
    useEffect(() => {
        if (initialData) {
            setData(initialData);
        }
    }, [initialData]);

    if (!data || !data.gold) {
        return (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 font-bold">جاري تحميل الأسعار...</p>
            </div>
        );
    }

    const getActiveData = () => {
        switch (activeTab) {
            case CATEGORIES.GOLD:
                return data.gold;
            case CATEGORIES.BARS:
                return data.bars || [];
            case CATEGORIES.SILVER:
                return data.silver;
            case CATEGORIES.CURRENCY:
                return data.currency || [];
            default:
                return data.gold;
        }
    };

    const getTableTitle = () => {
        switch (activeTab) {
            case CATEGORIES.GOLD:
                return 'أسعار الذهب';
            case CATEGORIES.BARS:
                return 'سبائك وعملات';
            case CATEGORIES.SILVER:
                return 'أسعار الفضة';
            case CATEGORIES.CURRENCY:
                return 'أسعار العملات';
            default:
                return 'أسعار الذهب';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <PriceRefresher />

            {/* Quick Summary Card */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold/20 to-transparent opacity-50" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <p className="text-gold font-black text-xs uppercase tracking-[0.2em] mb-2">أعلى جودة متاحة</p>
                        <h3 className="text-3xl font-black mb-1">عيار 24</h3>
                        <p className="text-slate-400 font-bold text-sm">السعر الأكثر نقاءً في السوق المصري</p>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="text-4xl font-black text-gold tabular-nums mb-1">
                            {data.gold[0]?.buyPrice?.toLocaleString('en-US')} <span className="text-lg font-bold text-white/50">{currencySymbol}</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase text-slate-300">السعر مستقر الآن</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="font-black text-slate-400 text-xs uppercase tracking-widest">اختر الفئة</h3>
                </div>
                <PriceTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            <section id="price-section" className="scroll-mt-24">
                <PriceTable
                    title={getTableTitle()}
                    currencySymbol={currencySymbol}
                    data={getActiveData()}
                />
            </section>
        </div>
    );
}
