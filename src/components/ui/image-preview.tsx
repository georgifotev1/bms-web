import React, { useState, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ImagePreviewProps {
    file: File | null;
    fallback?: React.ReactNode;
    className?: string;
    imageClassName?: string;
    alt?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
    file,
    fallback,
    className,
    imageClassName,
    alt = 'Preview',
}) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);

    if (!file || !previewUrl) {
        return (
            <div className={cn('flex items-center justify-center', className)}>
                {fallback || (
                    <div className='flex flex-col items-center justify-center w-36 h-36 text-muted-foreground border rounded-2xl bg-accent'>
                        <ImageIcon className='h-8 w-8' />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={cn('w-36 h-36 object-cover', className)}>
            <img
                src={previewUrl}
                alt={alt}
                className={cn(
                    'w-full h-full rounded-lg object-cover',
                    imageClassName
                )}
            />
        </div>
    );
};
