import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Razorpay instance configured with API keys.
 * Uses test keys by default for development.
 */
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export default razorpay;
