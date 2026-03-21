import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Razorpay instance configured with API keys.
 * Uses test keys by default for development.
 */
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_STr5kdqZk9vaq6',
    key_secret: process.env.RAZORPAY_KEY_SECRET || '0ko4dQBap8tbFdExoB8Nurq9',
});

export default razorpay;
