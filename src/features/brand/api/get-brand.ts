import { BrandProfile } from '@/types/api';
import { api } from '../../../lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query';

const getBrand = async (brandId: number): Promise<BrandProfile> => {
    return await api.get(`/brand/${brandId}`);
};
export const useBrand = (brandId: number) => {
    return useQuery({
        queryKey: [queryKeys.brand, brandId],
        queryFn: () => getBrand(brandId),
    });
};
