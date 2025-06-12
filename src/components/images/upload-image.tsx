import { Trash } from 'lucide-react';
import { Muted } from '../typography';
import { ImageUploader } from '../ui/form/upload-image-input';
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
}
export const UploadImageComponent = ({
    image,
    defaultUrl,
    error,
    label,
    registration,
    onCroppedImage,
    onRemoveImage,
}: IUploadImageComponentProps) => {
    return (
        <div className='flex gap-6 items-center'>
            <ImagePreview
                file={image instanceof File ? image : null}
                defaultUrl={defaultUrl}
            />
            <div className='flex flex-col'>
                <span>Service image</span>
                <Muted>Up to 5 MB in size</Muted>
                <div className='flex items-center gap-2'>
                    <ImageUploader
                        registration={registration}
                        label={label}
                        multiple={false}
                        error={error}
                        image={image?.[0]}
                        onCroppedImage={onCroppedImage}
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
