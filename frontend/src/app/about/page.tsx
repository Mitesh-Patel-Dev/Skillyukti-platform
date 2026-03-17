import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';
import InstructorSection from '@/components/landing/InstructorSection';

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-24 pb-16">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8">
                    About <span className="gradient-text-accent">Us</span>
                </h1>
                
                <div className="glass rounded-3xl p-8 sm:p-12 space-y-6 text-dark-100 leading-relaxed">
                    <p className="text-lg">
                        Welcome to <strong>Skillyukti</strong>, an elite platform committed to bridging the gap between theoretical knowledge and real-world execution. 
                    </p>
                    <p>
                        We understand that today's digital economy shifts faster than traditional education can keep up with. That's why we bring together industry veterans and proven practitioners to deliver highly actionable, up-to-date courses that yield tangible results.
                    </p>
                    <p>
                        Our goal is straightforward: to equip every aspiring entrepreneur, freelancer, and digital creator with the exact systems and strategies used by top performers to build profitable online businesses. No fluff, no academic theories — just the proven frameworks we use every single day.
                    </p>
                </div>
            </div>

            <div className="mt-12">
                <InstructorSection />
            </div>

            <Footer />
        </main>
    );
}
