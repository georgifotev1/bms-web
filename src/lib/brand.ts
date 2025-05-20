import { BrandProfile } from '@/types/api';
import { api } from './api-client';
import { useQuery } from '@tanstack/react-query';

const getBrand = async (brandId: string): Promise<BrandProfile> => {
    return await api.get(`/brand/${brandId}`);
};
export const useBrand = (brandId: string) => {
    return useQuery({
        queryKey: ['brand', brandId],
        queryFn: () => getBrand(brandId),
    });
};
