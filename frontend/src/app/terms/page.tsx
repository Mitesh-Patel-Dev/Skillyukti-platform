'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';

export default function TermsPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl font-bold text-white mb-2">Terms &amp; Conditions</h1>
                        <p className="text-dark-200 text-sm mb-10">
                            Last updated: March 6, 2026
                        </p>

                        <div className="space-y-8 text-dark-100 leading-relaxed text-[15px]">
                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing and using Skillyukti, you agree to be bound by these Terms &amp; Conditions.
                                    If you do not agree with any part of these terms, you must not use our platform.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">2. Account Registration</h2>
                                <ul className="list-disc list-inside space-y-1.5">
                                    <li>You must provide accurate and complete information when creating an account.</li>
                                    <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                                    <li>You must be at least 18 years old or have parental consent to use this platform.</li>
                                    <li>One person may only maintain one account.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">3. Course Access &amp; Licensing</h2>
                                <p>
                                    Upon successful payment, you are granted a personal, non-transferable, non-exclusive
                                    license to access the course content. This license does not grant you ownership of the
                                    course materials. You may not redistribute, resell, share, or publicly display any
                                    course content without written permission.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">4. Payment &amp; Pricing</h2>
                                <ul className="list-disc list-inside space-y-1.5">
                                    <li>All prices are listed in Indian Rupees (INR) and include applicable taxes.</li>
                                    <li>Payments are processed securely through Razorpay.</li>
                                    <li>Course access is granted instantly upon successful payment verification.</li>
                                    <li>We reserve the right to change prices at any time without prior notice.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">5. Refund Policy</h2>
                                <p>
                                    Due to the digital nature of our products, we offer refunds on a case-by-case basis.
                                    If you are unsatisfied with a course, you may request a refund within 7 days of purchase
                                    provided you have completed less than 25% of the course content. To request a refund,
                                    contact us at{' '}
                                    <a href="mailto:support@skillyukti.com" className="text-primary-400 hover:text-primary-300 transition-colors">
                                        support@skillyukti.com
                                    </a>.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">6. Intellectual Property</h2>
                                <p>
                                    All course content, including videos, text, graphics, logos, and downloadable resources,
                                    are the intellectual property of Skillyukti and its instructors. Unauthorized copying,
                                    downloading (beyond provided resources), recording, or sharing of course material is
                                    strictly prohibited and may result in account termination.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">7. Prohibited Conduct</h2>
                                <ul className="list-disc list-inside space-y-1.5">
                                    <li>Sharing account credentials with others.</li>
                                    <li>Attempting to download or record video lessons.</li>
                                    <li>Using automated tools to scrape or access course content.</li>
                                    <li>Reverse engineering or tampering with platform functionality.</li>
                                    <li>Posting inappropriate content in community forums.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">8. Disclaimer</h2>
                                <p>
                                    Skillyukti provides educational content for informational purposes. We do not guarantee
                                    specific income results or outcomes. Success depends on individual effort, market
                                    conditions, and many other factors beyond our control.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">9. Limitation of Liability</h2>
                                <p>
                                    Skillyukti shall not be liable for any indirect, incidental, special, or consequential
                                    damages resulting from the use or inability to use the platform. Our total liability
                                    shall not exceed the amount paid by you for the course in question.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">10. Governing Law</h2>
                                <p>
                                    These terms shall be governed by and construed in accordance with the laws of India.
                                    Any disputes arising out of these terms shall be subject to the exclusive jurisdiction
                                    of the courts in Mumbai, India.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">11. Contact</h2>
                                <p>
                                    For questions regarding these Terms &amp; Conditions, contact us at{' '}
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
