import { Router, Request, Response } from 'express';
import Course from '../models/Course';
import Lesson from '../models/Lesson';
import User from '../models/User';
import Order from '../models/Order';
import Testimonial from '../models/Testimonial';
import Progress from '../models/Progress';
import { protect } from '../middleware/auth';
import { adminOnly } from '../middleware/admin';

const router = Router();

// All admin routes require auth + admin role
router.use(protect, adminOnly);

// ═══════════════════════════════════════
// COURSE MANAGEMENT
// ═══════════════════════════════════════

/**
 * GET /api/admin/courses
 * Get all courses (including unpublished)
 */
router.get('/courses', async (_req: Request, res: Response): Promise<void> => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.json(courses);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * POST /api/admin/courses
 * Create a new course
 */
router.post('/courses', async (req: Request, res: Response): Promise<void> => {
    try {
        // Auto-generate slug from title if not provided
        if (req.body.title && !req.body.slug) {
            let baseSlug = req.body.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            
            // Handle duplicate slugs by appending a number
            let slug = baseSlug;
            let counter = 1;
            while (await Course.findOne({ slug })) {
                counter++;
                slug = `${baseSlug}-${counter}`;
            }
            req.body.slug = slug;
        }
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * PUT /api/admin/courses/:id
 * Update a course
 */
router.put('/courses/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }
        res.json(course);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * DELETE /api/admin/courses/:id
 * Delete a course and its lessons
 */
router.delete('/courses/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        await Lesson.deleteMany({ courseId: req.params.id });
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: 'Course and lessons deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// ═══════════════════════════════════════
// LESSON MANAGEMENT
// ═══════════════════════════════════════

/**
 * GET /api/admin/courses/:courseId/lessons
 * Get all lessons for a course
 */
router.get(
    '/courses/:courseId/lessons',
    async (req: Request, res: Response): Promise<void> => {
        try {
            const lessons = await Lesson.find({ courseId: req.params.courseId }).sort({
                order: 1,
            });
            res.json(lessons);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
);

/**
 * POST /api/admin/lessons
 * Create a new lesson
 */
router.post('/lessons', async (req: Request, res: Response): Promise<void> => {
    try {
        const lesson = await Lesson.create(req.body);

        // Add lesson to course and update count
        await Course.findByIdAndUpdate(lesson.courseId, {
            $push: { lessons: lesson._id },
            $inc: { totalLessons: 1 },
        });

        res.status(201).json(lesson);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * PUT /api/admin/lessons/:id
 * Update a lesson
 */
router.put('/lessons/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!lesson) {
            res.status(404).json({ message: 'Lesson not found' });
            return;
        }
        res.json(lesson);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * DELETE /api/admin/lessons/:id
 * Delete a lesson
 */
router.delete('/lessons/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const lesson = await Lesson.findByIdAndDelete(req.params.id);
        if (lesson) {
            await Course.findByIdAndUpdate(lesson.courseId, {
                $pull: { lessons: lesson._id },
                $inc: { totalLessons: -1 },
            });
        }
        res.json({ message: 'Lesson deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// ═══════════════════════════════════════
// STUDENT MANAGEMENT
// ═══════════════════════════════════════

/**
 * GET /api/admin/students
 * Get all students
 */
router.get('/students', async (_req: Request, res: Response): Promise<void> => {
    try {
        const students = await User.find({ role: 'student' })
            .select('-password')
            .populate('enrolledCourses', 'title slug')
            .sort({ createdAt: -1 });
        res.json(students);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// ═══════════════════════════════════════
// PAYMENT / ORDER MANAGEMENT
// ═══════════════════════════════════════

/**
 * GET /api/admin/students/:id
 * Get student detail with progress
 */
router.get('/students/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const student = await User.findById(req.params.id)
            .select('-password')
            .populate('enrolledCourses', 'title slug thumbnail price totalLessons');
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        const progress = await Progress.find({ userId: student._id })
            .populate('courseId', 'title slug totalLessons');
        res.json({ student, progress });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// ═══════════════════════════════════════

/**
 * GET /api/admin/payments
 * Get all orders/payments
 */
router.get('/payments', async (_req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find()
            .populate('userId', 'name email')
            .populate('courseId', 'title price')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * GET /api/admin/stats
 * Get dashboard statistics
 */
router.get('/stats', async (_req: Request, res: Response): Promise<void> => {
    try {
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalCourses = await Course.countDocuments();
        const totalOrders = await Order.countDocuments({ status: 'paid' });
        const revenueResult = await Order.aggregate([
            { $match: { status: 'paid' } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

        res.json({ totalStudents, totalCourses, totalOrders, totalRevenue });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// ═══════════════════════════════════════
// TESTIMONIAL MANAGEMENT
// ═══════════════════════════════════════

/**
 * GET /api/admin/testimonials
 * Get all testimonials
 */
router.get('/testimonials', async (_req: Request, res: Response): Promise<void> => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * POST /api/admin/testimonials
 * Create testimonial
 */
router.post('/testimonials', async (req: Request, res: Response): Promise<void> => {
    try {
        const testimonial = await Testimonial.create(req.body);
        res.status(201).json(testimonial);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * PUT /api/admin/testimonials/:id
 */
router.put('/testimonials/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(testimonial);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * DELETE /api/admin/testimonials/:id
 */
router.delete('/testimonials/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.json({ message: 'Testimonial deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
