import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import razorpay from '../utils/razorpay';
import Order from '../models/Order';
import User from '../models/User';
import Course from '../models/Course';
import Wallet from '../models/Wallet';
import WalletTransaction from '../models/WalletTransaction';
import { protect } from '../middleware/auth';

const COMMISSION_RATE = 0.80; // 80% to referrer

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
            const { courseId, referralCode } = req.body;

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

            // Look up referrer (prevent self-referral & verify course ownership)
            let referredBy;
            if (referralCode) {
                const referrer = await User.findOne({ referralCode: referralCode.toUpperCase() });
                if (referrer && referrer._id.toString() !== req.user?._id.toString()) {
                    // Check if referrer is enrolled in this course
                    const isReferrerEnrolled = referrer.enrolledCourses.some(
                        (id) => id.toString() === courseId.toString()
                    );
                    
                    if (isReferrerEnrolled) {
                        referredBy = referrer._id;
                    }
                }
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
                referredBy,
            });

            res.status(201).json({
                orderId: order._id,
                razorpayOrderId: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_STr5kdqZk9vaq6',
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
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '0ko4dQBap8tbFdExoB8Nurq9')
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

            // ─── Commission Logic ───
            if (order.referredBy) {
                const commission = Math.round(order.amount * COMMISSION_RATE);

                // Credit referrer's wallet
                await Wallet.findOneAndUpdate(
                    { userId: order.referredBy },
                    {
                        $inc: {
                            balance: commission,
                            totalEarnings: commission,
                        },
                    },
                    { upsert: true }
                );

                // Create commission transaction
                await WalletTransaction.create({
                    userId: order.referredBy,
                    type: 'commission',
                    amount: commission,
                    status: 'completed',
                    orderId: order._id,
                    description: `Commission from course sale (₹${order.amount})`,
                });
            }

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
