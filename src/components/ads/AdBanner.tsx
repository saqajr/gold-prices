// gold-prices-portal/src/components/ads/AdBanner.tsx
import React from 'react';

interface AdBannerProps {
    className?: string; // e.g. w-[728px] h-[90px] for desktop leaderboard
}

export default function AdBanner({ className = "w-full min-h-[90px]" }: AdBannerProps) {
    return (
        <div
            className={`bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm italic my-6 rounded-md ${className}`}
        >
            <div>
                {/*
          Once your Google AdSense is approved, replace this entire div with:
          <ins className="adsbygoogle"
               style={{ display: "block" }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          <script>
               (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        */}
                [ Advertisement Placement ]
            </div>
        </div>
    );
}
