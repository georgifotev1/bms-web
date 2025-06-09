import { Form, Input } from '@/components/ui/form';
import { createServiceSchema, useCreateService } from '../api/create-service';
import { FieldError } from 'react-hook-form';
import { SwitchField } from '@/components/ui/form/switch-field';
import { Textarea } from '@/components/ui/form/textarea';
import { H4, Muted } from '@/components/typography';
import { useDashboardData } from '@/context/dashboard';
import { CheckboxField } from '@/components/ui/form/checkbox-field';
import { ImagePreview } from '@/components/ui/image-preview';
import { ImageUploader } from '@/components/ui/form/upload-image-input';
import { Trash } from 'lucide-react';

export const CreateServiceForm = ({ id }: { id: string }) => {
    const { users, isLoading } = useDashboardData();
    const createService = useCreateService();
    return (
        <Form
            id={id}
            onSubmit={values => {
                console.log(values);
                createService.mutate(values);
            }}
            schema={createServiceSchema}
            hasFiles
        >
            {({ register, formState, setValue, getValues, watch }) => {
                const image = watch('image');
                return (
                    <div className='lg:grid lg:grid-cols-2 lg:gap-14 px-4 lg:!px-10'>
                        <div className='col-start-1 flex flex-col gap-4 mb-4 grow-0'>
                            <H4>Service Details</H4>
                            <div className='flex gap-6 items-center'>
                                <ImagePreview
                                    file={image instanceof File ? image : null}
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
                                        {image instanceof File && (
                                            <Trash
                                                className='cursor-pointer mt-2'
                                                size={18}
                                                onClick={() =>
                                                    setValue('image', null)
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Input
                                type='text'
                                error={formState.errors['title']}
                                registration={register('title')}
                                label='Title'
                            />
                            <Input
                                type='text'
                                error={formState.errors['duration']}
                                registration={register('duration')}
                                label='Duration'
                            />
                            <Input
                                type='text'
                                error={formState.errors['cost']}
                                registration={register('cost')}
                                placeholder='$30.00'
                                label='Cost'
                            />
                            <Input
                                type='text'
                                error={formState.errors['bufferTime']}
                                registration={register('bufferTime')}
                                label='Buffer Time'
                            />
                            <Textarea
                                registration={register('description')}
                                label='Description'
                            />
                            <SwitchField
                                registration={register('isVisible')}
                                defaultChecked={true}
                                label='Visible'
                            />
                        </div>
                        <aside className='flex flex-col items-start col-start-2 gap-4 sticky top-20 h-[calc(100vh-80px)]'>
                            <div className='flex flex-col items-start gap-1 w-full'>
                                <H4>Team</H4>
                                <span>Who will provide this service?</span>
                                {isLoading && <div>Loading users...</div>}
                                {users.data &&
                                    users.data.map(user => (
                                        <CheckboxField
                                            key={user.id}
                                            registration={register('userIds')}
                                            label={user.name}
                                            value={user.id}
                                            setValue={setValue}
                                            currentValues={
                                                getValues().userIds ?? []
                                            }
                                        />
                                    ))}
                            </div>
                        </aside>
                    </div>
                );
            }}
        </Form>
    );
};
