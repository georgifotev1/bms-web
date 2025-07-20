import { ContentLayout } from '@/components/layouts/content';
import { BrandSidebar } from '@/features/brand/components/brand-sidebar';
import { SocialLinksForm } from '@/features/brand/components/social-links-form';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export const SocialLinksRoute = () => {
    return (
        <ContentLayout title='Social Links' className='flex h-full'>
            <BrandSidebar />
            <ScrollArea className='max-h-[100vh] w-full'>
                <SocialLinksForm />
            </ScrollArea>
        </ContentLayout>
    );
};
