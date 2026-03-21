import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import razorpay from '../utils/razorpay';
import Order from '../models/Order';
import User from '../models/User';
import Package from '../models/Package';
import Wallet from '../models/Wallet';
import WalletTransaction from '../models/WalletTransaction';
import { protect } from '../middleware/auth';

const COMMISSION_RATE = 0.80; // 80% to referrer

const router = Router();

/**
 * GET /api/payment/packages
 * Get all available packages
 */
router.get('/packages', async (_req: Request, res: Response): Promise<void> => {
    try {
        const packages = await Package.find().sort({ price: 1 });
        res.json(packages);
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

/**
 * POST /api/payment/create-order
 * Create a new Razorpay order for a package purchase
 */
router.post(
    '/create-order',
    protect,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const { productId, referralCode } = req.body;

            // Get package details
            const pkg = await Package.findById(productId);
            if (!pkg) {
                res.status(404).json({ message: 'Package not found' });
                return;
            }

            // Check if already enrolled
            const isEnrolled = req.user?.enrolledPackages.some(
                (id) => id.toString() === productId
            );
            if (isEnrolled) {
                res.status(400).json({ message: 'You are already enrolled in this package' });
                return;
            }

            // Look up referrer (prevent self-referral)
            let referredBy;
            if (referralCode) {
                const referrer = await User.findOne({ referralCode: referralCode.toUpperCase() });
                if (referrer && referrer._id.toString() !== req.user?._id.toString()) {
                    // For packages, we just need to ensure the referrer exists and is not self.
                    referredBy = referrer._id;
                }
            }

            // Create Razorpay order (amount in paise)
            const razorpayOrder = await razorpay.orders.create({
                amount: pkg.price * 100,
                currency: 'INR',
                receipt: `pkg_order_${Date.now()}`,
                notes: {
                    packageId: pkg._id.toString(),
                    userId: req.user?._id.toString() || '',
                },
            });

            // Save order in DB
            const order = await Order.create({
                userId: req.user?._id,
                packageId: pkg._id,
                amount: pkg.price,
                razorpayOrderId: razorpayOrder.id,
                status: 'created',
                referredBy,
            });

            res.status(201).json({
                orderId: order._id,
                razorpayOrderId: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                keyId: process.env.RAZORPAY_KEY_ID || 'rzp_live_STqJSGOU03jpwL',
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Server error' });
        }
    }
);

/**
 * POST /api/payment/verify
 * Verify Razorpay payment and enroll user in package
 */
router.post(
    '/verify',
    protect,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

            // Verify signature
            const body = razorpay_order_id + '|' + razorpay_payment_id;
            const expectedSignature = crypto
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'J1mFCkV04L7JpmOkjc6M62Ot')
                .update(body)
                .digest('hex');

            if (expectedSignature !== razorpay_signature) {
                res.status(400).json({ message: 'Payment verification failed' });
                return;
            }

            // Update order status
            const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
            if (!order) {
                res.status(404).json({ message: 'Order not found' });
                return;
            }

            order.status = 'paid';
            order.razorpayPaymentId = razorpay_payment_id;
            order.razorpaySignature = razorpay_signature;
            await order.save();

            // Enroll user in package
            if (order.packageId) {
                await User.findByIdAndUpdate(req.user?._id, {
                    $addToSet: { enrolledPackages: order.packageId },
                });
            }

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
                    description: `Commission from package sale (₹${order.amount})`,
                });
            }

            res.json({
                message: 'Payment verified successfully',
                orderId: order._id,
                packageId: order.packageId,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Server error' });
        }
    }
);

export default router;
