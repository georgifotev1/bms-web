import { useDrop } from 'react-dnd';
import { parseISO, differenceInMilliseconds } from 'date-fns';
import * as React from 'react';

import { cn } from '@/utils/cn';
import { ICalendarCell } from '@/types/calendar';
import type { Event as IEvent } from '@/types/api';
import { ItemTypes } from '@/types/dnd';
import { ConfirmEventUpdateDialog } from '../dialogs/confirm-update-dialog';
import { EventUpdateData } from './droppable-time-block';

interface DroppableDayCellProps {
    cell: ICalendarCell;
    children: React.ReactNode;
}

export function DroppableDayCell({ cell, children }: DroppableDayCellProps) {
    const [openModal, setOpenModal] = React.useState(false);
    const [data, setData] = React.useState<EventUpdateData | null>(null);

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

                setData({
                    originalEvent: droppedEvent,
                    newStartDate,
                    newEndDate,
                });
                setOpenModal(true);

                return { moved: true };
            },
            collect: monitor => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [cell.date]
    );

    return (
        <div
            ref={drop as unknown as React.RefObject<HTMLDivElement>}
            className={cn(isOver && canDrop && 'bg-accent/50')}
        >
            {data?.originalEvent && data?.newStartDate && data?.newEndDate && (
                <ConfirmEventUpdateDialog
                    open={openModal}
                    setOpen={setOpenModal}
                    event={data.originalEvent}
                    newStartDate={data.newStartDate}
                    newEndDate={data.newEndDate}
                />
            )}
            {children}
        </div>
    );
}
