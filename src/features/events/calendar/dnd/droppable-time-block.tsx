import { useDrop } from 'react-dnd';
import { parseISO, differenceInMilliseconds } from 'date-fns';

import { cn } from '@/utils/cn';
import type { Event as IEvent } from '@/types/api';
import { ItemTypes } from '@/types/dnd';
import { ConfirmEventUpdateDialog } from '../dialogs/confirm-update-dialog';
import * as React from 'react';

interface DroppableTimeBlockProps {
    date: Date;
    hour: number;
    minute: number;
    children: React.ReactNode;
}

export interface EventUpdateData {
    originalEvent: IEvent;
    newStartDate: Date;
    newEndDate: Date;
}

export function DroppableTimeBlock({
    date,
    hour,
    minute,
    children,
}: DroppableTimeBlockProps) {
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

                const newStartDate = new Date(date);
                newStartDate.setHours(hour, minute, 0, 0);
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
        [date, hour, minute]
    );

    return (
        <div
            ref={drop as unknown as React.RefObject<HTMLDivElement>}
            className={cn('h-[24px]', isOver && canDrop && 'bg-accent/50')}
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
