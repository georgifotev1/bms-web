import { H4, Muted } from '@/components/typography';
import { CheckboxField } from '@/components/ui/form/checkbox-field';
import { Input } from '@/components/ui/form/input';
import { SwitchField } from '@/components/ui/form/switch-field';
import { Textarea } from '@/components/ui/form/textarea';
import { ImageUploader } from '@/components/ui/form/upload-image-input';
import { ImagePreview } from '@/components/ui/image-preview';
import { User } from '@/types/api';
import { Trash } from 'lucide-react';
import {
    FieldError,
    FieldValues,
    FormState,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';

export interface ServiceFormData {
    title: string;
    duration: number;
    cost: string;
    bufferTime: string;
    description: string;
    isVisible: boolean;
    image: File | string | null;
    userIds: number[];
}

interface ServiceFormFieldsProps<T extends FieldValues = FieldValues> {
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
    getValues: UseFormGetValues<T>;
    watch: UseFormWatch<T>;
    formState: FormState<T>;
    users?: User[];
    isLoading: boolean;
    defaultValues?: Partial<T>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: any;
}
export const ServiceFormFields = <T extends FieldValues = FieldValues>({
    register,
    setValue,
    getValues,
    watch,
    formState,
    users,
    isLoading,
    defaultValues,
}: ServiceFormFieldsProps<T>) => {
    const image = watch('image');
    return (
        <div className='lg:grid lg:grid-cols-2 lg:gap-14 px-4 lg:!px-10'>
            <div className='col-start-1 flex flex-col gap-4 mb-4 grow-0'>
                <H4>Service Details</H4>
                <div className='flex gap-6 items-center'>
                    <ImagePreview
                        file={image instanceof File ? image : null}
                        defaultUrl={defaultValues?.image as string}
                    />
                    <div className='flex flex-col'>
                        <div data-eds-component='true'>
                            <span>Service image</span>
                            <Muted>Up to 5 MB in size</Muted>
                        </div>
                        <div className='flex items-center gap-2'>
                            <ImageUploader
                                registration={register('image')}
                                label='Upload'
                                multiple={false}
                                error={
                                    formState.errors['image'] as
                                        | FieldError
                                        | undefined
                                }
                                image={image?.[0]}
                                onCroppedImage={croppedFile => {
                                    setValue('image', croppedFile);
                                }}
                            />
                            {image instanceof File ||
                                (defaultValues?.image && (
                                    <Trash
                                        className='cursor-pointer mt-2'
                                        size={18}
                                        onClick={() => setValue('image', null)}
                                    />
                                ))}
                        </div>
                    </div>
                </div>

                <Input
                    type='text'
                    error={formState.errors['title']}
                    registration={register('title')}
                    label='Title'
                    defaultValue={defaultValues?.title}
                />
                <Input
                    type='text'
                    error={formState.errors['duration']}
                    registration={register('duration')}
                    label='Duration'
                    defaultValue={defaultValues?.duration}
                />
                <Input
                    type='text'
                    error={formState.errors['cost']}
                    registration={register('cost')}
                    placeholder='$30.00'
                    label='Cost'
                    defaultValue={defaultValues?.cost}
                />
                <Input
                    type='text'
                    error={formState.errors['bufferTime']}
                    registration={register('bufferTime')}
                    label='Buffer Time'
                    defaultValue={defaultValues?.bufferTime}
                />
                <Textarea
                    registration={register('description')}
                    label='Description'
                    defaultValue={defaultValues?.description}
                />
                <SwitchField
                    registration={register('isVisible')}
                    defaultChecked={defaultValues?.isVisible ?? true}
                    label='Visible'
                />
            </div>
            <aside className='flex flex-col items-start col-start-2 gap-4 sticky top-20 h-[calc(100vh-80px)]'>
                <div className='flex flex-col items-start gap-1 w-full'>
                    <H4>Team</H4>
                    <span>Who will provide this service?</span>
                    {isLoading && <div>Loading users...</div>}
                    {users &&
                        users.map(user => (
                            <CheckboxField
                                key={user.id}
                                registration={register('userIds')}
                                label={user.name}
                                value={user.id}
                                setValue={setValue}
                                currentValues={getValues().userIds ?? []}
                                defaultChecked={defaultValues?.userIds?.includes(
                                    user.id
                                )}
                            />
                        ))}
                </div>
            </aside>
        </div>
    );
};
