import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import NodeCache from 'node-cache';
import { CountryCode } from '@/lib/countries';

// Cache for 5 minutes (300 seconds) to avoid getting blocked by target sites
// and to save Serverless execution time on Netlify
const cache = new NodeCache({ stdTTL: 300 });

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') as CountryCode || 'eg';

    const cacheKey = `prices_${country}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return NextResponse.json(cachedData);
    }

    try {
        let prices = {};

        // 1. EGYPTIAN LOCAL SCRAPER (Example structure targeting a generic local site)
        if (country === 'eg') {
            // NOTE: In production, replace this URL with the actual site you want to scrape
            // such as egypt.gold-price-today.com or similar.
            const url = 'https://egypt.gold-price-today.com/';

            const { data } = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            const $ = cheerio.load(data);

            // THIS IS A DEMONSTRATION OF SELECTORS. 
            // You must inspect the target website to find exactly which HTML classes hold the prices.
            // Example: If the table cell has an id "21k-price", you do: $('#21k-price').text()

            // Let's create strong, randomized mock data to demonstrate the front-end calculation
            const baseOunce = 110000 + (Math.random() * 500); // Fake live price in EGP for demo

            prices = {
                gold: [
                    { label: '24k Gold (Gram)', price: baseOunce / 31.103, previousPrice: (baseOunce / 31.103) - 10 },
                    { label: '21k Gold (Gram)', price: (baseOunce / 31.103) * 0.875, previousPrice: ((baseOunce / 31.103) * 0.875) + 5 },
                    { label: '18k Gold (Gram)', price: (baseOunce / 31.103) * 0.75, previousPrice: ((baseOunce / 31.103) * 0.75) - 2 },
                ],
                silver: [
                    { label: '999 Fine Silver (Gram)', price: 45.5, previousPrice: 44.8 },
                    { label: '925 Sterling Silver (Gram)', price: 42.1, previousPrice: 42.1 },
                ],
                timestamp: new Date().toISOString()
            };
        }
        // 2. GULF COUNTRIES (Usually tied strictly to global spot converted to local currency peg)
        else {
            // For Saudi, UAE, Kuwait, you could scrape a global site like Kitco or Investing.com
            // and multiply by the fixed exchange rate (e.g. 1 USD = 3.75 SAR).

            let exchangeRate = 1;
            let symbol = '';
            if (country === 'sa') { exchangeRate = 3.75; symbol = 'SAR'; }
            if (country === 'ae') { exchangeRate = 3.67; symbol = 'AED'; }
            if (country === 'kw') { exchangeRate = 0.31; symbol = 'KWD'; }

            const globalOunceUsd = 2050 + (Math.random() * 10);
            const localOunce = globalOunceUsd * exchangeRate;
            const gram24k = localOunce / 31.103;

            prices = {
                gold: [
                    { label: '24k Gold (Gram)', price: gram24k, previousPrice: gram24k - 0.5 },
                    { label: '21k Gold (Gram)', price: gram24k * 0.875, previousPrice: (gram24k * 0.875) + 0.2 },
                    { label: '18k Gold (Gram)', price: gram24k * 0.75, previousPrice: gram24k * 0.75 },
                ],
                silver: [
                    { label: '999 Fine Silver (Gram)', price: (25 * exchangeRate) / 31.103, previousPrice: ((25 * exchangeRate) / 31.103) - 0.1 },
                ],
                timestamp: new Date().toISOString()
            };
        }

        // Save to cache
        cache.set(cacheKey, prices);

        return NextResponse.json(prices);

    } catch (error) {
        console.error('Scraping Error:', error);
        return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
    }
}
