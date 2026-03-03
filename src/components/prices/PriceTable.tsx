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
        if (label.includes('24k')) return 'EG محلي - 24K';
        if (label.includes('21k')) return 'EG محلي - 21K';
        if (label.includes('18k')) return 'EG محلي - 18K';
        if (label.includes('Coin')) return 'Coin جنيه ذهب';
        if (label.includes('Ounce Local')) return 'Ounce أونصة الذهب';
        if (label.includes('Ounce World')) return 'World أونصة عالمية';
        if (label.includes('Fine Silver')) return 'فضة نقية 999';
        if (label.includes('Sterling')) return 'فضة إسترليني 925';
        return label;
    };

    return (
        <div className="bg-[#FAF7F0] rounded-[2.5rem] shadow-2xl shadow-gold/5 border border-gold/10 overflow-hidden">
            <div className="bg-gradient-to-r from-gold via-gold-dark to-gold px-8 py-7">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-black text-white flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-inner">
                            <TrendingUp size={24} className="text-white" />
                        </div>
                        {title}
                    </h2>
                    <Info size={20} className="text-white/60 cursor-help" />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                    <thead>
                        <tr className="bg-gold-light/20 border-b border-gold/10">
                            <th className="px-8 py-6 text-sm font-black text-slate-500 text-right">العيار / النوع</th>
                            <th className="px-8 py-6 text-sm font-black text-gold-dark text-right">انت تشتري (بيع)</th>
                            <th className="px-8 py-6 text-sm font-black text-slate-500 text-right">انت تبيع (شراء)</th>
                            <th className="px-8 py-6 text-sm font-black text-slate-500 text-right">التغيير</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gold/5">
                        {data.map((row, index) => {
                            const symbol = row.currency || currencySymbol;
                            const changeValue = row.change || (row.prevBuyPrice ? row.buyPrice - row.prevBuyPrice : 0);
                            const isUp = changeValue > 0;
                            const isDown = changeValue < 0;

                            return (
                                <tr key={index} className="hover:bg-gold-light/30 transition-all duration-300 group">
                                    <td className="px-8 py-7 font-black text-slate-800 text-lg">
                                        {translateLabel(row.label)}
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-black text-slate-900 tabular-nums">
                                                {row.buyPrice?.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                                                <span className="text-xs font-bold text-slate-400 mr-2">{symbol}</span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <span className="text-xl font-extrabold text-slate-600 tabular-nums">
                                            {row.sellPrice?.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                                            <span className="text-xs font-bold text-slate-300 mr-2">{symbol}</span>
                                        </span>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black ${isUp ? 'bg-green-100 text-green-700' :
                                            isDown ? 'bg-red-100 text-red-700' :
                                                'bg-slate-100 text-slate-400'
                                            }`}>
                                            {isUp && <TrendingUp size={16} />}
                                            {isDown && <TrendingDown size={16} />}
                                            {!isUp && !isDown && <Minus size={16} />}
                                            <span dir="ltr">
                                                {isUp ? '+' : ''}{changeValue.toLocaleString('en-US')}
                                            </span>
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
