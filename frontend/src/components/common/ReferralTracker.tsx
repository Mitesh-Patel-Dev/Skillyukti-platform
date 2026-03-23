'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

/**
 * ReferralTracker - Client component to capture referral codes from URL
 * and store them in localStorage for later use during registration or checkout.
 */
export default function ReferralTracker() {
    const searchParams = useSearchParams();
    const { user } = useAuth();

    useEffect(() => {
        const ref = searchParams.get('ref');

        if (ref) {
            const normalizedRef = ref.toUpperCase();
            
            // Prevent self-referral if user is logged in
            if (user?.referralCode === normalizedRef) {
                console.log('ReferralTracker: Self-referral detected. Ignoring code.');
                return;
            }

            // Check if we already have a referral code stored
            const existingRef = localStorage.getItem('referral_code');

            if (!existingRef) {
                console.log('ReferralTracker: Capturing new referral code:', normalizedRef);
                localStorage.setItem('referral_code', normalizedRef);
            } else if (existingRef !== normalizedRef) {
                console.log('ReferralTracker: Existing referral code found:', existingRef, '. Ignoring new code:', normalizedRef);
            } else {
                console.log('ReferralTracker: Referral code already stored:', existingRef);
            }
        }
    }, [searchParams, user]);

    return null; // This component doesn't render anything
}
