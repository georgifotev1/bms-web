import { api } from '@/lib/api-client';
import { queryKeys } from '@/lib/react-query';
import { Service } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const serviceSchema = z.object({
    title: z.string().min(3, 'Title is required'),
    description: z.string().optional(),
    duration: z.coerce
        .number({
            required_error: 'Duration is required',
            invalid_type_error: 'Must be a number',
        })
        .min(1, 'Duration must be greater than 0'),
    bufferTime: z.coerce.number().optional(),
    cost: z.string().optional(),
    isVisible: z.coerce.boolean().default(true),
    imageUrl: z.string().optional(),
    userIds: z
        .array(z.coerce.number().int().nonnegative())
        .min(1, 'At least one provider must be assigned'),
});

export type ServiceData = z.infer<typeof serviceSchema>;

export const getServiceFormData = (data: ServiceData) => {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description || '');
    formData.append('duration', data.duration.toString());
    formData.append('bufferTime', data.bufferTime?.toString() || '0');
    formData.append('cost', data.cost || '');
    formData.append('isVisible', data.isVisible?.toString() || 'false');

    if (data.userIds && data.userIds.length > 0) {
        data.userIds.forEach(id => {
            formData.append('userIds', id.toString());
        });
    }
    formData.append('imageUrl', data.imageUrl || ''); // File upload
    return formData;
};

const createService = (data: ServiceData): Promise<Service> => {
    const formData = getServiceFormData(data);
    return api.postFormData('/service', formData);
};

export const useCreateService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.services] });
        },
    });
};
