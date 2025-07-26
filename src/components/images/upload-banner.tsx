import { Trash } from 'lucide-react';
import { useController } from 'react-hook-form';
import { Button } from '../ui/button';
import { FormImageUploader } from '../ui/form/upload-image-input';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

interface BannerUploadFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    aspectRatio: number;
    label: string;
}
export const BannerUploadField = <T extends FieldValues>({
    control,
    name,
    aspectRatio,
    label,
}: BannerUploadFieldProps<T>) => {
    const {
        field: { value, onChange },
    } = useController({
        name,
        control,
    });

    return (
        <div className='flex items-center gap-2'>
            <FormImageUploader
                control={control}
                name={name}
                aspectRatio={aspectRatio}
                label={label}
            />
            {(value as unknown) instanceof File && (
                <Button
                    size='icon'
                    variant='outline'
                    onClick={() => onChange(null)}
                >
                    <Trash className='cursor-pointer' />
                </Button>
            )}
        </div>
    );
};
