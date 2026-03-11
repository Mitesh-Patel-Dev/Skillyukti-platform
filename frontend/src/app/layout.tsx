import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Skillyukti - Learn High Income Digital Skills',
    description:
        'Master digital marketing, freelancing, AI automation, and e-commerce. Build your online business and start earning online with Skillyukti.',
    keywords: [
        'online courses',
        'digital marketing',
        'freelancing',
        'AI automation',
        'e-commerce',
        'learn online',
        'skill development',
    ],
    openGraph: {
        title: 'Skillyukti - Learn High Income Digital Skills',
        description:
            'Build your online business and start earning online with Skillyukti.',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} noise-bg`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
