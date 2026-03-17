import mongoose, { Document, Schema } from 'mongoose';

// ─── Order Interface ───
export interface IOrder extends Document {
    userId: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    amount: number;
    currency: string;
    status: 'created' | 'paid' | 'failed';
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    referredBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// ─── Order Schema ───
const orderSchema = new Schema<IOrder>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        courseId: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: 'INR',
        },
        status: {
            type: String,
            enum: ['created', 'paid', 'failed'],
            default: 'created',
        },
        razorpayOrderId: {
            type: String,
            required: true,
        },
        razorpayPaymentId: {
            type: String,
        },
        razorpaySignature: {
            type: String,
        },
        referredBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

orderSchema.index({ userId: 1 });
orderSchema.index({ razorpayOrderId: 1 });

export default mongoose.model<IOrder>('Order', orderSchema);
