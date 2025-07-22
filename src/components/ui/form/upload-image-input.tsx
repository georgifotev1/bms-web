import * as React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { ImageIcon } from 'lucide-react';
import ReactCrop, {
    type Crop,
    type PixelCrop,
    centerCrop,
    makeAspectCrop,
    convertToPixelCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './form';
import { ACCEPTED_IMAGE_TYPES } from '@/constants';
import { BaseFormFieldProps } from './form.interfaces';

export interface FormImageUploaderProps<T extends FieldValues = FieldValues>
    extends BaseFormFieldProps<T> {
    aspectRatio?: number;
    isLogo?: boolean;
    onCroppedImage?: (file: File) => void;
}

export const FormImageUploader = <T extends FieldValues = FieldValues>({
    name,
    control,
    label,
    description,
    aspectRatio,
    isLogo = false,
    onCroppedImage,
}: FormImageUploaderProps<T>) => {
    const [open, setOpen] = React.useState(false);
    const [imgSrc, setImgSrc] = React.useState('');
    const [crop, setCrop] = React.useState<Crop>();
    const [completedCrop, setCompletedCrop] = React.useState<PixelCrop>();
    const imgRef = React.useRef<HTMLImageElement>(null);
    const previewCanvasRef = React.useRef<HTMLCanvasElement>(null);

    const { field } = useController({ name, control });

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        field.onChange(file);

        const reader = new FileReader();
        reader.onload = e => {
            if (e.target?.result) {
                setImgSrc(e.target.result as string);
                setOpen(true);
            }
        };
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;
        const cropAspectRatio = isLogo ? 1 : aspectRatio || 1;

        const initialCrop = centerCrop(
            makeAspectCrop(
                { unit: '%', width: 90 },
                cropAspectRatio,
                width,
                height
            ),
            width,
            height
        );

        setCrop(initialCrop);
        setCompletedCrop(convertToPixelCrop(initialCrop, width, height));
    };

    const canvasPreview = React.useCallback(
        (
            image: HTMLImageElement,
            canvas: HTMLCanvasElement,
            crop: PixelCrop,
            circular: boolean = false
        ) => {
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('No 2d context');

            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            const pixelRatio = window.devicePixelRatio;

            canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
            canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

            ctx.scale(pixelRatio, pixelRatio);
            ctx.imageSmoothingQuality = 'high';

            const cropX = crop.x * scaleX;
            const cropY = crop.y * scaleY;
            const cropWidth = crop.width * scaleX;
            const cropHeight = crop.height * scaleY;

            ctx.save();

            if (circular) {
                const centerX = cropWidth / 2;
                const centerY = cropHeight / 2;
                const radius = Math.min(cropWidth, cropHeight) / 2;

                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                ctx.clip();
            }

            ctx.drawImage(
                image,
                cropX,
                cropY,
                cropWidth,
                cropHeight,
                0,
                0,
                cropWidth,
                cropHeight
            );
            ctx.restore();
        },
        []
    );

    React.useEffect(() => {
        if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgRef.current &&
            previewCanvasRef.current
        ) {
            canvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                completedCrop,
                isLogo
            );
        }
    }, [completedCrop, canvasPreview, isLogo]);

    const getCroppedImg = async (): Promise<File | null> => {
        const image = imgRef.current;
        const previewCanvas = previewCanvasRef.current;
        const originalFile = field.value as File;
        if (!image || !previewCanvas || !completedCrop || !originalFile) {
            return null;
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const offscreen = new OffscreenCanvas(
            completedCrop.width * scaleX,
            completedCrop.height * scaleY
        );
        const ctx = offscreen.getContext('2d');
        if (!ctx) throw new Error('No 2d context');

        ctx.drawImage(
            previewCanvas,
            0,
            0,
            previewCanvas.width,
            previewCanvas.height,
            0,
            0,
            offscreen.width,
            offscreen.height
        );

        const imageType = isLogo
            ? 'image/png'
            : originalFile.type || 'image/png';

        const blob = await offscreen.convertToBlob({ type: imageType });
        const nameWithoutExt = originalFile.name.replace(/\.[^/.]+$/, '');
        const newName = `${nameWithoutExt}_${isLogo ? 'circular' : 'cropped'}.${
            isLogo ? 'png' : 'jpg'
        }`;

        return new File([blob], newName, {
            type: imageType,
            lastModified: Date.now(),
        });
    };

    const handleCropConfirm = async () => {
        const cropped = await getCroppedImg();
        if (cropped) {
            field.onChange(cropped);
            onCroppedImage?.(cropped);
        }
        setOpen(false);
        setImgSrc('');
        setCrop(undefined);
        setCompletedCrop(undefined);
    };

    const handleCropCancel = () => {
        setOpen(false);
        setImgSrc('');
        setCrop(undefined);
        setCompletedCrop(undefined);
    };

    return (
        <>
            <FormField
                control={control}
                name={name}
                render={() => (
                    <FormItem>
                        {label && <FormLabel>{label}</FormLabel>}
                        <FormControl>
                            <label className='inline-flex items-center gap-2 cursor-pointer border px-3 py-1 rounded text-sm'>
                                <ImageIcon className='w-4 h-4' />
                                Upload image
                                <input
                                    type='file'
                                    accept={ACCEPTED_IMAGE_TYPES.join(',')}
                                    onChange={onImageChange}
                                    className='sr-only'
                                />
                            </label>
                        </FormControl>
                        {description && (
                            <FormDescription>{description}</FormDescription>
                        )}
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='max-w-4xl'>
                    <DialogHeader>
                        <DialogTitle>Crop Your Image</DialogTitle>
                    </DialogHeader>

                    <div className='flex justify-center p-4'>
                        {imgSrc && (
                            <div className='space-y-4'>
                                <ReactCrop
                                    crop={crop}
                                    onChange={(_, percentCrop) =>
                                        setCrop(percentCrop)
                                    }
                                    onComplete={c => setCompletedCrop(c)}
                                    aspect={aspectRatio}
                                    className='max-w-full'
                                >
                                    <img
                                        ref={imgRef}
                                        alt='Crop preview'
                                        src={imgSrc}
                                        onLoad={onImageLoad}
                                        className='max-w-full max-h-96 object-contain'
                                    />
                                </ReactCrop>
                                <canvas
                                    ref={previewCanvasRef}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button variant='outline' onClick={handleCropCancel}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCropConfirm}
                            disabled={!completedCrop}
                        >
                            Apply Crop
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
