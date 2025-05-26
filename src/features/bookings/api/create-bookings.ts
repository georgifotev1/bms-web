import { z } from 'zod';

export const createBookingSchema = z
    .object({
        customerId: z.coerce
            .number({ required_error: 'Customer ID is required' })
            .min(0, 'Customer ID must be at least 0'),
        serviceId: z.string({ required_error: 'Service ID is required' }),
        userId: z.coerce
            .number({ required_error: 'User ID is required' })
            .min(0, 'User ID must be at least 0'),
        startTime: z
            .date({ required_error: 'Start time is required' })
            .refine((date) => date > new Date(), {
                message: 'Start time must be in the future',
            }),
        endTime: z.date({ required_error: 'End time is required' }),
        comment: z.string().optional(),
    })
    .refine((data) => data.endTime > data.startTime, {
        message: 'End time must be after start time',
        path: ['endTime'],
    });
