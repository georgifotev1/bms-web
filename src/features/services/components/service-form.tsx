import { Form, Input } from '@/components/ui/form-v1';
import { ServiceData, serviceSchema } from '../api/create-service';
import { FieldError } from 'react-hook-form';
import { SwitchField } from '@/components/ui/form-v1/switch-field';
import { Textarea } from '@/components/ui/form-v1/textarea';
import { H4 } from '@/components/typography';
import { useDashboardData } from '@/context/dashboard';
import { toast } from 'sonner';
import { paths } from '@/config/paths';
import { useNavigate } from 'react-router';
import { Service } from '@/types/api';
import { useCreateService } from '../api/create-service';
import { useUpdateService } from '../api/edit-service';
import { UseMutationResult } from '@tanstack/react-query';
import { ServiceProvidersSection } from './providers';
import { UploadImageComponent } from '@/components/images/upload-image';
import { FormDetailsHeader } from '@/components/ui/form-v1/details-header';

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
                },
            });
        } else {
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
                        return Object.keys(formState.dirtyFields).length === 0;
                    }
                    return !formState.isValid;
                };
                return (
                    <div className='flex flex-col relative gap-6 max-w-[1140px] mx-auto'>
                        <FormDetailsHeader
                            title={isEditMode ? 'Edit Service' : 'New Service'}
                            disabled={isSubmitDisabled()}
                            isLoading={mutation.isPending}
                            goBackTo={paths.app.services.path}
                        />
                        <div className='lg:grid lg:grid-cols-2 lg:gap-14 px-4 lg:!px-10'>
                            <div className='col-start-1 flex flex-col gap-4 mb-4 grow-0'>
                                <H4>Service Details</H4>

                                <UploadImageComponent
                                    image={image}
                                    defaultUrl={
                                        isEditMode
                                            ? service?.imageUrl
                                            : undefined
                                    }
                                    label={'Service image'}
                                    buttonText={isEditMode ? 'Edit' : 'Upload'}
                                    registration={register('image')}
                                    error={
                                        formState.errors.image as
                                            | FieldError
                                            | undefined
                                    }
                                    onCroppedImage={croppedFile => {
                                        setValue('image', croppedFile);
                                    }}
                                    onRemoveImage={() => {
                                        setValue('image', null);
                                    }}
                                />

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
                            <ServiceProvidersSection
                                isLoading={isLoading}
                                users={users.data}
                                control={control}
                                initialValues={
                                    isEditMode ? service?.providers || [] : []
                                }
                                error={formState.errors.userIds?.message}
                            />
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
