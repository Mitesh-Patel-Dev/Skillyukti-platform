'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';

export default function RefundPolicyPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl font-bold text-white mb-2">Refund Policy</h1>
                        <p className="text-dark-200 text-sm mb-10">
                            Last updated: March 6, 2026
                        </p>

                        <div className="space-y-8 text-dark-100 leading-relaxed text-[15px]">
                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">Eligibility</h2>
                                <p>
                                    We want you to be fully satisfied with your learning experience on Skillyukti.
                                    If you are unsatisfied with a course you have purchased, you may request a refund
                                    under the following conditions:
                                </p>
                                <ul className="list-disc list-inside space-y-1.5 mt-3">
                                    <li>The refund request is made within <strong className="text-white">7 days</strong> of purchase.</li>
                                    <li>You have completed less than <strong className="text-white">25%</strong> of the course content.</li>
                                    <li>The course has not been previously refunded to your account.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">How to Request a Refund</h2>
                                <p>
                                    To request a refund, send an email to{' '}
                                    <a href="mailto:support@skillyukti.com" className="text-primary-400 hover:text-primary-300 transition-colors">
                                        support@skillyukti.com
                                    </a>{' '}
                                    with the following details:
                                </p>
                                <ul className="list-disc list-inside space-y-1.5 mt-3">
                                    <li>Your registered email address.</li>
                                    <li>Order ID or payment reference number.</li>
                                    <li>Course name.</li>
                                    <li>Reason for requesting a refund.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">Processing Time</h2>
                                <p>
                                    Approved refunds are processed within <strong className="text-white">5–7 business days</strong>.
                                    The refund will be credited to the original payment method used at the time of purchase.
                                    The exact time for the refund to appear in your account depends on your bank or payment provider.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">Non-Refundable Situations</h2>
                                <ul className="list-disc list-inside space-y-1.5">
                                    <li>Refund requested after 7 days of purchase.</li>
                                    <li>More than 25% of course content has been accessed.</li>
                                    <li>The course was purchased during a promotional/discounted offer and the discount terms excluded refunds.</li>
                                    <li>Account termination due to violation of terms of service.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
                                <p>
                                    For any questions about our refund policy, reach out to{' '}
                                    <a href="mailto:support@skillyukti.com" className="text-primary-400 hover:text-primary-300 transition-colors">
                                        support@skillyukti.com
                                    </a>.
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
