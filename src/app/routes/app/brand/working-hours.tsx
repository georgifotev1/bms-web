import { ContentLayout } from '@/components/layouts/content';
import { BrandSidebar } from '@/features/brand/components/brand-sidebar';
import { WorkingHoursForm } from '@/features/brand/components/working-hours-form';

export const WorkingHoursRoute = () => {
    return (
        <ContentLayout title='Working Hours' className='flex h-full'>
            <BrandSidebar />
            <WorkingHoursForm />
        </ContentLayout>
    );
};
