import { BrandProfile } from '@/types/api';
import { api } from '../../../lib/api-client';
import { useQuery } from '@tanstack/react-query';

const getBrand = async (brandId: number): Promise<BrandProfile> => {
    return await api.get(`/brand/${brandId}`);
};
export const useBrand = (brandId: number) => {
    return useQuery({
        queryKey: ['brand', brandId],
        queryFn: () => getBrand(brandId),
    });
};
