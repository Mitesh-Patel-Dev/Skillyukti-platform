'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import CoursesSection from '@/components/landing/CoursesSection';
import HowItWorks from '@/components/landing/HowItWorks';
import InstructorSection from '@/components/landing/InstructorSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTABanner from '@/components/landing/CTABanner';
import Footer from '@/components/landing/Footer';
import api from '@/lib/api';
import { Course, Testimonial } from '@/types';

export default function HomePage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesRes, testimonialsRes] = await Promise.all([
                    api.get('/courses/featured'),
                    api.get('/testimonials'),
                ]);
                setCourses(coursesRes.data);
                setTestimonials(testimonialsRes.data);
            } catch (error) {
                // Use fallback data if API is not available
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
                setTestimonials([
                    { _id: '1', name: 'Priya Mehta', avatar: '', role: 'Freelancer', content: 'This platform completely changed my career. I went from a ₹30K salary to earning ₹2L+ per month!', rating: 5, featured: true },
                    { _id: '2', name: 'Amit Kumar', avatar: '', role: 'Digital Marketer', content: 'The digital marketing course is incredibly detailed. I now run campaigns for 5 clients.', rating: 5, featured: true },
                    { _id: '3', name: 'Sneha Patel', avatar: '', role: 'E-commerce Owner', content: 'I built my store after taking the course. Now doing ₹5L monthly revenue!', rating: 5, featured: true },
                ]);
            }
        };
        fetchData();
    }, []);

    return (
        <main>
            <Navbar />
            <Hero />
            <CoursesSection courses={courses} />
            <HowItWorks />
            <InstructorSection />
            <TestimonialsSection testimonials={testimonials} />
            <CTABanner />
            <Footer />
        </main>
    );
}
