import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';
import { Shield, Eye, Lock, Database } from 'lucide-react';

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen pt-24 pb-16 flex flex-col">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-24 flex-1 w-full relative">
                <div className="absolute top-20 right-10 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px]" />
                
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-8">
                    Privacy <span className="gradient-text-accent">Policy</span>
                </h1>
                
                <div className="space-y-6 relative z-10">
                    <div className="glass rounded-3xl p-8 sm:p-10 card-hover">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Eye className="w-6 h-6 text-primary-400" />
                            1. Information We Collect
                        </h2>
                        <div className="text-dark-100 leading-relaxed space-y-4">
                            <p>
                                We collect information you provide directly to us when you create an account, enroll in courses, participate in our affiliate program, or communicate with us. The types of personal information we may collect include:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Account Information:</strong> Name, email address, password, and profile picture.</li>
                                <li><strong>Transaction Information:</strong> When you purchase a course or withdraw affiliate earnings, we collect transaction details (note: full payment details like credit card numbers are processed securely by Razorpay and are not stored on our servers).</li>
                                <li><strong>Usage Data:</strong> Course progress, lessons watched, and interaction with our platform.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="glass rounded-3xl p-8 sm:p-10 card-hover">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Database className="w-6 h-6 text-accent-green" />
                            2. How We Use Your Information
                        </h2>
                        <div className="text-dark-100 leading-relaxed space-y-4">
                            <p>We use the information we collect to operate, maintain, and improve our services, including to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Provide and deliver the courses and services you request.</li>
                                <li>Process transactions and manage your wallet and affiliate payouts.</li>
                                <li>Send administrative messages, security alerts, and account updates.</li>
                                <li>Respond to your comments, questions, and customer service requests.</li>
                                <li>Monitor and analyze trends, usage, and activities in connection with our platform.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="glass rounded-3xl p-8 sm:p-10 card-hover">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Lock className="w-6 h-6 text-accent-purple" />
                            3. Data Security
                        </h2>
                        <div className="text-dark-100 leading-relaxed">
                            <p>
                                We take data security seriously. Skillyukti implements reasonable technical and organizational security measures designed to protect your personal data against unauthorized access, destruction, loss, or alteration.
                            </p>
                            <p className="mt-4">
                                Account passwords are encrypted using industry-standard hashing algorithms, and all data transmission between your browser and our servers is secured via HTTPS/encryption. While no method of transmission over the Internet is 100% secure, we continuously monitor our systems for vulnerabilities.
                            </p>
                        </div>
                    </div>

                    <div className="glass rounded-3xl p-8 sm:p-10 card-hover">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Shield className="w-6 h-6 text-accent-orange" />
                            4. Sharing of Information
                        </h2>
                        <div className="text-dark-100 leading-relaxed">
                            <p>
                                We do not sell your personal data. We only share information with third-party service providers (like payment processors and email service providers) who need access to such information to carry out work on our behalf. These parties are strictly required to protect your data and only use it for its intended purpose.
                            </p>
                            <p className="mt-4 font-medium text-dark-50">
                                If you have any questions or concerns regarding this policy, please contact us at <a href="mailto:support@skillyukti.com" className="text-primary-400 hover:text-primary-300">support@skillyukti.com</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
