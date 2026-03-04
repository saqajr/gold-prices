// gold-prices-portal/src/app/api/prices/route.ts
import { NextResponse } from 'next/server';
import { CountryCode } from '@/lib/countries';
import { fetchPriceData } from '@/lib/prices';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // Cache for 5 minutes (300 seconds)

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') as CountryCode || 'eg';

    try {
        const prices = await fetchPriceData(country);

        return NextResponse.json(prices, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=59',
            },
        });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
    }
}
