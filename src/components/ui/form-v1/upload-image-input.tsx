import * as React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';
import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';
import { buttonVariants } from '../button';
import { Label } from 'react-aria-components';
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
import { ImageIcon } from 'lucide-react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { ACCEPTED_IMAGE_TYPES } from '@/constants';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
    FieldWrapperPassThroughProps & {
        className?: string;
        registration: Partial<UseFormRegisterReturn>;
        image?: File;
        onCroppedImage?: (croppedFile: File) => void;
        aspectRatio?: number; // Optional aspect ratio for cropping
        isLogo?: boolean; // Enable circular cropping
    };

function ImageUploader({
    label,
    error,
    registration,
    onCroppedImage,
    aspectRatio,
    isLogo = false,
    ...props
}: InputProps) {
    const [open, setOpen] = React.useState<boolean>(false);
    const [imgSrc, setImgSrc] = React.useState<string>('');
    const [crop, setCrop] = React.useState<Crop>();
    const [completedCrop, setCompletedCrop] = React.useState<PixelCrop>();
    const imgRef = React.useRef<HTMLImageElement>(null);
    const previewCanvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        if (props.image) {
            const reader = new FileReader();
            reader.onload = e => {
                if (e.target?.result) {
                    setImgSrc(e.target.result as string);
                    setOpen(true);
                }
            };
            reader.readAsDataURL(props.image);
        }
    }, [props.image]);

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;

        const cropAspectRatio = isLogo ? 1 : aspectRatio || 1;

        const initialCrop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
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
            if (!ctx) {
                throw new Error('No 2d context');
            }

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
                // Create circular clipping path
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
        if (!image || !previewCanvas || !completedCrop || !props.image) {
            return null;
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const offscreen = new OffscreenCanvas(
            completedCrop.width * scaleX,
            completedCrop.height * scaleY
        );
        const ctx = offscreen.getContext('2d');
        if (!ctx) {
            throw new Error('No 2d context');
        }

        if (isLogo) {
            ctx.clearRect(0, 0, offscreen.width, offscreen.height);
        }

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
            : props.image.type || 'image/png';

        const blob = await offscreen.convertToBlob({
            type: imageType,
        });

        const originalName = props.image.name;
        const nameWithoutExt =
            originalName.substring(0, originalName.lastIndexOf('.')) ||
            originalName;
        const extension = isLogo
            ? 'png'
            : props.image.type?.split('/')[1] || 'png';
        const newName = `${nameWithoutExt}_${isLogo ? 'circular' : 'cropped'}.${extension}`;

        return new File([blob], newName, {
            type: imageType,
            lastModified: Date.now(),
        });
    };

    const handleCropConfirm = async () => {
        const croppedFile = await getCroppedImg();
        if (croppedFile && onCroppedImage) {
            onCroppedImage(croppedFile);
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
            <FieldWrapper error={error}>
                <Label
                    className={buttonVariants({
                        variant: 'outline',
                        size: 'sm',
                    })}
                >
                    <ImageIcon /> {label}
                    <input
                        type='file'
                        data-slot='input'
                        className={'sr-only'}
                        accept={ACCEPTED_IMAGE_TYPES.join(',')}
                        {...registration}
                        {...props}
                    />
                </Label>
            </FieldWrapper>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='max-w-4xl'>
                    <DialogHeader>
                        <DialogTitle>Crop Your Image</DialogTitle>
                        <DialogDescription></DialogDescription>
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
                                    style={{
                                        display: 'none',
                                    }}
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
}

export { ImageUploader };
