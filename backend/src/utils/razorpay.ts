import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const keyId = process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY || '';
const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET || '';

/**
 * Razorpay instance configured with API keys.
 */
const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
});

export default razorpay;
