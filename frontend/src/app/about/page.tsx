import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';
import InstructorSection from '@/components/landing/InstructorSection';
import { Target, Lightbulb, ShieldCheck, Users, TrendingUp, Award } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-24 pb-16">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
                        About <span className="gradient-text-accent">Skillyukti</span>
                    </h1>
                    <p className="text-lg text-dark-100 max-w-2xl mx-auto leading-relaxed">
                        Bridging the gap between theoretical knowledge and real-world execution to empower the next generation of digital entrepreneurs.
                    </p>
                </div>
                
                <div className="glass rounded-3xl p-8 sm:p-12 space-y-8 text-dark-100 leading-relaxed mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px]" />
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Target className="text-accent-orange" /> Our Mission
                        </h2>
                        <p className="mb-8">
                            Our mission is straightforward: to equip every aspiring entrepreneur, freelancer, and digital creator with the exact systems and strategies used by top performers to build profitable online businesses. No fluff, no academic theories — just the proven frameworks we use every single day.
                        </p>
                        
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Lightbulb className="text-accent-green" /> Our Vision
                        </h2>
                        <p>
                            We envision a world where anyone, regardless of their background, can access the high-income digital skills necessary to achieve financial freedom and build a career on their own terms. We understand that today's digital economy shifts faster than traditional education can keep up with, which is why we focus on agility, practical application, and continuous learning.
                        </p>
                    </div>
                </div>

                {/* Features Grid */}
                <h3 className="text-3xl font-bold text-center text-white mb-8">Why Choose <span className="gradient-text">Us?</span></h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    <div className="glass rounded-2xl p-6 hover:bg-white/5 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mb-4">
                            <Award className="w-6 h-6 text-primary-400" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">Expert Mentorship</h4>
                        <p className="text-sm text-dark-200">Learn directly from industry veterans who have built 7-figure businesses.</p>
                    </div>
                    
                    <div className="glass rounded-2xl p-6 hover:bg-white/5 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-accent-green/20 flex items-center justify-center mb-4">
                            <TrendingUp className="w-6 h-6 text-accent-green" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">Practical Skills</h4>
                        <p className="text-sm text-dark-200">Focus on highly actionable, up-to-date strategies that yield tangible results.</p>
                    </div>

                    <div className="glass rounded-2xl p-6 hover:bg-white/5 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center mb-4">
                            <Users className="w-6 h-6 text-accent-purple" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">Community Support</h4>
                        <p className="text-sm text-dark-200">Join a network of ambitious learners and collaborate on your journey to success.</p>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <InstructorSection />
            </div>

            <Footer />
        </main>
    );
}
