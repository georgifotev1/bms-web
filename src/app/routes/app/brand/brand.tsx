import { ContentLayout } from '@/components/layouts/content';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BrandDetailsForm } from '@/features/brand/components/brand-details-form';
import { BrandSidebar } from '@/features/brand/components/brand-sidebar';

export const BrandRoute = () => {
    return (
        <ContentLayout title='Brand Details' className='flex h-full'>
            <BrandSidebar />
            <ScrollArea className='max-h-[100vh]'>
                <BrandDetailsForm />
            </ScrollArea>
        </ContentLayout>
    );
};
