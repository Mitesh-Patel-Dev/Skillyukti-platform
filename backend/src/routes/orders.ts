import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import razorpay from '../utils/razorpay';
import Order from '../models/Order';
import User from '../models/User';
import Course from '../models/Course';
import { protect } from '../middleware/auth';

const router = Router();

/**
 * POST /api/orders/create
 * Create a new Razorpay order for course purchase
 */
router.post(
    '/create',
    protect,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const { courseId } = req.body;

            // Get course details
            const course = await Course.findById(courseId);
            if (!course) {
                res.status(404).json({ message: 'Course not found' });
                return;
            }

            // Check if already enrolled
            const isEnrolled = req.user?.enrolledCourses.some(
                (id) => id.toString() === courseId
            );
            if (isEnrolled) {
                res.status(400).json({ message: 'You are already enrolled in this course' });
                return;
            }

            // Create Razorpay order (amount in paise)
            const razorpayOrder = await razorpay.orders.create({
                amount: course.price * 100,
                currency: 'INR',
                receipt: `order_${Date.now()}`,
                notes: {
                    courseId: course._id.toString(),
                    userId: req.user?._id.toString() || '',
                },
            });

            // Save order in DB
            const order = await Order.create({
                userId: req.user?._id,
                courseId: course._id,
                amount: course.price,
                razorpayOrderId: razorpayOrder.id,
                status: 'created',
            });

            res.status(201).json({
                orderId: order._id,
                razorpayOrderId: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                keyId: process.env.RAZORPAY_KEY_ID,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Server error' });
        }
    }
);

/**
 * POST /api/orders/verify
 * Verify Razorpay payment and enroll user in course
 */
router.post(
    '/verify',
    protect,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

            // Verify signature
            const body = razorpayOrderId + '|' + razorpayPaymentId;
            const expectedSignature = crypto
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
                .update(body)
                .digest('hex');

            if (expectedSignature !== razorpaySignature) {
                res.status(400).json({ message: 'Payment verification failed' });
                return;
            }

            // Update order status
            const order = await Order.findOne({ razorpayOrderId });
            if (!order) {
                res.status(404).json({ message: 'Order not found' });
                return;
            }

            order.status = 'paid';
            order.razorpayPaymentId = razorpayPaymentId;
            order.razorpaySignature = razorpaySignature;
            await order.save();

            // Enroll user in course
            await User.findByIdAndUpdate(req.user?._id, {
                $addToSet: { enrolledCourses: order.courseId },
            });

            // Increment enrolled count
            await Course.findByIdAndUpdate(order.courseId, {
                $inc: { enrolledCount: 1 },
            });

            res.json({
                message: 'Payment verified successfully',
                orderId: order._id,
                courseId: order.courseId,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Server error' });
        }
    }
);

/**
 * GET /api/orders/my-orders
 * Get current user's orders
 */
router.get(
    '/my-orders',
    protect,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const orders = await Order.find({ userId: req.user?._id })
                .populate('courseId', 'title slug thumbnail price')
                .sort({ createdAt: -1 });
            res.json(orders);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Server error' });
        }
    }
);

export default router;
