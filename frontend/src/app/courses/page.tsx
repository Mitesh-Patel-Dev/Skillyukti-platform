'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Star,
    Clock,
    Users,
    ArrowRight,
    Search,
    BookOpen,
    GraduationCap,
    SlidersHorizontal,
    Sparkles,
} from 'lucide-react';
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
        let active = true;

        const fetchCourses = async () => {
            try {
                const { data } = await api.get('/courses');

                if (!active) return;

                setCourses(Array.isArray(data) ? data : data?.courses || []);
            } catch {
                if (!active) return;

                // Fallback data
                setCourses([
                    {
                        _id: '1',
                        title: 'Digital Marketing Mastery',
                        slug: 'digital-marketing-mastery',
                        description: '',
                        shortDescription: 'Master SEO, social media, email marketing, and paid ads.',
                        price: 4999,
                        originalPrice: 9999,
                        thumbnail: '',
                        category: 'Digital Marketing',
                        instructor: { name: 'Khushabu Chauhan', bio: '', avatar: '' },
                        lessons: [],
                        totalDuration: '24h 30m',
                        totalLessons: 8,
                        published: true,
                        featured: true,
                        enrolledCount: 2345,
                        rating: 4.8,
                        createdAt: '',
                    },
                    {
                        _id: '2',
                        title: 'Freelancing Freedom Blueprint',
                        slug: 'freelancing-freedom-blueprint',
                        description: '',
                        shortDescription: 'Build a profitable freelancing career from scratch.',
                        price: 3999,
                        originalPrice: 7999,
                        thumbnail: '',
                        category: 'Freelancing',
                        instructor: { name: 'Khushabu Chauhan', bio: '', avatar: '' },
                        lessons: [],
                        totalDuration: '18h 15m',
                        totalLessons: 6,
                        published: true,
                        featured: true,
                        enrolledCount: 1890,
                        rating: 4.7,
                        createdAt: '',
                    },
                    {
                        _id: '3',
                        title: 'AI & Automation for Business',
                        slug: 'ai-automation-for-business',
                        description: '',
                        shortDescription: 'Use AI tools and automation to 10x your productivity.',
                        price: 5999,
                        originalPrice: 11999,
                        thumbnail: '',
                        category: 'AI & Technology',
                        instructor: { name: 'Khushabu Chauhan', bio: '', avatar: '' },
                        lessons: [],
                        totalDuration: '20h 45m',
                        totalLessons: 7,
                        published: true,
                        featured: true,
                        enrolledCount: 3210,
                        rating: 4.9,
                        createdAt: '',
                    },
                    {
                        _id: '4',
                        title: 'E-commerce Store Builder',
                        slug: 'ecommerce-store-builder',
                        description: '',
                        shortDescription: 'Launch a profitable online store.',
                        price: 6999,
                        originalPrice: 13999,
                        thumbnail: '',
                        category: 'E-commerce',
                        instructor: { name: 'Khushabu Chauhan', bio: '', avatar: '' },
                        lessons: [],
                        totalDuration: '22h 10m',
                        totalLessons: 7,
                        published: true,
                        featured: true,
                        enrolledCount: 1567,
                        rating: 4.6,
                        createdAt: '',
                    },
                ]);
            } finally {
                if (active) setLoading(false);
            }
        };

        fetchCourses();

        return () => {
            active = false;
        };
    }, []);

    const categories = [
        'All',
        ...Array.from(new Set(courses.map((course) => course.category))),
    ];

    const filtered = courses.filter((course) => {
        const matchSearch =
            course.title.toLowerCase().includes(search.toLowerCase()) ||
            (course.shortDescription || '').toLowerCase().includes(search.toLowerCase());

        const matchCategory =
            category === 'All' || course.category === category;

        return matchSearch && matchCategory;
    });

    const getCategoryEmoji = (courseCategory: string) => {
        switch (courseCategory) {
            case 'Digital Marketing':
                return '📊';
            case 'Freelancing':
                return '💼';
            case 'AI & Technology':
                return '🤖';
            case 'E-commerce':
                return '🛒';
            default:
                return '📚';
        }
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-white pb-24 pt-24 sm:pb-28">
                {/* Hero & Course Listing */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative mb-10 overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-violet-50 px-5 py-12 text-center sm:px-10 sm:py-16"
                    >
                        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-24 -right-12 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl" />

                        <div className="relative z-10">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 shadow-sm">
                                <Sparkles className="h-4 w-4 text-blue-600" />
                                <span className="text-xs font-semibold text-blue-700 sm:text-sm">
                                    Learn Skills. Build Your Future.
                                </span>
                            </div>

                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                                Explore{' '}
                                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                    Our Courses
                                </span>
                            </h1>

                            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base lg:text-lg">
                                Discover practical, industry-focused courses designed
                                to help you develop in-demand skills and build your career.
                            </p>

                            <div className="mt-7 flex flex-wrap items-center justify-center gap-5 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                                        <BookOpen className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span>Practical Learning</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
                                        <GraduationCap className="h-4 w-4 text-violet-600" />
                                    </div>
                                    <span>Career-Focused Skills</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Search and Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                    >
                        <div className="mb-4 flex items-center gap-2">
                            <SlidersHorizontal className="h-5 w-5 text-blue-600" />
                            <h2 className="text-base font-bold text-slate-900">
                                Find Your Course
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* Search Input */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search courses by title or description..."
                                    aria-label="Search courses"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                                />
                            </div>

                            {/* Category Filters */}
                            <div>
                                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Browse by category
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => {
                                        const active = category === cat;

                                        return (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setCategory(cat)}
                                                className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                                                    active
                                                        ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-100'
                                                        : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700'
                                                }`}
                                            >
                                                {cat}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Results Header */}
                    <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                                {category === 'All' ? 'All Courses' : category}
                            </h2>

                            {!loading && (
                                <p className="mt-1 text-sm text-slate-500">
                                    {filtered.length} {filtered.length === 1 ? 'course' : 'courses'} found
                                </p>
                            )}
                        </div>

                        {(search || category !== 'All') && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch('');
                                    setCategory('All');
                                }}
                                className="self-start text-sm font-semibold text-blue-600 transition hover:text-blue-800 sm:self-auto"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>

                    {/* Loading Skeletons */}
                    {loading ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div
                                    key={item}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                                >
                                    <div className="h-48 animate-pulse bg-slate-100" />

                                    <div className="space-y-4 p-5">
                                        <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100" />
                                        <div className="h-6 w-4/5 animate-pulse rounded bg-slate-100" />
                                        <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                                        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                                        <div className="mt-5 flex justify-between border-t border-slate-100 pt-4">
                                            <div className="h-7 w-24 animate-pulse rounded bg-slate-100" />
                                            <div className="h-7 w-24 animate-pulse rounded bg-slate-100" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {/* Courses Grid */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filtered.map((course, index) => {
                                    const discount =
                                        course.originalPrice > course.price &&
                                        course.originalPrice > 0
                                            ? Math.round(
                                                (1 - course.price / course.originalPrice) * 100
                                            )
                                            : 0;

                                    return (
                                        <motion.div
                                            key={course._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: Math.min(index * 0.06, 0.3),
                                                duration: 0.35,
                                            }}
                                            className="h-full"
                                        >
                                            <Link
                                                href={`/courses/${course.slug}`}
                                                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
                                            >
                                                {/* Course Thumbnail */}
                                                <div
                                                    className={`relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-100 ${
                                                        course.mobileThumbnail
                                                            ? 'aspect-[4/5] sm:aspect-auto sm:h-48'
                                                            : 'h-48'
                                                    }`}
                                                >
                                                    {course.thumbnail &&
                                                    course.thumbnail !== '/images/course-placeholder.jpg' ? (
                                                        <>
                                                            {course.mobileThumbnail && (
                                                                <img
                                                                    src={course.mobileThumbnail}
                                                                    alt={course.title}
                                                                    loading="lazy"
                                                                    className="absolute inset-0 h-full w-full object-cover sm:hidden"
                                                                />
                                                            )}

                                                            <img
                                                                src={course.thumbnail}
                                                                alt={course.title}
                                                                loading="lazy"
                                                                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                                                                    course.mobileThumbnail
                                                                        ? 'hidden sm:block'
                                                                        : ''
                                                                }`}
                                                            />
                                                        </>
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/80 bg-white/70 text-5xl shadow-sm backdrop-blur-sm">
                                                                {getCategoryEmoji(course.category)}
                                                            </div>

                                                            <div className="absolute -bottom-10 -right-8 h-36 w-36 rounded-full bg-blue-200/40 blur-2xl" />
                                                            <div className="absolute -left-8 -top-10 h-32 w-32 rounded-full bg-violet-200/50 blur-2xl" />
                                                        </div>
                                                    )}

                                                    {/* Category Badge */}
                                                    <div className="absolute left-3 top-3 z-10">
                                                        <span className="inline-flex max-w-[200px] items-center rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm backdrop-blur-sm">
                                                            {course.category}
                                                        </span>
                                                    </div>

                                                    {/* Discount Badge */}
                                                    {discount > 0 && (
                                                        <div className="absolute right-3 top-3 z-10">
                                                            <span className="rounded-full bg-rose-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                                                                {discount}% OFF
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Featured Badge */}
                                                    {course.featured && (
                                                        <div className="absolute bottom-3 left-3 z-10">
                                                            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-white/95 px-2.5 py-1 text-xs font-semibold text-amber-700 shadow-sm">
                                                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                                                Featured
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Course Information */}
                                                <div className="flex flex-1 flex-col p-5 sm:p-6">
                                                    <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-7 text-slate-900 transition-colors group-hover:text-blue-700">
                                                        {course.title}
                                                    </h3>

                                                    <p className="mb-5 line-clamp-2 flex-1 text-sm leading-6 text-slate-500">
                                                        {course.shortDescription ||
                                                            course.description ||
                                                            'Explore this course and develop practical skills for your career.'}
                                                    </p>

                                                    {/* Course Stats */}
                                                    <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="h-4 w-4 text-blue-500" />
                                                            <span>
                                                                {course.totalDuration || 'Self-paced'}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center gap-1.5">
                                                            <Users className="h-4 w-4 text-violet-500" />
                                                            <span>
                                                                {(course.enrolledCount ?? 0).toLocaleString()}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center gap-1.5">
                                                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                            <span className="text-slate-700">
                                                                {typeof course.rating === 'number'
                                                                    ? course.rating.toFixed(1)
                                                                    : 'New'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Price and CTA */}
                                                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                                                        <div className="min-w-0">
                                                            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                                                                <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                                                                    ₹{course.price.toLocaleString('en-IN')}
                                                                </span>

                                                                {discount > 0 && (
                                                                    <span className="text-sm text-slate-400 line-through">
                                                                        ₹{course.originalPrice.toLocaleString('en-IN')}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {discount > 0 && (
                                                                <p className="mt-1 text-xs font-semibold text-emerald-600">
                                                                    Save ₹{(course.originalPrice - course.price).toLocaleString('en-IN')}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-2.5 text-sm font-bold text-blue-700 transition-all group-hover:bg-blue-600 group-hover:text-white">
                                                            Explore
                                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Empty State */}
                            {filtered.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-5 py-16 text-center sm:py-20"
                                >
                                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                                        <Search className="h-7 w-7 text-slate-400" />
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900">
                                        No Courses Found
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                        We couldn&apos;t find any courses matching your search.
                                        Try another keyword or select a different category.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSearch('');
                                            setCategory('All');
                                        }}
                                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                                    >
                                        View All Courses
                                    </button>
                                </motion.div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
