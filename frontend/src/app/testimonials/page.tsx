'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTABanner from '@/components/landing/CTABanner';
import api from '@/lib/api';
import { Testimonial } from '@/types';

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const { data } = await api.get('/testimonials');
                setTestimonials(data);
            } catch (error) {
                // Fallback
                setTestimonials([
                    { _id: '1', name: 'Priya Mehta', avatar: '', role: 'Freelancer', content: 'This platform completely changed my career. I went from a ₹30K salary to earning ₹2L+ per month!', rating: 5, featured: true },
                    { _id: '2', name: 'Amit Kumar', avatar: '', role: 'Digital Marketer', content: 'The digital marketing course is incredibly detailed. I now run campaigns for 5 clients.', rating: 5, featured: true },
                    { _id: '3', name: 'Sneha Patel', avatar: '', role: 'E-commerce Owner', content: 'I built my store after taking the course. Now doing ₹5L monthly revenue!', rating: 5, featured: true },
                    { _id: '4', name: 'Ravi Singh', avatar: '', role: 'Student', content: 'Incredible value. The instructors really know what they are talking about.', rating: 4, featured: true },
                    { _id: '5', name: 'Alok Varma', avatar: '', role: 'Software Dev', content: 'The AI automation tricks alone saved me 10 hours a week.', rating: 5, featured: false },
                    { _id: '6', name: 'Geeta Roy', avatar: '', role: 'Agency Owner', content: 'I made my team take these courses. 10x ROI for my agency easily.', rating: 5, featured: true },
                ]);
            }
        };
        fetchTestimonials();
    }, []);

    return (
        <main className="min-h-screen pt-24 pb-0">
            <Navbar />
            
            <div className="mt-8 mb-16">
                <TestimonialsSection testimonials={testimonials} />
            </div>

            <CTABanner />
            <Footer />
        </main>
    );
}
