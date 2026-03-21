'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * ReferralTracker - Client component to capture referral codes from URL
 * and store them in localStorage for later use during registration or checkout.
 */
export default function ReferralTracker() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const ref = searchParams.get('ref');

        if (ref) {
            // Check if we already have a referral code stored
            const existingRef = localStorage.getItem('referral_code');

            if (!existingRef) {
                console.log('ReferralTracker: Capturing new referral code:', ref);
                localStorage.setItem('referral_code', ref.toUpperCase());
            } else if (existingRef !== ref.toUpperCase()) {
                console.log('ReferralTracker: Existing referral code found:', existingRef, '. Ignoring new code:', ref);
            } else {
                console.log('ReferralTracker: Referral code already stored:', existingRef);
            }
        }
    }, [searchParams]);

    return null; // This component doesn't render anything
}
