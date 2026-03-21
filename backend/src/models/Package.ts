import mongoose, { Document, Schema } from 'mongoose';

// ─── Package Interface ───
export interface IPackage extends Document {
    name: string;
    price: number;
    description: string;
    features: string[];
    createdAt: Date;
    updatedAt: Date;
}

// ─── Package Schema ───
const packageSchema = new Schema<IPackage>(
    {
        name: {
            type: String,
            required: [true, 'Package name is required'],
            trim: true,
            unique: true,
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
        },
        description: {
            type: String,
            default: '',
        },
        features: [{
            type: String,
            trim: true,
        }],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IPackage>('Package', packageSchema);
