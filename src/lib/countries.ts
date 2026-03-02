// gold-prices-portal/src/lib/countries.ts
export type CountryCode = 'eg' | 'sa' | 'ae' | 'kw';

export interface CountryConfig {
    code: CountryCode;
    name: string;
    currency: string;
    currencySymbol: string;
    language: string;
}

export const countries: Record<CountryCode, CountryConfig> = {
    eg: {
        code: 'eg',
        name: 'Egypt',
        currency: 'EGP',
        currencySymbol: '£',
        language: 'ar-EG',
    },
    sa: {
        code: 'sa',
        name: 'Saudi Arabia',
        currency: 'SAR',
        currencySymbol: 'ر.س',
        language: 'ar-SA',
    },
    ae: {
        code: 'ae',
        name: 'United Arab Emirates',
        currency: 'AED',
        currencySymbol: 'د.إ',
        language: 'ar-AE',
    },
    kw: {
        code: 'kw',
        name: 'Kuwait',
        currency: 'KWD',
        currencySymbol: 'د.ك',
        language: 'ar-KW',
    },
};
