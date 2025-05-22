import { api } from '@/lib/api-client';
import { BrandProfile } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const createBrandInputSchema = z.object({
    name: z.string().min(3, 'Required'),
});

export type CreateBrandInput = z.infer<typeof createBrandInputSchema>;

const createBrand = (data: CreateBrandInput): Promise<BrandProfile> => {
    return api.post('/brand', data);
};

export const useCreateBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBrand,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brand'] });
        },
    });
};
