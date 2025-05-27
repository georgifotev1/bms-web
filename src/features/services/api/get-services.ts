import { Service } from '@/types/api';
import { api } from '../../../lib/api-client';
import { useQuery } from '@tanstack/react-query';

const getServices = async (brandId: number): Promise<Service[]> => {
    return await api.get(`/service/${brandId}`);
};
export const useServices = (brandId: number) => {
    return useQuery({
        queryKey: ['services', brandId],
        queryFn: () => getServices(brandId),
    });
};
