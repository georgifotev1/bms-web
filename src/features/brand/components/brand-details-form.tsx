import { Form, Input, Label } from '@/components/ui/form';
import { brandDetailsSchema, useUpdateBrand } from '../api/update-brand';
import { FormDetailsHeader } from '@/components/ui/form/details-header';
import { useBrandContext } from '@/context/brand';
import { FieldError } from 'react-hook-form';
import { UploadBannerComponent } from '@/components/images/upload-banner';
import { UploadImageComponent } from '@/components/images/upload-image';
import { Textarea } from '@/components/ui/form/textarea';
import { type Option, SelectField } from '@/components/ui/form/select-field';
import { useCountries } from '@/lib/countries';
import * as React from 'react';
import WorkingHours from './working-hours';

export const BrandDetailsForm = () => {
    const brand = useBrandContext();
    const updateBrand = useUpdateBrand(brand.id);
    const countries = useCountries();

    const { countryOptions, currencyOptions } = React.useMemo(() => {
        if (!countries?.data) {
            return { countryOptions: [], currencyOptions: [] };
        }

        const countryOpts: Option[] = [];
        const currencyOpts: Option[] = [];
        const seenCurrencies = new Set();

        countries.data.forEach(country => {
            if (
                country.currencies &&
                Object.keys(country.currencies).length > 0
            ) {
                countryOpts.push({
                    label: country.name.common,
                    value: country.name.common,
                });

                const currencyCode = Object.keys(country.currencies)[0];
                if (!seenCurrencies.has(currencyCode)) {
                    seenCurrencies.add(currencyCode);
                    currencyOpts.push({
                        label: currencyCode,
                        value: currencyCode,
                    });
                }
            }
        });

        return { countryOptions: countryOpts, currencyOptions: currencyOpts };
    }, [countries?.data]);

    const defaultWorkingHours = React.useMemo(() => {
        return brand.workingHours.sort((a, b) => {
            const dayOrder = [1, 2, 3, 4, 5, 6, 0];
            return (
                dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek)
            );
        });
    }, [brand.workingHours]);

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
                    (Object.keys(formState.dirtyFields).length === 0 ||
                        formState.isSubmitSuccessful) &&
                    formState.isValid;
                const banner = watch('banner');
                const logo = watch('logo');

                return (
                    <div className='flex flex-col relative gap-6 max-w-[1140px] mx-auto'>
                        <FormDetailsHeader
                            title='Your Brand'
                            disabled={isButtonDisabled}
                            isLoading={updateBrand.isPending}
                        />
                        <div className='px-4 lg:!px-10 space-y-6'>
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
                            <Input
                                type='text'
                                defaultValue={brand.name}
                                label='Brand name'
                                error={formState.errors['name']}
                                registration={register('name')}
                            />
                            <Input
                                type='text'
                                defaultValue={brand.pageUrl}
                                label='Your booking page URL'
                                error={formState.errors['pageUrl']}
                                registration={register('pageUrl')}
                            />
                            <Textarea
                                label='Brand Description'
                                registration={register('description')}
                                error={formState.errors['description']}
                            />

                            <div className='border-t border-solid border-tertiary py-6 space-y-6'>
                                <Label className='font-bold mb-6'>
                                    Contact Details
                                </Label>

                                <Input
                                    label='Email'
                                    registration={register('email')}
                                    error={formState.errors['email']}
                                />

                                <Input
                                    label='Phone Number'
                                    registration={register('phone')}
                                    error={formState.errors['phone']}
                                />
                            </div>

                            <div className='border-t border-solid border-tertiary py-6 space-y-6'>
                                <Label className='font-bold mb-6'>
                                    Location
                                </Label>

                                <Input
                                    label='Address'
                                    registration={register('address')}
                                    error={formState.errors['address']}
                                />

                                <Input
                                    label='City'
                                    registration={register('city')}
                                    error={formState.errors['city']}
                                />

                                <div className='flex gap-4'>
                                    <Input
                                        label='State'
                                        registration={register('state')}
                                        error={formState.errors['state']}
                                    />

                                    <Input
                                        label='ZIP code'
                                        registration={register('zipCode')}
                                        error={formState.errors['zipCode']}
                                    />
                                </div>

                                <div className='flex gap-4'>
                                    <SelectField
                                        label='Country'
                                        error={formState.errors['country']}
                                        options={countryOptions}
                                        registration={register('country')}
                                    />

                                    <SelectField
                                        label='Currency'
                                        error={formState.errors['currency']}
                                        options={currencyOptions}
                                        registration={register('currency')}
                                    />
                                </div>
                                <WorkingHours
                                    setValue={setValue}
                                    registration={register('workingHours')}
                                    defaultValue={defaultWorkingHours}
                                />
                            </div>
                        </div>
                    </div>
                );
            }}
        </Form>
    );
};
