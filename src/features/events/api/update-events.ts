import type { Event as IEvent } from '@/types/api';

export function useUpdateEvent() {
    const updateEvent = (event: IEvent) => {
        console.log(event);
    };

    return { updateEvent };
}
