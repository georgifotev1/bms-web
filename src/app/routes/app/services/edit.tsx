import { ContentLayout } from '@/components/layouts/content';
import { useServices } from '@/features/services/api/get-service';

import { EditServiceForm } from '@/features/services/components/service-form';
import { useParams } from 'react-router';

export const EditServiceRoute = () => {
    const { data: services } = useServices();
    const params = useParams();
    const service = services?.find(service => service.id === params.serviceId);

    if (!service) return <div>Service not found</div>;

    return (
        <ContentLayout title='Services'>
            <EditServiceForm service={service} key={service.id} />;
        </ContentLayout>
    );
};
