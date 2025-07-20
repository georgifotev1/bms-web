import { api } from '@/lib/api-client';
import { queryKeys } from '@/lib/react-query';
import { BrandProfile } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

const workingHoursSchema = z.object({
    dayOfWeek: z.coerce
        .number({
            required_error: 'Day of week is required',
            invalid_type_error: 'Must be a number',
        })
        .min(0, 'Day of week must be between 0-6')
        .max(6, 'Day of week must be between 0-6'),
    openTime: z.string().optional(),
    closeTime: z.string().optional(),
    isClosed: z.boolean().default(false),
});

export const workingHoursFormSchema = z.object({
    workingHours: z.array(workingHoursSchema),
});

export type WorkingHour = z.infer<typeof workingHoursSchema>;
export type WorkingHoursFormData = z.infer<typeof workingHoursFormSchema>;

const updateWorkingHours = (
    brandId: number,
    data: WorkingHoursFormData
): Promise<BrandProfile> => {
    return api.put(`/brand/${brandId}/working-hours`, data);
};

export const useUpdateWorkingHours = (brandId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: WorkingHoursFormData) =>
            updateWorkingHours(brandId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.brand] });
        },
    });
};
