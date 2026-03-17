import mongoose, { Document, Schema } from 'mongoose';

// ─── Wallet Interface ───
export interface IWallet extends Document {
    userId: mongoose.Types.ObjectId;
    balance: number;
    totalEarnings: number;
    totalWithdrawn: number;
    createdAt: Date;
    updatedAt: Date;
}

// ─── Wallet Schema ───
const walletSchema = new Schema<IWallet>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        balance: {
            type: Number,
            default: 0,
            min: 0,
        },
        totalEarnings: {
            type: Number,
            default: 0,
        },
        totalWithdrawn: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

walletSchema.index({ userId: 1 });

export default mongoose.model<IWallet>('Wallet', walletSchema);
