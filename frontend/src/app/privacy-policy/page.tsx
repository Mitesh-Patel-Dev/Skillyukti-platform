import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen pt-24 pb-16 flex flex-col">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex-1 w-full">
                <h1 className="text-4xl sm:text-5xl font-bold mb-8">
                    Privacy <span className="gradient-text-accent">Policy</span>
                </h1>
                
                <div className="glass rounded-3xl p-8 sm:p-12 space-y-8 text-dark-100 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us when you create an account, purchase a course, or contact us for support. This may include your name, email address, phone number, and payment information (handled securely by our payment processors).</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, offers, and events offered by Skillyukti.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
                        <p>We implement appropriate technical and organizational measures to protect the personal data that we collect and process about you. While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet is 100% secure.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at support@skillyukti.com.</p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
