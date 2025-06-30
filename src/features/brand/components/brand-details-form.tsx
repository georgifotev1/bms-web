import { Form } from '@/components/ui/form';
import { brandDetailsSchema, useUpdateBrand } from '../api/update-brand';
import { FormDetailsHeader } from '@/components/ui/form/details-header';
import { useBrandContext } from '@/context/brand';
import { FieldError } from 'react-hook-form';
import { UploadBannerComponent } from '@/components/images/upload-banner';
import { UploadImageComponent } from '@/components/images/upload-image';

export const BrandDetailsForm = () => {
    const brand = useBrandContext();
    const updateBrand = useUpdateBrand(brand.id);
    return (
        <Form
            onSubmit={values => {
                console.log(values);
            }}
            schema={brandDetailsSchema}
            className='w-full'
        >
            {({ formState, watch, register, setValue }) => {
                const isButtonDisabled =
                    Object.keys(formState.dirtyFields).length === 0 ||
                    formState.isSubmitSuccessful;
                const banner = watch('banner');
                const logo = watch('logo');

                return (
                    <div className='flex flex-col relative gap-6 max-w-[1140px] mx-auto'>
                        <FormDetailsHeader
                            title='Your Brand'
                            disabled={isButtonDisabled}
                            isLoading={updateBrand.isPending}
                        />
                        <div className='px-4 lg:!px-10 space-y-4'>
                            <UploadBannerComponent
                                image={banner}
                                defaultUrl={brand.bannerUrl ?? undefined}
                                buttonText='Upload'
                                registration={register('banner')}
                                error={
                                    formState.errors.banner as
                                        | FieldError
                                        | undefined
                                }
                                onCroppedImage={croppedFile => {
                                    setValue('banner', croppedFile);
                                }}
                                onRemoveImage={() => {
                                    setValue('banner', null);
                                }}
                            />
                            <UploadImageComponent
                                image={logo}
                                isLogo
                                defaultUrl={brand.logoUrl ?? undefined}
                                buttonText='Upload'
                                label='Add a logo'
                                registration={register('logo')}
                                error={
                                    formState.errors.logo as
                                        | FieldError
                                        | undefined
                                }
                                onCroppedImage={croppedFile => {
                                    setValue('logo', croppedFile);
                                }}
                                onRemoveImage={() => {
                                    setValue('logo', null);
                                }}
                            />
                        </div>
                    </div>
                );
            }}
        </Form>
    );
};
