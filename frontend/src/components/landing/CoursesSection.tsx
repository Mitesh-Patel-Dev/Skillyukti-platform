'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Clock, Users, ArrowRight } from 'lucide-react';
import { Course } from '@/types';

interface CoursesSectionProps {
    courses: Course[];
}

export default function CoursesSection({ courses }: CoursesSectionProps) {
    return (
        <section className="py-24 relative" id="courses">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">
                        Our Courses
                    </span>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
                        Master{' '}
                        <span className="gradient-text-accent">
                            In-Demand Skills
                        </span>
                    </h2>

                    <p className="text-dark-100 text-lg max-w-2xl mx-auto">
                        Practical, industry-ready courses designed to help you build a
                        profitable career or business online.
                    </p>
                </motion.div>

                {/* Course Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <Link
                                href={`/courses/${course.slug}`}
                                className="block h-full"
                            >
                                <div className="glass card-hover rounded-2xl overflow-hidden group h-full flex flex-col">

                                    {/* THUMBNAIL */}
                                    <div
                                        className={`relative isolate overflow-hidden bg-[#FFFFFF08]
                                            ${
                                                course.mobileThumbnail
                                                    ? 'aspect-[4/5] md:h-44 md:aspect-auto'
                                                    : 'h-44'
                                            }`}
                                    >
                                        {course.thumbnail &&
                                        course.thumbnail !==
                                            '/images/course-placeholder.jpg' ? (
                                            <>
                                                {/* Background Image - Desktop */}
                                                <img
                                                    src={course.thumbnail}
                                                    alt=""
                                                    aria-hidden="true"
                                                    className={`absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-35 ${
                                                        course.mobileThumbnail
                                                            ? 'hidden md:block'
                                                            : 'block'
                                                    }`}
                                                />

                                                {/* Background Image - Mobile */}
                                                {course.mobileThumbnail && (
                                                    <img
                                                        src={course.mobileThumbnail}
                                                        alt=""
                                                        aria-hidden="true"
                                                        className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-35 md:hidden"
                                                    />
                                                )}

                                                {/* Card-Matching Background */}
                                                <div className="absolute inset-0 bg-[#FFFFFF08] pointer-events-none" />

                                                {/* Soft Background Glow */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

                                                {/* Main Image - Desktop */}
                                                <img
                                                    src={course.thumbnail}
                                                    alt={course.title}
                                                    className={`absolute inset-0 w-full h-full object-contain z-10 transition-transform duration-500 group-hover:scale-[1.03] ${
                                                        course.mobileThumbnail
                                                            ? 'hidden md:block'
                                                            : 'block'
                                                    }`}
                                                />

                                                {/* Main Image - Mobile */}
                                                {course.mobileThumbnail && (
                                                    <img
                                                        src={course.mobileThumbnail}
                                                        alt={course.title}
                                                        className="absolute inset-0 w-full h-full object-contain z-10 transition-transform duration-500 group-hover:scale-[1.03] md:hidden"
                                                    />
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {/* Placeholder Background */}
                                                <div className="absolute inset-0 bg-[#FFFFFF08]" />

                                                {/* Placeholder Icon */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-4xl">
                                                        {course.category === 'Digital Marketing' && '📊'}
                                                        {course.category === 'Freelancing' && '💼'}
                                                        {course.category === 'AI & Technology' && '🤖'}
                                                        {course.category === 'E-commerce' && '🛒'}

                                                        {![
                                                            'Digital Marketing',
                                                            'Freelancing',
                                                            'AI & Technology',
                                                            'E-commerce',
                                                        ].includes(course.category) && '📚'}
                                                    </span>
                                                </div>
                                            </>
                                        )}

                                        {/* Category Badge */}
                                        <div className="absolute top-3 left-3 z-20">
                                            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary-600/80 text-white backdrop-blur-sm">
                                                {course.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* COURSE CONTENT */}
                                    <div className="p-5 flex flex-col flex-1">

                                        {/* Course Title */}
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-300 transition-colors line-clamp-2">
                                            {course.title}
                                        </h3>

                                        {/* Course Description */}
                                        <p className="text-dark-200 text-sm mb-4 line-clamp-2 flex-1">
                                            {course.shortDescription}
                                        </p>

                                        {/* Course Meta Information */}
                                        <div className="flex items-center gap-4 text-xs text-dark-200 mb-4">

                                            {/* Duration */}
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5 shrink-0" />
                                                <span>{course.totalDuration}</span>
                                            </div>

                                            {/* Enrolled Students */}
                                            <div className="flex items-center gap-1">
                                                <Users className="w-3.5 h-3.5 shrink-0" />
                                                <span>
                                                    {course.enrolledCount.toLocaleString()}
                                                </span>
                                            </div>

                                            {/* Rating */}
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 shrink-0" />
                                                <span>{course.rating}</span>
                                            </div>
                                        </div>

                                        {/* Price & Enroll Button */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">

                                            {/* Pricing */}
                                            <div>
                                                <span className="text-xl font-bold text-white">
                                                    ₹{course.price.toLocaleString()}
                                                </span>

                                                {course.originalPrice > course.price && (
                                                    <span className="text-sm text-dark-300 line-through ml-2">
                                                        ₹{course.originalPrice.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Enroll CTA */}
                                            <span className="text-primary-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Enroll
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All Courses Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 glass hover:bg-white/10 text-white px-8 py-3.5 rounded-2xl text-sm font-semibold transition-all"
                    >
                        View All Courses
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
