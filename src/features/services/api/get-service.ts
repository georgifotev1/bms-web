import { endpoints, EndpointVisibility } from '@/config/endpoints';
import { api } from '@/lib/api-client';
import { queryKeys } from '@/lib/react-query';
import { Service } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getServices = async (
    visibility: EndpointVisibility
): Promise<Service[]> => {
    return await api.get(endpoints.services[visibility]);
};

export const useServices = (visibility: EndpointVisibility = 'private') => {
    return useQuery({
        queryKey: [queryKeys.services],
        queryFn: () => getServices(visibility),
    });
};
