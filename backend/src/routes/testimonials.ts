import { Router, Request, Response } from 'express';
import Testimonial from '../models/Testimonial';

const router = Router();

/**
 * GET /api/testimonials
 * Get featured testimonials for public display
 */
router.get('/', async (_req: Request, res: Response): Promise<void> => {
    try {
        const testimonials = await Testimonial.find({ featured: true })
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(testimonials);
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

export default router;
