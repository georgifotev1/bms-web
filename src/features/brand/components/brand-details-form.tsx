import { Form } from '@/components/ui/form';
import { brandDetailsSchema, useUpdateBrand } from '../api/update-brand';
import { FormDetailsHeader } from '@/components/ui/form/details-header';
import { useBrandContext } from '@/context/brand';

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
            {({ formState }) => {
                const isButtonDisabled =
                    Object.keys(formState.dirtyFields).length === 0 ||
                    formState.isSubmitSuccessful;
                return (
                    <>
                        <FormDetailsHeader
                            title='Your Brand'
                            disabled={isButtonDisabled}
                            isLoading={updateBrand.isPending}
                        />
                    </>
                );
            }}
        </Form>
    );
};
