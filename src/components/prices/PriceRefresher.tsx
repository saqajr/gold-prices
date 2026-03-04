// gold-prices-portal/src/components/prices/PriceRefresher.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PriceRefresher() {
    const router = useRouter();

    useEffect(() => {
        // Poll every 5 minutes (300,000 ms)
        const interval = setInterval(() => {
            console.log('Refreshing price data...');
            router.refresh();
        }, 300000);

        return () => clearInterval(interval);
    }, [router]);

    return null; // This component doesn't render anything UI-wise
}
