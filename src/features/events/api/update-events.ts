import { api } from '@/lib/api-client';
import type { Event } from '@/types/api';
import { CreateEventData } from './create-events';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query';

const updateEvent = (
    data: CreateEventData,
    eventId: number
): Promise<Event> => {
    return api.put(`/events/${eventId}`, data);
};

export const useUpdateEvent = (eventId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateEventData) => updateEvent(data, eventId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.events] });
        },
    });
};
