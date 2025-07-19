import { ContentLayout } from '@/components/layouts/content';
import { BrandDetailsForm } from '@/features/brand/components/brand-details-form';
import { BrandSidebar } from '@/features/brand/components/brand-sidebar';

export const BrandRoute = () => {
    return (
        <ContentLayout title='Brand Details' className='flex h-full'>
            <BrandSidebar />
            <BrandDetailsForm />
        </ContentLayout>
    );
};
