'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';

export default function PrivacyPolicyPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
                        <p className="text-dark-200 text-sm mb-10">
                            Last updated: March 6, 2026
                        </p>

                        <div className="space-y-8 text-dark-100 leading-relaxed text-[15px]">
                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
                                <p>
                                    When you register on Skillyukti, we collect personal information including your name,
                                    email address, and payment details. We also automatically collect usage data such as
                                    IP address, browser type, pages visited, and course progress.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
                                <ul className="list-disc list-inside space-y-1.5">
                                    <li>To provide and maintain our course platform.</li>
                                    <li>To process payments and grant access to purchased courses.</li>
                                    <li>To track your learning progress and provide personalized recommendations.</li>
                                    <li>To send important updates about your courses and account.</li>
                                    <li>To improve our platform through analytics and feedback.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">3. Payment Security</h2>
                                <p>
                                    All payments are processed securely through Razorpay. We do not store your credit card
                                    or debit card information on our servers. Razorpay handles all payment data in compliance
                                    with PCI-DSS standards.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">4. Data Protection</h2>
                                <p>
                                    We implement industry-standard security measures including encryption, secure HTTPS
                                    connections, and JWT-based authentication to protect your personal information.
                                    Your password is hashed using bcrypt and is never stored in plain text.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">5. Cookies</h2>
                                <p>
                                    We use essential cookies and local storage to maintain your login session and
                                    remember your preferences. We do not use third-party tracking cookies for advertising
                                    purposes.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">6. Third-Party Services</h2>
                                <p>
                                    We use third-party services for video hosting (Vimeo, Bunny CDN), payment processing
                                    (Razorpay), and database hosting (MongoDB Atlas). Each of these providers has their
                                    own privacy policies governing the data they process.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
                                <ul className="list-disc list-inside space-y-1.5">
                                    <li>Access, update, or delete your personal data at any time.</li>
                                    <li>Request a copy of the data we hold about you.</li>
                                    <li>Opt out of promotional emails.</li>
                                    <li>Delete your account and all associated data.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-3">8. Contact Us</h2>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us at{' '}
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
