// gold-prices-portal/src/components/prices/PriceTable.tsx
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface PriceRow {
    label: string;
    price: number;
    previousPrice: number;
}

interface PriceTableProps {
    title: string;
    currencySymbol: string;
    data: PriceRow[];
}

export default function PriceTable({ title, currencySymbol, data }: PriceTableProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    {title}
                </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 text-sm font-semibold text-slate-600">Purity</th>
                            <th className="px-6 py-3 text-sm font-semibold text-slate-600">Buy Price</th>
                            <th className="px-6 py-3 text-sm font-semibold text-slate-600 text-right">Change</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.map((row, index) => {
                            const difference = row.price - row.previousPrice;
                            const isUp = difference > 0;
                            const isDown = difference < 0;
                            const isNeutral = difference === 0;

                            return (
                                <tr key={index} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{row.label}</td>
                                    <td className="px-6 py-4 font-bold text-slate-900">
                                        {row.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencySymbol}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className={`inline-flex items-center justify-end gap-1 font-medium ${isUp ? 'text-green-600' : isDown ? 'text-red-500' : 'text-slate-400'
                                            }`}>
                                            {isUp && <TrendingUp size={16} />}
                                            {isDown && <TrendingDown size={16} />}
                                            {isNeutral && <Minus size={16} />}
                                            <span dir="ltr">
                                                {isNeutral ? '0.00' : `${isUp ? '+' : ''}${difference.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
