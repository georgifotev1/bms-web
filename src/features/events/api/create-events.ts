import { api } from '@/lib/api-client';
import { queryKeys } from '@/lib/react-query';
import { Event } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const eventFormSchema = z.object({
    customerId: z.coerce
        .number({ required_error: 'Customer ID is required' })
        .min(1, 'Customer ID is required'),
    serviceId: z.string().min(1, 'Service ID is required'),
    userId: z.coerce
        .number({ required_error: 'User ID is required' })
        .min(1, 'User ID is required'),
    eventDate: z.date({ required_error: 'Event date is required' }),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    comment: z.string().optional(),
});

export const createEventSchema = z.object({
    brandId: z.coerce
        .number({ required_error: 'Brand ID is required' })
        .min(0, 'Brand ID must be at least 0'),
    customerId: z.coerce
        .number({ required_error: 'Customer ID is required' })
        .min(0, 'Customer ID must be at least 0'),
    serviceId: z.string({ required_error: 'Service ID is required' }),
    userId: z.coerce
        .number({ required_error: 'User ID is required' })
        .min(0, 'User ID must be at least 0'),
    startTime: z.string({ required_error: 'Start time is required' }),
    endTime: z.string({ required_error: 'Start time is required' }),
    comment: z.string().optional(),
});

export type EventFormInput = z.infer<typeof eventFormSchema>;
export type CreateEventData = z.infer<typeof createEventSchema>;

const createEvent = (data: CreateEventData): Promise<Event> => {
    return api.post('/events', data);
};

export const useCreateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.events] });
        },
    });
};
