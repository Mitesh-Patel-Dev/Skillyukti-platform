import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
    description?: string;
    className?: string;
}

export default function ImageUpload({ value, onChange, label, description, className = '' }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check if ImgBB API Key is configured
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        if (!apiKey) {
            toast.error('ImgBB API Key is not configured in .env.local');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (data.success) {
                onChange(data.data.url);
                toast.success('Image uploaded successfully!');
            } else {
                toast.error(data.error?.message || 'Failed to upload image');
            }
        } catch (error) {
            toast.error('Error connecting to image server');
            console.error(error);
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {label && <label className="text-sm text-dark-100 flex items-center gap-2">{label}</label>}

            <div className="flex items-center gap-4">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="https://i.ibb.co/..."
                    className="flex-1 bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all"
                />

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    accept="image/*"
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex-shrink-0 flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
                >
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
            </div>

            {description && <p className="text-dark-400 text-xs mt-1">{description}</p>}

            {value && (
                <div className="mt-3 relative inline-block group">
                    <img 
                        src={value} 
                        alt="Preview" 
                        className="h-32 object-contain rounded-lg border border-white/10 bg-dark-800" 
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} 
                    />
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
