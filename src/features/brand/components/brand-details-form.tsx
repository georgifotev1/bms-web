import {
    BrandData,
    brandDetailsSchema,
    useUpdateBrand,
} from '../api/update-brand';
import { FormDetailsHeader } from '@/components/ui/form-v1/details-header';
import { useBrandContext } from '@/context/brand';
import { ImagePreview } from '@/components/images/image-preview';
import { UploadImageField } from '@/components/images/upload-image';
import { Muted } from '@/components/typography';
import { Form } from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/input';
import { FormTextarea } from '@/components/ui/form/textarea';
import { Label } from '@/components/ui/label';
import { FormSelect } from '@/components/ui/form/select';

export const BrandDetailsForm = () => {
    const brand = useBrandContext();
    const updateBrand = useUpdateBrand(brand.id);

    const handleSubmit = (values: BrandData) => {
        updateBrand.mutate(values);
    };

    return (
        <Form
            onSubmit={handleSubmit}
            schema={brandDetailsSchema}
            className='w-full'
            options={{
                defaultValues: {
                    name: brand.name ?? '',
                    pageUrl: brand.pageUrl ?? '',
                    description: brand.description ?? '',
                    email: brand.email ?? '',
                    phone: brand.phone ?? '',
                    address: brand.address ?? '',
                    city: brand.city ?? '',
                    state: brand.state ?? '',
                    zipCode: brand.zipCode ?? '',
                    country: brand.country ?? '',
                    currency: brand.currency ?? '',
                    logoUrl: brand.logoUrl ?? '',
                    bannerUrl: brand.bannerUrl ?? '',
                },
            }}
        >
            {({ formState, control, watch }) => {
                const banner = watch('bannerUrl');
                const logo = watch('logoUrl');
                const isSubmitDisabled =
                    !formState.isDirty || !formState.isValid;

                return (
                    <div className='flex flex-col relative gap-6 max-w-[1140px] mx-auto'>
                        <FormDetailsHeader
                            title='Your Brand'
                            disabled={isSubmitDisabled}
                            isLoading={updateBrand.isPending}
                        />
                        <div className='px-4 lg:!px-10 space-y-6'>
                            <div className='flex flex-col gap-6 items-center relative'>
                                <ImagePreview
                                    previewUrl={banner ?? brand.bannerUrl}
                                    fullWidth
                                    className='h-52'
                                />
                                <div className='flex flex-col absolute bottom-4 right-8'>
                                    <UploadImageField
                                        control={control}
                                        name='bannerUrl'
                                        aspectRatio={16 / 9}
                                        label='Upload'
                                    />
                                </div>
                            </div>
                            <div className='flex gap-6 items-center'>
                                <ImagePreview
                                    previewUrl={logo ?? brand.logoUrl}
                                    isLogo
                                />
                                <div className='flex flex-col'>
                                    <span>Add a logo</span>
                                    <Muted>Up to 5 MB in size</Muted>
                                    <UploadImageField
                                        control={control}
                                        name='logoUrl'
                                        label='Upload'
                                        isLogo
                                    />
                                </div>
                            </div>
                            <FormInput
                                control={control}
                                name='name'
                                label='Name'
                                type='text'
                            />
                            <FormInput
                                control={control}
                                type='text'
                                name='pageUrl'
                                label='Your booking page URL'
                            />

                            <FormTextarea
                                control={control}
                                name='description'
                            />

                            <div className='border-t border-solid border-tertiary py-6 space-y-6'>
                                <Label className='font-bold mb-6'>
                                    Contact Details
                                </Label>

                                <FormInput
                                    control={control}
                                    name='email'
                                    label='Email'
                                    type='email'
                                />

                                <FormInput
                                    control={control}
                                    name='phone'
                                    label='Phone Number'
                                    type='text'
                                />
                            </div>

                            <div className='border-t border-solid border-tertiary py-6 space-y-6'>
                                <Label className='font-bold mb-6'>
                                    Location
                                </Label>

                                <FormInput
                                    control={control}
                                    name='address'
                                    label='Address'
                                    type='text'
                                />

                                <FormInput
                                    control={control}
                                    name='city'
                                    label='City'
                                    type='text'
                                />

                                <div className='flex gap-4'>
                                    <FormInput
                                        control={control}
                                        name='state'
                                        label='State'
                                        type='text'
                                    />

                                    <FormInput
                                        control={control}
                                        name='zipCode'
                                        label='Zip Code'
                                        type='text'
                                    />
                                </div>

                                <div className='flex gap-4'>
                                    <FormSelect
                                        control={control}
                                        name='country'
                                        label='Country'
                                        options={[
                                            {
                                                label: 'Bulgaria',
                                                value: 'Bulgaria',
                                            },
                                        ]}
                                    />

                                    <FormSelect
                                        control={control}
                                        name='currency'
                                        label='Currency'
                                        options={[
                                            { label: 'BGN', value: 'BGN' },
                                            { label: 'EUR', value: 'EUR' },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Form>
    );
};
