import { Trash } from 'lucide-react';
import { Muted } from '../typography';
import { ImageUploader } from '../ui/form-v1/upload-image-input';
import { ImagePreview } from './image-preview';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface IUploadImageComponentProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: any;
    defaultUrl?: string;
    error?: FieldError | undefined;
    label: string;
    registration: Partial<UseFormRegisterReturn>;
    onCroppedImage?: (croppedFile: File) => void;
    onRemoveImage?: () => void;
    buttonText: string;
    isLogo?: boolean;
}
export const UploadImageComponent = ({
    image,
    defaultUrl,
    error,
    label,
    registration,
    onCroppedImage,
    onRemoveImage,
    buttonText,
    isLogo = false,
}: IUploadImageComponentProps) => {
    return (
        <div className='flex gap-6 items-center'>
            <ImagePreview
                file={image instanceof File ? image : null}
                defaultUrl={defaultUrl}
                isLogo={isLogo}
            />
            <div className='flex flex-col'>
                <span>{label}</span>
                <Muted>Up to 5 MB in size</Muted>
                <div className='flex items-center gap-2'>
                    <ImageUploader
                        registration={registration}
                        label={buttonText}
                        multiple={false}
                        error={error}
                        image={image?.[0]}
                        onCroppedImage={onCroppedImage}
                        isLogo={isLogo}
                    />
                    {image instanceof File && (
                        <Trash
                            className='cursor-pointer mt-2'
                            size={18}
                            onClick={onRemoveImage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
