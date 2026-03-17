import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';

export default function TermsPage() {
    return (
        <main className="min-h-screen pt-24 pb-16 flex flex-col">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex-1 w-full">
                <h1 className="text-4xl sm:text-5xl font-bold mb-8">
                    Terms & <span className="gradient-text-accent">Conditions</span>
                </h1>
                
                <div className="glass rounded-3xl p-8 sm:p-12 space-y-8 text-dark-100 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing and using Skillyukti, you accept and agree to be bound by the terms and provision of this agreement. Any participation in this service will constitute acceptance of this agreement.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Use of License</h2>
                        <p>Permission is granted to temporarily view the materials (information or software) on Skillyukti's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
                        <p className="mt-4">Under this license you may not:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Modify or copy the materials;</li>
                            <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                            <li>Attempt to decompile or reverse engineer any software contained on Skillyukti's website;</li>
                            <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Account Registration</h2>
                        <p>To access our courses, you must create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Modifications</h2>
                        <p>Skillyukti may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
