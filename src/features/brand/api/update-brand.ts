import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants';
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
    logo: z
        .any()
        .optional()
        .refine(file => {
            if (!file || file.size === undefined) return true;
            return file.size <= MAX_FILE_SIZE;
        }, `Max image size is 5MB.`)
        .refine(file => {
            if (!file || file.type === undefined) return true;
            return ACCEPTED_IMAGE_TYPES.includes(file.type);
        }, 'Only .jpg, .jpeg, .png and .webp formats are supported.'),
    banner: z
        .any()
        .optional()
        .refine(file => {
            if (!file || file.size === undefined) return true;
            return file.size <= MAX_FILE_SIZE;
        }, `Max image size is 5MB.`)
        .refine(file => {
            if (!file || file.type === undefined) return true;
            return ACCEPTED_IMAGE_TYPES.includes(file.type);
        }, 'Only .jpg, .jpeg, .png and .webp formats are supported.'),
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

    if (data.logo) {
        if (data.logo instanceof File) {
            formData.append('logo', data.logo);
        }
        if (typeof data.logo === 'string') {
            formData.append('logoUrl', data.logo);
        }
    }

    if (data.banner) {
        if (data.banner instanceof File) {
            formData.append('banner', data.banner);
        }
        if (typeof data.banner === 'string') {
            formData.append('bannerUrl', data.banner);
        }
    }

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
