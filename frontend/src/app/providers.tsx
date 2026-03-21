'use client';

import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import ReferralTracker from '@/components/common/ReferralTracker';
import { Suspense } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <Suspense fallback={null}>
                <ReferralTracker />
            </Suspense>
            {children}
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#1A1B1E',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                    },
                    success: {
                        iconTheme: { primary: '#51cf66', secondary: '#1A1B1E' },
                    },
                    error: {
                        iconTheme: { primary: '#e64980', secondary: '#1A1B1E' },
                    },
                }}
            />
        </AuthProvider>
    );
}
