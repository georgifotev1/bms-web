import React, { useState, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ImagePreviewProps {
    file: File | null;
    fallback?: React.ReactNode;
    className?: string;
    imageClassName?: string;
    alt?: string;
    defaultUrl?: string;
    fullWidth?: boolean;
    isLogo?: boolean;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
    file,
    fallback,
    className,
    imageClassName,
    alt = 'Preview',
    defaultUrl,
    fullWidth,
    isLogo,
}) => {
    const [previewUrl, setPreviewUrl] = useState<string>(defaultUrl ?? '');

    useEffect(() => {
        if (!file) {
            setPreviewUrl(defaultUrl ?? '');
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file, defaultUrl]);

    if (!previewUrl) {
        return (
            <div
                className={cn(
                    'flex items-center justify-center',
                    className,
                    fullWidth && 'w-full'
                )}
            >
                {fallback || (
                    <div
                        className={cn(
                            'flex flex-col items-center justify-center w-36 h-36 text-muted-foreground border rounded-2xl bg-accent',
                            fullWidth && 'w-full h-full',
                            isLogo && 'rounded-full'
                        )}
                    >
                        <ImageIcon className='h-8 w-8' />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className={cn(
                'w-36 h-36',
                className,
                fullWidth && 'w-full h-full aspect-video',
                isLogo && 'rounded-full'
            )}
        >
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
