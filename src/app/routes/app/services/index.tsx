import { ContentLayout } from '@/components/layouts/content';
import { ServicesList } from '@/features/services/components/services-list';

export const ServicesRoute = () => {
    return (
        <ContentLayout title='Services'>
            <ServicesList />
        </ContentLayout>
    );
};
