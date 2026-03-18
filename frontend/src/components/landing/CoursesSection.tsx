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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        Master <span className="gradient-text-accent">In-Demand Skills</span>
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
                        >
                            <Link href={`/courses/${course.slug}`}>
                                <div className="glass card-hover rounded-2xl overflow-hidden group h-full flex flex-col">
                                    {/* Thumbnail */}
                                    <div className="relative h-44 bg-gradient-to-br from-primary-900/50 to-dark-700 overflow-hidden">
                                        {course.thumbnail && course.thumbnail !== '/images/course-placeholder.jpg' ? (
                                            <>
                                                {course.mobileThumbnail && (
                                                    <img src={course.mobileThumbnail} alt={course.title} className="md:hidden absolute inset-0 w-full h-full object-cover" />
                                                )}
                                                <img src={course.thumbnail} alt={course.title} className={`absolute inset-0 w-full h-full object-cover ${course.mobileThumbnail ? 'hidden md:block' : ''}`} />
                                            </>
                                        ) : (
                                            <>
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-accent-purple/20" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-4xl">
                                                        {course.category === 'Digital Marketing' && '📊'}
                                                        {course.category === 'Freelancing' && '💼'}
                                                        {course.category === 'AI & Technology' && '🤖'}
                                                        {course.category === 'E-commerce' && '🛒'}
                                                        {!['Digital Marketing', 'Freelancing', 'AI & Technology', 'E-commerce'].includes(course.category) && '📚'}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                        {/* Badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary-600/80 text-white backdrop-blur-sm">
                                                {course.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-300 transition-colors line-clamp-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-dark-200 text-sm mb-4 line-clamp-2 flex-1">
                                            {course.shortDescription}
                                        </p>

                                        {/* Meta */}
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

                                        {/* Price & CTA */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
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

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
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
