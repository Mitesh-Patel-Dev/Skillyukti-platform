import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db';
import User from './models/User';
import Course from './models/Course';
import Lesson from './models/Lesson';
import Testimonial from './models/Testimonial';

dotenv.config();

/**
 * Seed script to populate the database with demo data.
 * Run: npm run seed
 */
const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany({});
        await Course.deleteMany({});
        await Lesson.deleteMany({});
        await Testimonial.deleteMany({});

        console.log('🗑️  Cleared existing data');

        // ─── Create Admin User ───
        const admin = await User.create({
            name: 'Admin',
            email: 'admin@skillyukti.com',
            password: 'admin123',
            role: 'admin',
        });
        console.log('👤 Admin user created: admin@skillyukti.com / admin123');

        // ─── Create Demo Student ───
        const student = await User.create({
            name: 'Demo Student',
            email: 'student@skillyukti.com',
            password: 'student123',
            role: 'student',
        });
        console.log('👤 Student user created: student@skillyukti.com / student123');

        // ─── Create Courses ───
        const courses = await Course.create([
            {
                title: 'Digital Marketing Mastery',
                slug: 'digital-marketing-mastery',
                description:
                    'Learn the complete digital marketing framework including SEO, social media marketing, email marketing, content marketing, and paid advertising. This comprehensive course covers everything from fundamentals to advanced strategies used by top marketers.',
                shortDescription:
                    'Master SEO, social media, email marketing, and paid ads to grow any business online.',
                price: 4999,
                originalPrice: 9999,
                thumbnail: '/images/course-1.jpg',
                instructor: {
                    name: 'Rahul Sharma',
                    bio: 'Digital marketing expert with 10+ years of experience helping businesses grow online.',
                    avatar: '/images/instructor.jpg',
                },
                category: 'Digital Marketing',
                totalDuration: '24h 30m',
                totalLessons: 8,
                published: true,
                featured: true,
                enrolledCount: 2345,
                rating: 4.8,
            },
            {
                title: 'Freelancing Freedom Blueprint',
                slug: 'freelancing-freedom-blueprint',
                description:
                    'Start and scale your freelancing career. Learn how to find high paying clients, build a personal brand, create proposals that win, and manage your freelance business effectively. Go from zero to a full-time freelancer.',
                shortDescription:
                    'Build a profitable freelancing career from scratch with proven strategies.',
                price: 3999,
                originalPrice: 7999,
                thumbnail: '/images/course-2.jpg',
                instructor: {
                    name: 'Rahul Sharma',
                    bio: 'Freelance consultant who has helped 500+ people start freelancing careers.',
                    avatar: '/images/instructor.jpg',
                },
                category: 'Freelancing',
                totalDuration: '18h 15m',
                totalLessons: 6,
                published: true,
                featured: true,
                enrolledCount: 1890,
                rating: 4.7,
            },
            {
                title: 'AI & Automation for Business',
                slug: 'ai-automation-for-business',
                description:
                    'Leverage AI tools and automation to 10x your productivity and business growth. Learn ChatGPT, AI content creation, automated marketing funnels, and business process automation.',
                shortDescription:
                    'Use AI tools and automation to 10x your productivity and business revenue.',
                price: 5999,
                originalPrice: 11999,
                thumbnail: '/images/course-3.jpg',
                instructor: {
                    name: 'Rahul Sharma',
                    bio: 'AI consultant helping businesses integrate AI into their workflows.',
                    avatar: '/images/instructor.jpg',
                },
                category: 'AI & Technology',
                totalDuration: '20h 45m',
                totalLessons: 7,
                published: true,
                featured: true,
                enrolledCount: 3210,
                rating: 4.9,
            },
            {
                title: 'E-commerce Store Builder',
                slug: 'ecommerce-store-builder',
                description:
                    'Build and launch your own profitable e-commerce store. Learn product sourcing, store setup, Facebook & Instagram ads, conversion optimization, and scaling strategies.',
                shortDescription:
                    'Launch a profitable online store with proven e-commerce strategies.',
                price: 6999,
                originalPrice: 13999,
                thumbnail: '/images/course-4.jpg',
                instructor: {
                    name: 'Rahul Sharma',
                    bio: 'E-commerce entrepreneur with multiple 7-figure online stores.',
                    avatar: '/images/instructor.jpg',
                },
                category: 'E-commerce',
                totalDuration: '22h 10m',
                totalLessons: 7,
                published: true,
                featured: true,
                enrolledCount: 1567,
                rating: 4.6,
            },
        ]);

        console.log(`📚 ${courses.length} courses created`);

        // ─── Create Lessons for first course ───
        const course1 = courses[0];
        const lessons = await Lesson.create([
            {
                title: 'Introduction to Digital Marketing',
                description: 'Overview of the digital marketing landscape and what you will learn.',
                videoUrl: 'https://player.vimeo.com/video/76979871',
                videoProvider: 'vimeo',
                duration: '15:30',
                order: 1,
                courseId: course1._id,
                isFree: true,
                resources: [{ name: 'Course Outline PDF', url: '/resources/outline.pdf' }],
            },
            {
                title: 'SEO Fundamentals',
                description: 'Learn the basics of search engine optimization.',
                videoUrl: 'https://player.vimeo.com/video/76979871',
                videoProvider: 'vimeo',
                duration: '42:15',
                order: 2,
                courseId: course1._id,
                resources: [{ name: 'SEO Checklist', url: '/resources/seo-checklist.pdf' }],
            },
            {
                title: 'Social Media Marketing Strategies',
                description: 'Master organic and paid social media marketing.',
                videoUrl: 'https://player.vimeo.com/video/76979871',
                videoProvider: 'vimeo',
                duration: '38:20',
                order: 3,
                courseId: course1._id,
                resources: [],
            },
            {
                title: 'Email Marketing & Automation',
                description: 'Build email lists and create automated marketing funnels.',
                videoUrl: 'https://player.vimeo.com/video/76979871',
                videoProvider: 'vimeo',
                duration: '35:45',
                order: 4,
                courseId: course1._id,
                resources: [{ name: 'Email Templates', url: '/resources/email-templates.zip' }],
            },
            {
                title: 'Content Marketing That Converts',
                description: 'Create content that attracts and converts customers.',
                videoUrl: 'https://player.vimeo.com/video/76979871',
                videoProvider: 'vimeo',
                duration: '28:10',
                order: 5,
                courseId: course1._id,
                resources: [],
            },
            {
                title: 'Google Ads Mastery',
                description: 'Run profitable Google Ads campaigns from scratch.',
                videoUrl: 'https://player.vimeo.com/video/76979871',
                videoProvider: 'vimeo',
                duration: '45:30',
                order: 6,
                courseId: course1._id,
                resources: [{ name: 'Google Ads Cheatsheet', url: '/resources/google-ads.pdf' }],
            },
            {
                title: 'Facebook & Instagram Ads',
                description: 'Master Meta advertising for lead generation and sales.',
                videoUrl: 'https://player.vimeo.com/video/76979871',
                videoProvider: 'vimeo',
                duration: '50:00',
                order: 7,
                courseId: course1._id,
                resources: [],
            },
            {
                title: 'Analytics & Optimization',
                description: 'Track, measure, and optimize your marketing campaigns.',
                videoUrl: 'https://player.vimeo.com/video/76979871',
                videoProvider: 'vimeo',
                duration: '32:15',
                order: 8,
                courseId: course1._id,
                resources: [{ name: 'Analytics Dashboard Template', url: '/resources/analytics.xlsx' }],
            },
        ]);

        // Update course with lesson refs
        await Course.findByIdAndUpdate(course1._id, {
            lessons: lessons.map((l) => l._id),
        });

        console.log(`📖 ${lessons.length} lessons created for "${course1.title}"`);

        // ─── Create Testimonials ───
        const testimonials = await Testimonial.create([
            {
                name: 'Priya Mehta',
                avatar: '',
                role: 'Freelancer',
                content:
                    'This platform completely changed my career. I went from a ₹30K salary to earning ₹2L+ per month as a freelancer within 6 months!',
                rating: 5,
                featured: true,
            },
            {
                name: 'Amit Kumar',
                avatar: '',
                role: 'Digital Marketer',
                content:
                    'The digital marketing course is incredibly detailed. I now run campaigns for 5 clients and earn more than my previous corporate job.',
                rating: 5,
                featured: true,
            },
            {
                name: 'Sneha Patel',
                avatar: '',
                role: 'E-commerce Store Owner',
                content:
                    'I built my Shopify store after taking the e-commerce course. Now doing ₹5L monthly revenue. The ROI on this course is insane!',
                rating: 5,
                featured: true,
            },
            {
                name: 'Vikram Singh',
                avatar: '',
                role: 'Content Creator',
                content:
                    'The AI course helped me automate 80% of my content creation. I can now produce 10x the content in the same time.',
                rating: 4,
                featured: true,
            },
            {
                name: 'Anjali Rao',
                avatar: '',
                role: 'Student',
                content:
                    'As a college student, these courses gave me practical skills that my degree never taught. Already earning through freelancing!',
                rating: 5,
                featured: true,
            },
        ]);

        console.log(`⭐ ${testimonials.length} testimonials created`);
        console.log('\n✅ Seed data created successfully!');
        console.log('\n📋 Login credentials:');
        console.log('   Admin: admin@skillyukti.com / admin123');
        console.log('   Student: student@skillyukti.com / student123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
};

seedData();
