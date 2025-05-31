import { useDrop } from 'react-dnd';
import { parseISO, differenceInMilliseconds } from 'date-fns';

import { cn } from '@/utils/cn';
import { ICalendarCell } from '@/types/calendar';
import type { Event as IEvent } from '@/types/api';
import { ItemTypes } from '@/types/dnd';
import { useUpdateEvent } from '../../api/update-events';

interface DroppableDayCellProps {
    cell: ICalendarCell;
    children: React.ReactNode;
}

export function DroppableDayCell({ cell, children }: DroppableDayCellProps) {
    const { updateEvent } = useUpdateEvent();

    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: ItemTypes.EVENT,
            drop: (item: { event: IEvent }) => {
                const droppedEvent = item.event;

                const eventStartDate = parseISO(droppedEvent.startTime);
                const eventEndDate = parseISO(droppedEvent.endTime);

                const eventDurationMs = differenceInMilliseconds(
                    eventEndDate,
                    eventStartDate
                );

                const newStartDate = new Date(cell.date);
                newStartDate.setHours(
                    eventStartDate.getHours(),
                    eventStartDate.getMinutes(),
                    eventStartDate.getSeconds(),
                    eventStartDate.getMilliseconds()
                );
                const newEndDate = new Date(
                    newStartDate.getTime() + eventDurationMs
                );

                updateEvent({
                    ...droppedEvent,
                    startTime: newStartDate.toISOString(),
                    endTime: newEndDate.toISOString(),
                });

                return { moved: true };
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [cell.date, updateEvent]
    );

    return (
        <div
            ref={drop as unknown as React.RefObject<HTMLDivElement>}
            className={cn(isOver && canDrop && 'bg-accent/50')}
        >
            {children}
        </div>
    );
}
