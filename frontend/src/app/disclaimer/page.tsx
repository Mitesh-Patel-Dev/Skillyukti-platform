import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';
import { AlertCircle, TrendingUp, Info, MessageSquareQuote } from 'lucide-react';

export default function DisclaimerPage() {
    return (
        <main className="min-h-screen pt-24 pb-16 flex flex-col">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex-1 w-full relative">
                <div className="absolute top-20 right-10 w-64 h-64 bg-accent-orange/10 rounded-full blur-[80px]" />
                
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-8">
                    Legal <span className="gradient-text-accent">Disclaimer</span>
                </h1>
                
                <div className="space-y-6 relative z-10">
                    <div className="glass rounded-3xl p-8 sm:p-10 card-hover">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <TrendingUp className="w-6 h-6 text-accent-green" />
                            1. Earnings & Income Disclaimer
                        </h2>
                        <div className="text-dark-100 leading-relaxed font-medium">
                            <p className="mb-4">
                                Skillyukti provides educational training, marketing strategies, and tools to help entrepreneurs and freelancers. However, we cannot and do not make any guarantees about your ability to get results or earn any money with our ideas, information, tools, or strategies.
                            </p>
                            <p className="text-dark-200">
                                Nothing on any of our websites, or any of our content or curriculum is a promise or guarantee of results or future earnings. We do not offer legal, medical, tax, or professional financial advice. Any financial numbers referenced on our sites are illustrative concepts only and should not be considered average earnings, exact earnings, or promises for actual or future performance.
                            </p>
                        </div>
                    </div>
                    
                    <div className="glass rounded-3xl p-8 sm:p-10 card-hover">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Info className="w-6 h-6 text-primary-400" />
                            2. Educational Purpose Only
                        </h2>
                        <div className="text-dark-100 leading-relaxed">
                            <p>
                                The information provided by Skillyukti on our website and in our courses is for general informational and educational purposes only. All information on the Site is provided in good faith.
                            </p>
                            <p className="mt-4 text-dark-200">
                                However, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information or strategy taught within our platform. Your success depends entirely on your own effort, motivation, commitment, and follow-through.
                            </p>
                        </div>
                    </div>

                    <div className="glass rounded-3xl p-8 sm:p-10 card-hover">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <MessageSquareQuote className="w-6 h-6 text-accent-purple" />
                            3. Testimonial Disclaimer
                        </h2>
                        <div className="text-dark-100 leading-relaxed">
                            <p>
                                The site may contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users.
                            </p>
                            <p className="mt-4 text-dark-200">
                                However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our products and/or services. We do not claim, and you should not assume, that all users will have the same experiences. Your individual results may vary.
                            </p>
                        </div>
                    </div>
                    
                    <div className="glass rounded-3xl p-8 sm:p-10 card-hover border border-accent-orange/10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <AlertCircle className="w-6 h-6 text-accent-orange" />
                            4. Affiliate Disclaimer
                        </h2>
                        <div className="text-dark-100 leading-relaxed">
                            <p>
                                Some links on this website or inside the course curriculum may be affiliate links. This means that if you click on the link and purchase the item, Skillyukti or the instructor may receive an affiliate commission at no extra cost to you. We only recommend products or services that we believe add value to our students.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
