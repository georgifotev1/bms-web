import {
    parseISO,
    isWithinInterval,
    differenceInDays,
    startOfDay,
    endOfDay,
} from 'date-fns';

import type { Booking as IEvent } from '@/types/api';
import { MonthEventBadge } from '../month-view/month-event-badge';

interface IProps {
    selectedDate: Date;
    multiDayEvents: IEvent[];
}

export function DayViewMultiDayEventsRow({
    selectedDate,
    multiDayEvents,
}: IProps) {
    const dayStart = startOfDay(selectedDate);
    const dayEnd = endOfDay(selectedDate);

    const multiDayEventsInDay = multiDayEvents
        .filter((event) => {
            const eventStart = parseISO(event.startTime);
            const eventEnd = parseISO(event.endTime);

            const isOverlapping =
                isWithinInterval(dayStart, {
                    start: eventStart,
                    end: eventEnd,
                }) ||
                isWithinInterval(dayEnd, {
                    start: eventStart,
                    end: eventEnd,
                }) ||
                (eventStart <= dayStart && eventEnd >= dayEnd);

            return isOverlapping;
        })
        .sort((a, b) => {
            const durationA = differenceInDays(
                parseISO(a.endTime),
                parseISO(a.startTime)
            );
            const durationB = differenceInDays(
                parseISO(b.endTime),
                parseISO(b.startTime)
            );
            return durationB - durationA;
        });

    if (multiDayEventsInDay.length === 0) return null;

    return (
        <div className='flex border-b'>
            <div className='w-18'></div>
            <div className='flex flex-1 flex-col gap-1 border-l py-1'>
                {multiDayEventsInDay.map((event) => {
                    const eventStart = startOfDay(parseISO(event.startTime));
                    const eventEnd = startOfDay(parseISO(event.endTime));
                    const currentDate = startOfDay(selectedDate);

                    const eventTotalDays =
                        differenceInDays(eventEnd, eventStart) + 1;
                    const eventCurrentDay =
                        differenceInDays(currentDate, eventStart) + 1;

                    return (
                        <MonthEventBadge
                            key={event.id}
                            event={event}
                            cellDate={selectedDate}
                            eventCurrentDay={eventCurrentDay}
                            eventTotalDays={eventTotalDays}
                        />
                    );
                })}
            </div>
        </div>
    );
}
