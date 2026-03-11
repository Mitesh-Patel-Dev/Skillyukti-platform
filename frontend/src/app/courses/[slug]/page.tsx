'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Star, Clock, Users, BookOpen, Play, Lock, Download,
    CheckCircle, ArrowRight, ChevronDown, ChevronUp,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Course, Lesson } from '@/types';

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user, isEnrolled } = useAuth();
    const [course, setCourse] = useState<(Course & { curriculum?: Lesson[] }) | null>(null);
    const [loading, setLoading] = useState(true);
    const [expandedSection, setExpandedSection] = useState<number>(0);

    const slug = params.slug as string;

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await api.get(`/courses/${slug}`);
                setCourse(data);
            } catch {
                setCourse(null);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [slug]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                </div>
            </>
        );
    }

    if (!course) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Course Not Found</h1>
                    <Link href="/courses" className="text-primary-400 hover:text-primary-300">
                        Browse all courses →
                    </Link>
                </div>
            </>
        );
    }

    const enrolled = course && user ? isEnrolled(course._id) : false;

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-20">
                {/* Hero Section */}
                <div className="relative py-16 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-900/30 to-dark-900" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[150px]" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Left - Course Info */}
                            <div className="lg:col-span-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary-600/80 text-white mb-4">
                                        {course.category}
                                    </span>
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                                        {course.title}
                                    </h1>
                                    <p className="text-dark-100 text-lg mb-6 leading-relaxed">
                                        {course.description}
                                    </p>

                                    {/* Meta */}
                                    <div className="flex flex-wrap items-center gap-6 mb-8">
                                        <div className="flex items-center gap-1.5">
                                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                            <span className="text-white font-semibold">{course.rating}</span>
                                            <span className="text-dark-200">rating</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-dark-100">
                                            <Users className="w-5 h-5" />
                                            {course.enrolledCount.toLocaleString()} students
                                        </div>
                                        <div className="flex items-center gap-1.5 text-dark-100">
                                            <Clock className="w-5 h-5" />
                                            {course.totalDuration}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-dark-100">
                                            <BookOpen className="w-5 h-5" />
                                            {course.totalLessons} lessons
                                        </div>
                                    </div>

                                    {/* Instructor */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-white font-bold">
                                            {course.instructor.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-sm">{course.instructor.name}</p>
                                            <p className="text-dark-200 text-xs">Instructor</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right - Pricing Card */}
                            <div className="lg:col-span-1">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="glass rounded-2xl p-6 sticky top-24"
                                >
                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-3 mb-1">
                                            <span className="text-4xl font-bold text-white">
                                                ₹{course.price.toLocaleString()}
                                            </span>
                                            {course.originalPrice > course.price && (
                                                <span className="text-lg text-dark-300 line-through">
                                                    ₹{course.originalPrice.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                        {course.originalPrice > course.price && (
                                            <span className="text-accent-green text-sm font-semibold">
                                                Save {Math.round((1 - course.price / course.originalPrice) * 100)}%
                                            </span>
                                        )}
                                    </div>

                                    {/* CTA */}
                                    {enrolled ? (
                                        <Link
                                            href={`/dashboard/course/${course.slug}`}
                                            className="glow-btn w-full bg-gradient-to-r from-accent-green to-accent-cyan text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 mb-4"
                                        >
                                            <Play className="w-5 h-5" />
                                            Continue Learning
                                        </Link>
                                    ) : (
                                        <Link
                                            href={user ? `/checkout/${course.slug}` : '/login'}
                                            className="glow-btn w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 mb-4"
                                        >
                                            Enroll Now
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    )}

                                    {/* Features */}
                                    <ul className="space-y-3 mt-6">
                                        {[
                                            `${course.totalLessons} HD video lessons`,
                                            course.totalDuration + ' of content',
                                            'Lifetime access',
                                            'Downloadable resources',
                                            'Certificate of completion',
                                            'Community access',
                                        ].map((feature) => (
                                            <li key={feature} className="flex items-center gap-2 text-dark-100 text-sm">
                                                <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Curriculum */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-white mb-8">Course Curriculum</h2>
                        <div className="space-y-3 max-w-3xl">
                            {(course.curriculum || []).map((lesson, index) => (
                                <motion.div
                                    key={lesson._id || index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="glass rounded-xl overflow-hidden"
                                >
                                    <button
                                        onClick={() => setExpandedSection(expandedSection === index ? -1 : index)}
                                        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary-600/20 flex items-center justify-center text-primary-400 text-sm font-semibold">
                                                {index + 1}
                                            </div>
                                            <div className="text-left">
                                                <h4 className="text-white font-medium text-sm">{lesson.title}</h4>
                                                <p className="text-dark-300 text-xs">{lesson.duration}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {lesson.isFree ? (
                                                <span className="px-2 py-0.5 text-xs rounded-full bg-accent-green/20 text-accent-green font-medium">Free</span>
                                            ) : !enrolled ? (
                                                <Lock className="w-4 h-4 text-dark-300" />
                                            ) : null}
                                            {expandedSection === index ? (
                                                <ChevronUp className="w-4 h-4 text-dark-300" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4 text-dark-300" />
                                            )}
                                        </div>
                                    </button>

                                    {expandedSection === index && (
                                        <div className="px-4 pb-4 border-t border-white/5 pt-3">
                                            <p className="text-dark-200 text-sm">{lesson.description || 'No description available.'}</p>
                                            {lesson.resources && lesson.resources.length > 0 && (
                                                <div className="mt-2 flex items-center gap-2">
                                                    <Download className="w-3.5 h-3.5 text-primary-400" />
                                                    <span className="text-primary-400 text-xs">
                                                        {lesson.resources.length} resource(s)
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {(!course.curriculum || course.curriculum.length === 0) && (
                                <div className="glass rounded-xl p-8 text-center">
                                    <BookOpen className="w-10 h-10 text-dark-300 mx-auto mb-3" />
                                    <p className="text-dark-200">Curriculum will be available soon.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
