import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const keyId = process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY || '';
const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET || '';

if (!keyId || !keySecret) {
    console.error('⚠️  RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not set! Payments will fail.');
} else {
    console.log(`✅ Razorpay initialized with key: ${keyId.substring(0, 12)}... (${keyId.startsWith('rzp_live') ? 'LIVE' : 'TEST'} mode)`);
}

/**
 * Razorpay instance configured with API keys.
 */
const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
});

export default razorpay;
