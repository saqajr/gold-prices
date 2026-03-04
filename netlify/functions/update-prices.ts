import type { Config } from "@netlify/functions"

export default async (req: Request) => {
    const { nextRun } = await req.json()
    console.log("Scheduled function triggered at", nextRun)

    // Trigger the revalidation by hitting the API routes
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gold-prices-portal.netlify.app"; // Fallback URL

    const countries = ['eg', 'sa', 'ae', 'kw'];

    for (const country of countries) {
        try {
            console.log(`Refreshing prices for ${country}...`);
            const res = await fetch(`${siteUrl}/api/prices?country=${country}`, {
                headers: { 'x-prerender-revalidate': '1' }
            });
            console.log(`Status for ${country}: ${res.status}`);
        } catch (e) {
            console.error(`Failed to refresh ${country}:`, e);
        }
    }
}

export const config: Config = {
    schedule: "*/5 * * * *" // Every 5 minutes
}
