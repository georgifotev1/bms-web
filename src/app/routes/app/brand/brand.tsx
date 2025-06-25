import { ContentLayout } from '@/components/layouts/content';
import { BrandSidebar } from '@/features/brand/components/brand-sidebar';

export const BrandRoute = () => {
    return (
        <ContentLayout title='Brand Details'>
            <BrandSidebar />
        </ContentLayout>
    );
};
