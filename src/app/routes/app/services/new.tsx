import { ContentLayout } from '@/components/layouts/content';
import { CreateServiceForm } from '@/features/services/components/service-form';

export const NewServiceRoute = () => {
    return (
        <ContentLayout title='Services'>
            <CreateServiceForm />;
        </ContentLayout>
    );
};
