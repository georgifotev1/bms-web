import { api } from '@/lib/api-client';
import { queryKeys } from '@/lib/react-query';
import { Event } from '@/types/api';
import { TCalendarView } from '@/types/calendar';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import {
    getCurrentDayDates,
    getCurrentMonthDates,
    getCurrentWeekDates,
} from '../calendar/helpers';

const eventParamsSchema = z.object({
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

const getDateRangeForView = (
    view: TCalendarView,
    currentDate: Date = new Date()
) => {
    switch (view) {
        case 'day':
            return getCurrentDayDates(currentDate);
        case 'week':
            return getCurrentWeekDates(currentDate);
        case 'month':
            return getCurrentMonthDates(currentDate);
        case 'agenda':
            return getCurrentMonthDates(currentDate);
        default:
            return getCurrentWeekDates(currentDate);
    }
};

interface EventParams {
    startDate?: string;
    endDate?: string;
}

const getEvents = ({ startDate, endDate }: EventParams = {}): Promise<
    Event[]
> => {
    const defaultDates = getCurrentWeekDates();

    const params = {
        startDate: startDate || defaultDates.startDate,
        endDate: endDate || defaultDates.endDate,
    };

    const result = eventParamsSchema.safeParse(params);

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

    return api.get(`/events/timestamp?${urlParams}`);
};

export const useEventsForView = (
    view: TCalendarView,
    currentDate: Date = new Date()
) => {
    const dateRange = getDateRangeForView(view, currentDate);

    return useQuery({
        queryKey: [
            queryKeys.events,
            view,
            currentDate.toISOString().split('T')[0],
        ],
        queryFn: () =>
            getEvents({
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
            }),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
