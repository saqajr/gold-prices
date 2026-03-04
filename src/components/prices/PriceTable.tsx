// gold-prices-portal/src/components/prices/PriceTable.tsx
import React from 'react';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

export interface PriceRow {
    label: string;
    buyPrice: number;
    sellPrice: number;
    change?: number;
    percentage?: string;
    prevBuyPrice?: number;
    currency?: string;
}

interface PriceTableProps {
    title: string;
    currencySymbol: string;
    data: PriceRow[];
}

export default function PriceTable({ title, currencySymbol, data }: PriceTableProps) {
    const translateLabel = (label: string) => {
        if (label.includes('24k')) return 'ذهب عيار 24';
        if (label.includes('21k')) return 'ذهب عيار 21';
        if (label.includes('18k')) return 'ذهب عيار 18';
        if (label.includes('Coin')) return 'جنيه ذهب - عيار 21';
        if (label.includes('Ounce Local')) return 'أونصة الذهب - محلي';
        if (label.includes('Ounce World')) return 'أوقية الذهب - عالمي';
        if (label.includes('Fine Silver')) return 'فضة نقية عيار 999';
        if (label.includes('Sterling')) return 'فضة عيار 925';
        if (label.includes('USD/EGP')) return 'سعر صرف الدولار (بنك)';
        return label;
    };

    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-slate-50/80 px-8 py-6 border-b border-slate-100 backdrop-blur-sm">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-black text-slate-950 flex items-center gap-3">
                        <TrendingUp size={22} className="text-gold" />
                        {title}
                    </h2>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                    <thead>
                        <tr className="bg-slate-50/30">
                            <th className="px-8 py-5 text-sm font-black text-slate-400 text-right uppercase tracking-wider">العيار / النوع</th>
                            <th className="px-8 py-5 text-sm font-black text-gold text-right uppercase tracking-wider">بيع (ج.م)</th>
                            <th className="px-8 py-5 text-sm font-black text-slate-400 text-right uppercase tracking-wider">شراء (ج.م)</th>
                            <th className="px-8 py-5 text-sm font-black text-slate-400 text-right uppercase tracking-wider">التغيير</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gold/5">
                        {data.map((row, index) => {
                            const symbol = row.currency || currencySymbol;
                            const changeValue = row.change || (row.prevBuyPrice ? row.buyPrice - row.prevBuyPrice : 0);
                            const percentage = row.percentage || (row.prevBuyPrice ? ((changeValue / row.prevBuyPrice) * 100).toFixed(2) + '%' : '0.00%');
                            const isUp = changeValue > 0;
                            const isDown = changeValue < 0;

                            return (
                                <tr key={index} className="hover:bg-slate-50/60 transition-all duration-200 group border-b border-slate-50 last:border-0">
                                    <td className="px-8 py-6 font-black text-slate-800 text-base">
                                        {translateLabel(row.label)}
                                    </td>
                                    <td className="px-8 py-6 font-black text-slate-900 text-2xl tabular-nums">
                                        {row.buyPrice?.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                                    </td>
                                    <td className="px-8 py-6 font-black text-slate-400 text-xl tabular-nums">
                                        {row.sellPrice?.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={`flex items-center gap-1.5 text-sm font-black ${isUp ? 'text-green-600' : isDown ? 'text-red-600' : 'text-slate-400'}`}>
                                            <span dir="ltr">{isUp ? '+' : ''}{changeValue.toLocaleString('en-US')}</span>
                                            <span className="text-[11px] opacity-60">({percentage})</span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="bg-gold-light/10 px-8 py-4 border-t border-gold/5">
                <p className="text-xs text-slate-400 font-bold flex items-center gap-2">
                    <Info size={14} className="text-gold" />
                    جميع الأسعار استرشادية وقد تختلف من تاجر لآخر صعوداً أو هبوطاً.
                </p>
            </div>
        </div>
    );
}
