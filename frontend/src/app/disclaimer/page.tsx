import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';

export default function DisclaimerPage() {
    return (
        <main className="min-h-screen pt-24 pb-16 flex flex-col">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex-1 w-full">
                <h1 className="text-4xl sm:text-5xl font-bold mb-8">
                    Legal <span className="gradient-text-accent">Disclaimer</span>
                </h1>
                
                <div className="glass rounded-3xl p-8 sm:p-12 space-y-8 text-dark-100 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Earnings & Income Disclaimer</h2>
                        <p>Skillyukti provides educational training, marketing strategies, and tools to help entrepreneurs and freelancers. However, we cannot and do not make any guarantees about your ability to get results or earn any money with our ideas, information, tools, or strategies.</p>
                        <p className="mt-4">Nothing on any of our websites, or any of our content or curriculum is a promise or guarantee of results or future earnings. We do not offer legal, medical, tax, or professional advice. Any financial numbers referenced on our sites are illustrative concepts only and should not be considered average earnings, exact earnings, or promises for actual or future performance.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. General Information</h2>
                        <p>The information provided by Skillyukti on our website and in our courses is for general informational and educational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Testimonial Disclaimer</h2>
                        <p>The site may contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our products and/or services. We do not claim, and you should not assume, that all users will have the same experiences.</p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
