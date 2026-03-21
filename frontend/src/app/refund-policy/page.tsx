import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';
import { AlertTriangle, Clock, CreditCard, HelpCircle } from 'lucide-react';

export default function RefundPolicyPage() {
    return (
        <main className="min-h-screen pt-24 pb-16 flex flex-col">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex-1 w-full relative">
                <div className="absolute top-20 right-10 w-64 h-64 bg-accent-pink/10 rounded-full blur-[80px]" />
                
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-8">
                    Refund <span className="gradient-text-accent">Policy</span>
                </h1>
                
                <div className="space-y-6 relative z-10">
                    <div className="glass rounded-3xl p-8 sm:p-10 border border-accent-pink/20 relative overflow-hidden card-hover">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <AlertTriangle className="w-32 h-32" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <AlertTriangle className="w-6 h-6 text-accent-pink" />
                            1. Strict No-Refund Policy
                        </h2>
                        <div className="text-dark-100 leading-relaxed font-medium">
                            <p className="text-lg text-white mb-4">
                                All sales are final. We maintain a strict NO REFUND policy on all course and digital product purchases.
                            </p>
                            <p>
                                Because all of our products are purely digital and grant immediate, full access to proprietary training material, videos, frameworks, and intellectual property, we cannot offer refunds under any circumstances once a purchase is completed.
                            </p>
                        </div>
                    </div>

                    <div className="glass rounded-3xl p-8 sm:p-10 card-hover">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <CreditCard className="w-6 h-6 text-primary-400" />
                            2. Acknowledgment Upon Purchase
                        </h2>
                        <div className="text-dark-100 leading-relaxed">
                            <p>
                                By completing your purchase on Skillyukti, you automatically acknowledge, agree, and accept this No Refund Policy. Please ensure you have read the course curriculum, watched any available demo videos, and made an informed decision before enrolling.
                            </p>
                        </div>
                    </div>

                    <div className="glass rounded-3xl p-8 sm:p-10 card-hover">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Clock className="w-6 h-6 text-accent-orange" />
                            3. Exceptional Technical Faults
                        </h2>
                        <div className="text-dark-100 leading-relaxed">
                            <p>
                                In extremely rare circumstances, such as accidental duplicate billing caused by a payment gateway error, or proven technical faults preventing any access to the purchased content within the first 48 hours of purchase, Skillyukti may, at its sole discretion, offer a refund.
                            </p>
                            <p className="mt-4 text-sm text-dark-200">
                                To report duplicate billing or severe access issues, contact support immediately with your Order ID and payment receipt.
                            </p>
                        </div>
                    </div>

                    <div className="glass rounded-3xl p-8 sm:p-10 card-hover">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <HelpCircle className="w-6 h-6 text-accent-green" />
                            4. Questions & Support
                        </h2>
                        <div className="text-dark-100 leading-relaxed">
                            <p>
                                If you are unsure whether a course is right for you, we strongly encourage you to contact our team before making a purchase. We are happy to answer any questions and guide you to the right resource.
                            </p>
                            <p className="mt-4 font-medium text-dark-50">
                                Email us at <a href="mailto:support@skillyukti.com" className="text-primary-400 hover:text-primary-300">support@skillyukti.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
