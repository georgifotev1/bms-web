import { api } from '@/lib/api-client';
import { queryKeys } from '@/lib/react-query';
import { BrandProfile } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const brandDetailsSchema = z.object({
    name: z
        .string()
        .min(3, 'Name must be at least 3 characters')
        .max(100, 'Name must be less than 100 characters'),
    pageUrl: z.string().min(1, 'Page URL is required'),
    description: z.string().optional(),
    email: z
        .string()
        .email('Must be a valid email')
        .optional()
        .or(z.literal('')),
    phone: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
    currency: z.string().optional(),
    logoUrl: z.string().optional(),
    bannerUrl: z.string(),
});

export type BrandData = z.infer<typeof brandDetailsSchema>;

export const getBrandFormData = (data: BrandData) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('pageUrl', data.pageUrl);
    formData.append('description', data.description || '');
    formData.append('email', data.email || '');
    formData.append('phone', data.phone || '');
    formData.append('country', data.country || '');
    formData.append('state', data.state || '');
    formData.append('zipCode', data.zipCode || '');
    formData.append('city', data.city || '');
    formData.append('address', data.address || '');
    formData.append('currency', data.currency || '');
    formData.append('logoUrl', data.logoUrl || '');
    formData.append('bannerUrl', data.bannerUrl || '');

    return formData;
};

const updateBrand = (
    brandId: number,
    data: BrandData
): Promise<BrandProfile> => {
    const formData = getBrandFormData(data);
    return api.putFormData(`/brand/${brandId}`, formData);
};

export const useUpdateBrand = (brandId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: BrandData) => updateBrand(brandId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.brand] });
        },
    });
};
