import { api } from '@/lib/api-client';
import { queryKeys } from '@/lib/react-query';
import { BrandProfile } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const socialLinkSchema = z.object({
    platform: z.string().min(1, 'Platform is required'),
    url: z.string().min(1, 'Must be a valid URL'),
});

export const socialLinksFormSchema = z.object({
    socialLinks: z.array(socialLinkSchema),
});

export type SocialLinksFormData = z.infer<typeof socialLinksFormSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;

const updateSocialLinks = (
    brandId: number,
    data: SocialLinksFormData
): Promise<BrandProfile> => {
    return api.put(`/brand/${brandId}/social-links`, data);
};

export const useUpdateSocialLinks = (brandId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: SocialLinksFormData) =>
            updateSocialLinks(brandId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.brand] });
        },
    });
};
