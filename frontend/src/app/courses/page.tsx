'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Clock, Users, ArrowRight, Search, Filter } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';
import api from '@/lib/api';
import { Course } from '@/types';

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await api.get('/courses');
                setCourses(data);
            } catch {
                // Fallback data
                setCourses([
                    {
                        _id: '1', title: 'Digital Marketing Mastery', slug: 'digital-marketing-mastery',
                        description: '', shortDescription: 'Master SEO, social media, email marketing, and paid ads.',
                        price: 4999, originalPrice: 9999, thumbnail: '', category: 'Digital Marketing',
                        instructor: { name: 'Rahul Sharma', bio: '', avatar: '' },
                        lessons: [], totalDuration: '24h 30m', totalLessons: 8, published: true,
                        featured: true, enrolledCount: 2345, rating: 4.8, createdAt: '',
                    },
                    {
                        _id: '2', title: 'Freelancing Freedom Blueprint', slug: 'freelancing-freedom-blueprint',
                        description: '', shortDescription: 'Build a profitable freelancing career from scratch.',
                        price: 3999, originalPrice: 7999, thumbnail: '', category: 'Freelancing',
                        instructor: { name: 'Rahul Sharma', bio: '', avatar: '' },
                        lessons: [], totalDuration: '18h 15m', totalLessons: 6, published: true,
                        featured: true, enrolledCount: 1890, rating: 4.7, createdAt: '',
                    },
                    {
                        _id: '3', title: 'AI & Automation for Business', slug: 'ai-automation-for-business',
                        description: '', shortDescription: 'Use AI tools and automation to 10x your productivity.',
                        price: 5999, originalPrice: 11999, thumbnail: '', category: 'AI & Technology',
                        instructor: { name: 'Rahul Sharma', bio: '', avatar: '' },
                        lessons: [], totalDuration: '20h 45m', totalLessons: 7, published: true,
                        featured: true, enrolledCount: 3210, rating: 4.9, createdAt: '',
                    },
                    {
                        _id: '4', title: 'E-commerce Store Builder', slug: 'ecommerce-store-builder',
                        description: '', shortDescription: 'Launch a profitable online store.',
                        price: 6999, originalPrice: 13999, thumbnail: '', category: 'E-commerce',
                        instructor: { name: 'Rahul Sharma', bio: '', avatar: '' },
                        lessons: [], totalDuration: '22h 10m', totalLessons: 7, published: true,
                        featured: true, enrolledCount: 1567, rating: 4.6, createdAt: '',
                    },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const categories = ['All', ...Array.from(new Set(courses.map((c) => c.category)))];

    const filtered = courses.filter((c) => {
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === 'All' || c.category === category;
        return matchSearch && matchCategory;
    });

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Explore <span className="gradient-text-accent">Our Courses</span>
                        </h1>
                        <p className="text-dark-100 text-lg max-w-2xl mx-auto">
                            Industry-ready courses designed to help you build a profitable career online.
                        </p>
                    </motion.div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-300" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search courses..."
                                className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-dark-300 focus:outline-none focus:border-primary-500 transition-all"
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${category === cat
                                        ? 'bg-primary-600 text-white'
                                        : 'glass text-dark-100 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="glass rounded-2xl h-80 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((course, index) => (
                                <motion.div
                                    key={course._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link href={`/courses/${course.slug}`}>
                                        <div className="glass card-hover rounded-2xl overflow-hidden group h-full flex flex-col">
                                            <div className="relative h-48 bg-gradient-to-br from-primary-900/50 to-dark-700">
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-accent-purple/20" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-5xl">
                                                        {course.category === 'Digital Marketing' && '📊'}
                                                        {course.category === 'Freelancing' && '💼'}
                                                        {course.category === 'AI & Technology' && '🤖'}
                                                        {course.category === 'E-commerce' && '🛒'}
                                                    </span>
                                                </div>
                                                <div className="absolute top-3 left-3">
                                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-600/80 text-white backdrop-blur-sm">
                                                        {course.category}
                                                    </span>
                                                </div>
                                                {course.originalPrice > course.price && (
                                                    <div className="absolute top-3 right-3">
                                                        <span className="px-2 py-1 text-xs font-bold rounded-full bg-accent-pink/80 text-white">
                                                            {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-6 flex flex-col flex-1">
                                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-dark-200 text-sm mb-4 flex-1">
                                                    {course.shortDescription}
                                                </p>

                                                <div className="flex items-center gap-4 text-xs text-dark-200 mb-4">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        {course.totalDuration}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="w-3.5 h-3.5" />
                                                        {course.enrolledCount.toLocaleString()}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                                        {course.rating}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                    <div>
                                                        <span className="text-2xl font-bold text-white">₹{course.price.toLocaleString()}</span>
                                                        {course.originalPrice > course.price && (
                                                            <span className="text-sm text-dark-300 line-through ml-2">₹{course.originalPrice.toLocaleString()}</span>
                                                        )}
                                                    </div>
                                                    <span className="text-primary-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                                        View Course <ArrowRight className="w-4 h-4" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {!loading && filtered.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-dark-200 text-lg">No courses found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
