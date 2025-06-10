import { useDashboardData } from '@/context/dashboard';
import { EditServiceForm } from '@/features/services/components/edit-service-form';
import { useParams } from 'react-router';

export const EditServiceRoute = () => {
    const { services } = useDashboardData();
    const params = useParams();
    const service = services.data?.find(
        service => service.id == params.serviceId
    );

    if (!service) return <div>Service not found</div>;

    return <EditServiceForm service={service} />;
};
