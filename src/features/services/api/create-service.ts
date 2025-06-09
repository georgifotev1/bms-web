import { api } from '@/lib/api-client';
import { queryKeys } from '@/lib/react-query';
import { Service } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

export const createServiceSchema = z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string().optional(),
    duration: z.coerce
        .number({
            required_error: 'Duration is required',
            invalid_type_error: 'Must be a number',
        })
        .min(1, 'Duration must be greater than 0'),
    bufferTime: z.coerce.number().optional(),
    cost: z.string().optional(),
    isVisible: z.boolean().default(true),
    image: z
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
    userIds: z.array(z.coerce.number().int().nonnegative()).optional(),
});

export type CreateServiceData = z.infer<typeof createServiceSchema>;

const createService = (data: CreateServiceData): Promise<Service> => {
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

    if (data.image && data.image instanceof File) {
        formData.append('image', data.image);
    }

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
