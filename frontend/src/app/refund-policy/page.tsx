import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';

export default function RefundPolicyPage() {
    return (
        <main className="min-h-screen pt-24 pb-16 flex flex-col">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex-1 w-full">
                <h1 className="text-4xl sm:text-5xl font-bold mb-8">
                    Refund <span className="gradient-text-accent">Policy</span>
                </h1>
                
                <div className="glass rounded-3xl p-8 sm:p-12 space-y-8 text-dark-100 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Digital Products</h2>
                        <p>Because all of our products are purely digital and grant immediate access to proprietary training material, videos, and resources, we maintain a strict <strong>NO REFUND</strong> policy on all course purchases.</p>
                        <p className="mt-4">Once a purchase is completed and access to the course content is granted, the transaction is considered final.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Subscription Services</h2>
                        <p>If you are subscribed to any recurring billing services, you may cancel your subscription at any time to avoid future charges. However, past charges are generally non-refundable.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Exceptional Circumstances</h2>
                        <p>In extremely rare circumstances, such as accidental duplicate billing or proven technical faults preventing access to the purchased content within the first 48 hours, Skillyukti may, at its sole discretion, offer a refund or store credit. All such requests must be made directly to our support team.</p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
