import { BrandProfile } from '@/types/api';
import { api } from '../../../lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query';
import { endpoints, EndpointVisibility } from '@/config/endpoints';

const getBrand = async (
    visibility: EndpointVisibility
): Promise<BrandProfile> => {
    return await api.get(endpoints.brand[visibility]);
};

export const useBrand = (visibility: EndpointVisibility = 'private') => {
    return useQuery({
        queryKey: [queryKeys.brand],
        queryFn: () => getBrand(visibility),
    });
};
