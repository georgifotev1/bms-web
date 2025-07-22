import { useBrandContext } from '@/context/brand';

import { Form } from '@/components/ui/form-v1';
import { FormDetailsHeader } from '@/components/ui/form-v1/details-header';
import SocialLinks from './social-links';
import {
    socialLinksFormSchema,
    useUpdateSocialLinks,
} from '../api/social-links';

export const SocialLinksForm = () => {
    const brand = useBrandContext();
    const updateSocialLinks = useUpdateSocialLinks(brand.id);

    return (
        <Form
            onSubmit={values => updateSocialLinks.mutate(values)}
            schema={socialLinksFormSchema}
            className='w-full'
            options={{ defaultValues: { socialLinks: brand.socialLinks } }}
        >
            {({
                register,
                setValue,
                formState: { isDirty, isValid, isSubmitting },
            }) => {
                const isSubmitDisabled = !isDirty || !isValid || isSubmitting;
                return (
                    <div className='flex flex-col relative gap-6 max-w-[1140px] mx-auto'>
                        <FormDetailsHeader
                            title='Social Links'
                            disabled={isSubmitDisabled}
                            isLoading={updateSocialLinks.isPending}
                        />
                        <SocialLinks
                            registration={register('socialLinks')}
                            setValue={setValue}
                            defaultValue={brand.socialLinks ?? []}
                        />
                    </div>
                );
            }}
        </Form>
    );
};
