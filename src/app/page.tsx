// gold-prices-portal/src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Option 1: You could add a full design here with all 4 country flags asking them to choose.
  // Option 2 (SEO & Conversion focused): Instantly redirect them to the highest performing 
  // market (e.g., Egypt) or read headers to guess their location.

  // For now, we will auto-redirect to Egypt as it's the primary market you requested insight for, 
  // but users can use the NavBar to switch to Saudi/UAE.
  redirect('/eg');
}
