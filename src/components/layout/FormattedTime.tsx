// gold-prices-portal/src/components/layout/FormattedTime.tsx
'use client';

import { useEffect, useState } from 'react';

interface FormattedTimeProps {
    timestamp: string;
}

export default function FormattedTime({ timestamp }: FormattedTimeProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // While not mounted, we render something stable or nothing
    if (!mounted) {
        return <span className="inline-block w-12 h-4 bg-slate-200 animate-pulse rounded" />;
    }

    try {
        const timeString = new Date(timestamp).toLocaleTimeString('ar-EG', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        return <span>{timeString}</span>;
    } catch (e) {
        return <span>--:--</span>;
    }
}
