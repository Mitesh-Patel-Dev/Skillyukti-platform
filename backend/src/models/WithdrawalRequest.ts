import mongoose, { Document, Schema } from 'mongoose';

// ─── WithdrawalRequest Interface ───
export interface IWithdrawalRequest extends Document {
    userId: mongoose.Types.ObjectId;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    adminNote?: string;
    createdAt: Date;
    updatedAt: Date;
}

// ─── WithdrawalRequest Schema ───
const withdrawalRequestSchema = new Schema<IWithdrawalRequest>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: [1, 'Minimum withdrawal amount is ₹1'],
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
        adminNote: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

withdrawalRequestSchema.index({ userId: 1, createdAt: -1 });
withdrawalRequestSchema.index({ status: 1 });

export default mongoose.model<IWithdrawalRequest>('WithdrawalRequest', withdrawalRequestSchema);
