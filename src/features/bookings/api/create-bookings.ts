import { api } from '@/lib/api-client';
import { queryKeys } from '@/lib/react-query';
import { Booking } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const bookingFormSchema = z.object({
    customerId: z.coerce
        .number({ required_error: 'Customer ID is required' })
        .min(0, 'Customer ID must be at least 0'),
    serviceId: z.string({ required_error: 'Service ID is required' }),
    userId: z.coerce
        .number({ required_error: 'User ID is required' })
        .min(0, 'User ID must be at least 0'),
    bookingDate: z.date({ required_error: 'Booking date is required' }),
    startTime: z.string({ required_error: 'Start time is required' }),
    endTime: z.string({ required_error: 'Start time is required' }),
    comment: z.string().optional(),
});

export const createBookingSchema = z.object({
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

export type BookingFormInput = z.infer<typeof bookingFormSchema>;
export type CreateBookingData = z.infer<typeof createBookingSchema>;

const createBooking = (data: CreateBookingData): Promise<Booking> => {
    return api.post('/bookings', data);
};

export const useCreateBooking = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBooking,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.bookings] });
        },
    });
};
