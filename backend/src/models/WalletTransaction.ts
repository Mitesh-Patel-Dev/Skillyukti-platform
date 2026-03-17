import mongoose, { Document, Schema } from 'mongoose';

// ─── WalletTransaction Interface ───
export interface IWalletTransaction extends Document {
    userId: mongoose.Types.ObjectId;
    type: 'commission' | 'withdrawal';
    amount: number;
    status: 'completed' | 'pending';
    orderId?: mongoose.Types.ObjectId;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

// ─── WalletTransaction Schema ───
const walletTransactionSchema = new Schema<IWalletTransaction>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: ['commission', 'withdrawal'],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['completed', 'pending'],
            default: 'completed',
        },
        orderId: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
        },
        description: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

walletTransactionSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<IWalletTransaction>('WalletTransaction', walletTransactionSchema);
