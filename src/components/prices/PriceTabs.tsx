// gold-prices-portal/src/components/prices/PriceTabs.tsx
'use client';

import React from 'react';

interface PriceTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const CATEGORIES = {
    GOLD: 'gold',
    BARS: 'bars',
    SILVER: 'silver',
    CURRENCY: 'currency'
};

const tabs = [
    { id: CATEGORIES.GOLD, label: 'أسعار الذهب' },
    { id: CATEGORIES.BARS, label: 'سبائك وعملات' },
    { id: CATEGORIES.SILVER, label: 'أسعار الفضة' },
    { id: CATEGORIES.CURRENCY, label: 'أسعار العملات' },
];

export default function PriceTabs({ activeTab, onTabChange }: PriceTabsProps) {
    return (
        <div className="flex flex-wrap gap-3 bg-white p-2 rounded-[1.5rem] border border-slate-100 shadow-sm w-full md:w-fit">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex-1 md:flex-none px-7 py-3 rounded-2xl text-sm font-black transition-all duration-400 relative overflow-hidden ${isActive
                                ? 'bg-slate-900 text-gold shadow-lg ring-1 ring-slate-800'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                    >
                        {tab.label}
                        {isActive && (
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-gold rounded-t-full" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
