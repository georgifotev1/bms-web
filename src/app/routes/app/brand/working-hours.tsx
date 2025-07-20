import { ContentLayout } from '@/components/layouts/content';
import { BrandSidebar } from '@/features/brand/components/brand-sidebar';
import { WorkingHoursForm } from '@/features/brand/components/working-hours-form';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export const WorkingHoursRoute = () => {
    return (
        <ContentLayout title='Working Hours' className='flex h-full'>
            <BrandSidebar />
            <ScrollArea className='max-h-[100vh] w-full'>
                <WorkingHoursForm />
            </ScrollArea>
        </ContentLayout>
    );
};
