import { Form, Input } from '@/components/ui/form';
import { serviceSchema } from '../api/create-service';
import { FieldError } from 'react-hook-form';
import { SwitchField } from '@/components/ui/form/switch-field';
import { Textarea } from '@/components/ui/form/textarea';
import { H4, Muted } from '@/components/typography';
import { useDashboardData } from '@/context/dashboard';
import { CheckboxField } from '@/components/ui/form/checkbox-field';
import { ImagePreview } from '@/components/ui/image-preview';
import { ImageUploader } from '@/components/ui/form/upload-image-input';
import { Trash } from 'lucide-react';
import { Service } from '@/types/api';
import { useUpdateService } from '../api/edit-service';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { paths } from '@/config/paths';
import { ServiceDetailsHeader } from './service-details-header';

export const EditServiceForm = ({ service }: { service: Service }) => {
    const { users, isLoading } = useDashboardData();
    const updateService = useUpdateService(service.id);
    const navigate = useNavigate();
    return (
        <Form
            onSubmit={values => {
                console.log('valuse', values);
                console.log('service', service);
                updateService.mutate(
                    {
                        ...values,
                        image:
                            values.image.length == 0
                                ? service.imageUrl
                                : values.image,
                    },
                    {
                        onSuccess: () => {
                            toast.success('Service updated!');
                            navigate(paths.app.services.path);
                        },
                    }
                );
            }}
            schema={serviceSchema}
            hasFiles
        >
            {({ register, formState, setValue, watch, control }) => {
                const image = watch('image');

                return (
                    <div className='flex flex-col relative gap-6 max-w-[1140px] mx-auto'>
                        <ServiceDetailsHeader
                            title='Edit Service'
                            disabled={
                                Object.keys(formState.dirtyFields).length ==
                                    0 || formState.isSubmitSuccessful
                            }
                            isLoading={updateService.isPending}
                        />
                        <div className='lg:grid lg:grid-cols-2 lg:gap-14 px-4 lg:!px-10'>
                            <div className='col-start-1 flex flex-col gap-4 mb-4 grow-0'>
                                <H4>Service Details</H4>
                                <div className='flex gap-6 items-center'>
                                    <ImagePreview
                                        file={
                                            image instanceof File ? image : null
                                        }
                                        defaultUrl={service.imageUrl}
                                    />
                                    <div className='flex flex-col'>
                                        <div data-eds-component='true'>
                                            <span>Service image</span>
                                            <Muted>Up to 5 MB in size</Muted>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <ImageUploader
                                                registration={register('image')}
                                                label='Edit'
                                                multiple={false}
                                                error={
                                                    formState.errors[
                                                        'image'
                                                    ] as FieldError | undefined
                                                }
                                                image={image?.[0]}
                                                onCroppedImage={croppedFile => {
                                                    setValue(
                                                        'image',
                                                        croppedFile
                                                    );
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
                                    defaultValue={service.title}
                                />
                                <Input
                                    type='text'
                                    error={formState.errors['duration']}
                                    registration={register('duration')}
                                    label='Duration'
                                    defaultValue={service.duration}
                                />
                                <Input
                                    type='text'
                                    error={formState.errors['cost']}
                                    registration={register('cost')}
                                    placeholder='$30.00'
                                    label='Cost'
                                    defaultValue={service.cost}
                                />
                                <Input
                                    type='text'
                                    error={formState.errors['bufferTime']}
                                    registration={register('bufferTime')}
                                    label='Buffer Time'
                                    defaultValue={service.bufferTime}
                                />
                                <Textarea
                                    registration={register('description')}
                                    label='Description'
                                    defaultValue={service.description}
                                />
                                <SwitchField
                                    registration={register('isVisible')}
                                    defaultChecked={service.isVisible || true}
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
                                                name='userIds'
                                                control={control}
                                                label={user.name}
                                                value={user.id}
                                                initialValues={
                                                    service.providers || []
                                                }
                                            />
                                        ))}
                                </div>
                            </aside>
                        </div>
                    </div>
                );
            }}
        </Form>
    );
};
