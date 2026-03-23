import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';
import { ScrollText, UserCheck, ShieldAlert, FileEdit } from 'lucide-react';

export default function TermsPage() {
    return (
        <main className="min-h-screen pt-24 pb-16 flex flex-col">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-24 flex-1 w-full relative">
                <div className="absolute top-20 left-10 w-64 h-64 bg-accent-purple/10 rounded-full blur-[80px]" />
                
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-8">
                    Terms & <span className="gradient-text-accent">Conditions</span>
                </h1>
                
                <div className="space-y-6 relative z-10">
                    <div className="glass rounded-3xl p-8 sm:p-10 card-hover">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <ScrollText className="w-6 h-6 text-primary-400" />
                            1. Acceptance of Terms
                        </h2>
                        <div className="text-dark-100 leading-relaxed">
                            <p>
                                By accessing, registering on, or using Skillyukti (the "Platform"), you accept and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use our services.
                            </p>
                            <p className="mt-4">
                                These terms apply to all visitors, users, students, and affiliates who access or use the Platform.
                            </p>
                        </div>
                    </div>

                    <div className="glass rounded-3xl p-8 sm:p-10 card-hover">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <ShieldAlert className="w-6 h-6 text-accent-orange" />
                            2. Use License & Intellectual Property
                        </h2>
                        <div className="text-dark-100 leading-relaxed space-y-4">
                            <p>
                                All content on Skillyukti—including course videos, materials, text, graphics, and logos—is the intellectual property of Skillyukti. We grant you a limited, non-exclusive, non-transferable license to access and view the courses for your personal, non-commercial educational use.
                            </p>
                            <p>Under this license you may <strong>NOT</strong>:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Download, record, or rip any course videos.</li>
                                <li>Share your account credentials with anyone else.</li>
                                <li>Modify, duplicate, or copy the materials.</li>
                                <li>Use the materials for any commercial purpose, or sell/resell the content.</li>
                            </ul>
                            <p className="font-medium text-accent-pink">Violation of these terms will result in immediate account termination without refund and potential legal action.</p>
                        </div>
                    </div>

                    <div className="glass rounded-3xl p-8 sm:p-10 card-hover">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <UserCheck className="w-6 h-6 text-accent-green" />
                            3. Account Registration & Affiliate Program
                        </h2>
                        <div className="text-dark-100 leading-relaxed space-y-4">
                            <p>
                                To access courses and the affiliate program, you must create an account. You agree to provide accurate, current, and complete information. You are solely responsible for keeping your password secure.
                            </p>
                            <p>
                                <strong>Affiliate Program:</strong> Affiliates earn commission by referring new users who purchase a course. Self-referrals (using your own link to buy a course) or fraudulent referrals are strictly prohibited and will result in wallet forfeiture and account ban.
                            </p>
                        </div>
                    </div>

                    <div className="glass rounded-3xl p-8 sm:p-10 card-hover">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <FileEdit className="w-6 h-6 text-accent-purple" />
                            4. Modifications & Governing Law
                        </h2>
                        <div className="text-dark-100 leading-relaxed space-y-4">
                            <p>
                                Skillyukti reserves the right to revise these Terms & Conditions at any time. By continuing to use the Platform after changes are made, you agree to be bound by the revised terms.
                            </p>
                            <p>
                                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
