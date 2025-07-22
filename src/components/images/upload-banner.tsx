import { Trash } from 'lucide-react';
import { ImageUploader } from '../ui/form-v1/upload-image-input';
import { ImagePreview } from './image-preview';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Button } from '../ui/button';

interface IUploadBannerComponentProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: any;
    defaultUrl?: string;
    error?: FieldError | undefined;
    registration: Partial<UseFormRegisterReturn>;
    onCroppedImage?: (croppedFile: File) => void;
    onRemoveImage?: () => void;
    buttonText: string;
}
export const UploadBannerComponent = ({
    image,
    defaultUrl,
    error,
    registration,
    onCroppedImage,
    onRemoveImage,
    buttonText,
}: IUploadBannerComponentProps) => {
    return (
        <div className='flex flex-col gap-6 items-center relative'>
            <ImagePreview
                file={image instanceof File ? image : null}
                defaultUrl={defaultUrl}
                fullWidth
                className='h-52'
            />
            <div className='flex flex-col absolute bottom-4 right-8'>
                <div className='flex items-center gap-2'>
                    <ImageUploader
                        registration={registration}
                        label={buttonText}
                        multiple={false}
                        error={error}
                        image={image?.[0]}
                        onCroppedImage={onCroppedImage}
                        aspectRatio={16 / 9}
                    />
                    {image instanceof File && (
                        <Button
                            size='icon'
                            className='mt-2'
                            variant='outline'
                            onClick={onRemoveImage}
                        >
                            <Trash className='cursor-pointer' />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
