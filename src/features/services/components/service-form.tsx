import { Form, Input } from '@/components/ui/form';
import { ServiceData, serviceSchema } from '../api/create-service';
import { FieldError } from 'react-hook-form';
import { SwitchField } from '@/components/ui/form/switch-field';
import { Textarea } from '@/components/ui/form/textarea';
import { H4, Muted } from '@/components/typography';
import { useDashboardData } from '@/context/dashboard';
import { CheckboxField } from '@/components/ui/form/checkbox-field';
import { ImagePreview } from '@/components/ui/image-preview';
import { ImageUploader } from '@/components/ui/form/upload-image-input';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { paths } from '@/config/paths';
import { useNavigate } from 'react-router';
import { Service } from '@/types/api';
import { useCreateService } from '../api/create-service';
import { useUpdateService } from '../api/edit-service';
import { ServiceDetailsHeader } from './service-details-header';
import { UseMutationResult } from '@tanstack/react-query';

interface ServiceFormProps {
    mode: 'create' | 'edit';
    service?: Service;
    mutation: UseMutationResult<Service, Error, ServiceData, unknown>;
}

export const ServiceForm = ({ mode, service, mutation }: ServiceFormProps) => {
    const { users, isLoading } = useDashboardData();
    const navigate = useNavigate();

    const isEditMode = mode === 'edit';

    const handleSubmit = (values: ServiceData) => {
        if (isEditMode && service) {
            // Handle edit mode - preserve existing image if no new one uploaded
            const submitData = {
                ...values,
                image:
                    values.image?.length === 0
                        ? service.imageUrl
                        : values.image,
            };

            mutation.mutate(submitData, {
                onSuccess: () => {
                    toast.success('Service updated!');
                    navigate(paths.app.services.path);
                },
            });
        } else {
            // Handle create mode
            mutation.mutate(values, {
                onSuccess: () => {
                    toast.success('Service created!');
                    navigate(paths.app.services.path);
                },
            });
        }
    };

    const getFormDefaults = (): ServiceData => {
        if (!isEditMode || !service) return {} as ServiceData;

        return {
            title: service.title,
            duration: service.duration,
            cost: service.cost,
            bufferTime: service.bufferTime,
            description: service.description,
            isVisible: service.isVisible ?? true,
            userIds: service.providers || [],
        };
    };

    return (
        <Form
            onSubmit={handleSubmit}
            schema={serviceSchema}
            hasFiles
            options={{ defaultValues: getFormDefaults() }}
        >
            {({ register, formState, setValue, watch, control }) => {
                const image = watch('image');
                const isSubmitDisabled = () => {
                    if (isEditMode) {
                        return (
                            Object.keys(formState.dirtyFields).length === 0 ||
                            formState.isSubmitSuccessful
                        );
                    }
                    return !formState.isValid || formState.isSubmitSuccessful;
                };
                return (
                    <div className='flex flex-col relative gap-6 max-w-[1140px] mx-auto'>
                        <ServiceDetailsHeader
                            title={isEditMode ? 'Edit Service' : 'New Service'}
                            disabled={isSubmitDisabled()}
                            isLoading={mutation.isPending}
                        />

                        <div className='lg:grid lg:grid-cols-2 lg:gap-14 px-4 lg:!px-10'>
                            <div className='col-start-1 flex flex-col gap-4 mb-4 grow-0'>
                                <H4>Service Details</H4>

                                <div className='flex gap-6 items-center'>
                                    <ImagePreview
                                        file={
                                            image instanceof File ? image : null
                                        }
                                        defaultUrl={
                                            isEditMode
                                                ? service?.imageUrl
                                                : undefined
                                        }
                                    />
                                    <div className='flex flex-col'>
                                        <span>Service image</span>
                                        <Muted>Up to 5 MB in size</Muted>
                                        <div className='flex items-center gap-2'>
                                            <ImageUploader
                                                registration={register('image')}
                                                label={
                                                    isEditMode
                                                        ? 'Edit'
                                                        : 'Upload'
                                                }
                                                multiple={false}
                                                error={
                                                    formState.errors.image as
                                                        | FieldError
                                                        | undefined
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
                                    error={formState.errors.title}
                                    registration={register('title')}
                                    label='Title'
                                />
                                <Input
                                    type='text'
                                    error={formState.errors.duration}
                                    registration={register('duration')}
                                    label='Duration'
                                />
                                <Input
                                    type='text'
                                    error={formState.errors.cost}
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
                                    defaultChecked={
                                        isEditMode
                                            ? service?.isVisible ?? true
                                            : true
                                    }
                                    label='Visible'
                                />
                            </div>

                            <aside className='flex flex-col items-start col-start-2 gap-4 sticky top-20 h-[calc(100vh-80px)]'>
                                <div className='flex flex-col items-start gap-1 w-full'>
                                    <H4>Team</H4>
                                    <span>Who will provide this service?</span>
                                    {isLoading && <div>Loading users...</div>}
                                    {users.data?.map(user => (
                                        <CheckboxField
                                            key={user.id}
                                            name='userIds'
                                            control={control}
                                            label={user.name}
                                            value={user.id}
                                            initialValues={
                                                isEditMode
                                                    ? service?.providers || []
                                                    : []
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

export const CreateServiceForm = () => {
    const createService = useCreateService();
    return <ServiceForm mode='create' mutation={createService} />;
};

export const EditServiceForm = ({ service }: { service: Service }) => {
    const updateService = useUpdateService(service.id);
    return (
        <ServiceForm mode='edit' service={service} mutation={updateService} />
    );
};
