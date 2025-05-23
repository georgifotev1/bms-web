import { api } from '@/lib/api-client';
import { Booking } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

const bookingParamsSchema = z.object({
    startDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be in YYYY-MM-DD format')
        .refine(
            (date) => !isNaN(Date.parse(date)),
            'Start date must be a valid date'
        ),
    endDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'End date must be in YYYY-MM-DD format')
        .refine(
            (date) => !isNaN(Date.parse(date)),
            'End date must be a valid date'
        ),
});

const getCurrentWeekDates = () => {
    const today = new Date();
    const monday = new Date(today);
    const dayOfWeek = today.getDay() || 7;
    monday.setDate(today.getDate() - dayOfWeek + 1);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return {
        startDate: monday.toISOString().split('T')[0],
        endDate: sunday.toISOString().split('T')[0],
    };
};

interface BookingParams {
    startDate?: string;
    endDate?: string;
}

const getBookings = ({ startDate, endDate }: BookingParams = {}): Promise<
    Booking[]
> => {
    const defaultDates = getCurrentWeekDates();

    const params = {
        startDate: startDate || defaultDates.startDate,
        endDate: endDate || defaultDates.endDate,
    };

    const result = bookingParamsSchema.safeParse(params);

    if (!result.success) {
        const errorMessages = result.error.errors
            .map((err) => err.message)
            .join(', ');
        return Promise.reject(new Error(`Validation failed: ${errorMessages}`));
    }

    const urlParams = new URLSearchParams({
        startDate: result.data.startDate,
        endDate: result.data.endDate,
    });

    return api.get(`/bookings/week?${urlParams}`);
};

export const useBookings = (startDate?: string, endDate?: string) => {
    const defaultDates = getCurrentWeekDates();

    return useQuery({
        queryKey: [
            'bookings',
            startDate || defaultDates.startDate,
            endDate || defaultDates.endDate,
        ],
        queryFn: () => getBookings({ startDate, endDate }),
    });
};
