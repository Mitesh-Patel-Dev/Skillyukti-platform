'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Package, ArrowRight, PlayCircle, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Link from 'next/link';
import { Course } from '@/types';

export default function MyPlanPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) { router.push('/login'); return; }
        if (user) {
            api.get('/auth/me').then(({ data }) => setCourses(data.enrolledCourses || [])).catch(() => {}).finally(() => setLoading(false));
        }
    }, [user, authLoading, router]);

    if (authLoading || loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" /></div>;

    return (
        <div className="max-w-3xl mx-auto">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-accent-orange" /> My Plan
            </motion.h1>

            {courses.length === 0 ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-12 text-center">
                    <Package className="w-12 h-12 text-dark-300 mx-auto mb-4" />
                    <h2 className="text-white font-semibold text-lg mb-2">No Active Plan</h2>
                    <p className="text-dark-300 mb-6">You haven't enrolled in any course or package yet.</p>
                    <Link href="/courses" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-3 rounded-xl font-semibold">
                        Browse Courses <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            ) : (
                <div className="space-y-4">
                    {courses.map((course: any, i) => (
                        <motion.div key={course._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                            className="glass rounded-2xl p-5 flex items-center gap-5">
                            {course.mobileThumbnail || course.thumbnail ? (
                                <img src={course.mobileThumbnail || course.thumbnail} alt={course.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                            ) : (
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-600/30 to-accent-purple/30 flex items-center justify-center flex-shrink-0">
                                    <BookOpen className="w-7 h-7 text-primary-400" />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-semibold mb-1 truncate">{course.title}</h3>
                                <p className="text-dark-300 text-sm">{course.category}</p>
                                <div className="mt-2 flex items-center gap-4 text-xs text-dark-400">
                                    <span>{course.totalLessons} lessons</span>
                                    <span className="px-2 py-0.5 rounded-full bg-accent-green/10 text-accent-green font-medium">Active</span>
                                </div>
                            </div>
                            <Link href={`/dashboard/course/${course.slug}`}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-600/20 text-primary-400 hover:bg-primary-600/30 transition-colors text-sm font-medium flex-shrink-0">
                                <PlayCircle className="w-4 h-4" /> Continue
                            </Link>
                        </motion.div>
                    ))}

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-5 border border-primary-500/20">
                        <p className="text-dark-200 text-sm">Want to upgrade or add more courses?</p>
                        <Link href="/courses" className="inline-flex items-center gap-2 mt-3 text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
                            Explore More Courses <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
