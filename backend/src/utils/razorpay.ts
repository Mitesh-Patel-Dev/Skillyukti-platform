import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Razorpay instance configured with API keys.
 * Uses test keys by default for development.
 */
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_STqJSGOU03jpwL',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'J1mFCkV04L7JpmOkjc6M62Ot',
});

export default razorpay;
