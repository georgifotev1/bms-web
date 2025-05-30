import {
    addDays,
    addMonths,
    addWeeks,
    subDays,
    subMonths,
    subWeeks,
    isSameWeek,
    isSameDay,
    isSameMonth,
    startOfWeek,
    startOfMonth,
    endOfMonth,
    endOfWeek,
    format,
    parseISO,
    differenceInMinutes,
    eachDayOfInterval,
    startOfDay,
    differenceInDays,
    subYears,
    addYears,
    isSameYear,
    isWithinInterval,
    set,
    formatISO,
    setMilliseconds,
    setSeconds,
    setMinutes,
    addMinutes,
    isAfter,
    isBefore,
    parse,
} from 'date-fns';

import type { Booking as IEvent } from '@/types/api';
import type {
    TCalendarView,
    TVisibleHours,
    TWorkingHours,
    ICalendarCell,
} from '@/types/calendar';

// ================ Header helper functions ================ //

export function rangeText(view: TCalendarView, date: Date) {
    const formatString = 'MMM d, yyyy';
    let start: Date;
    let end: Date;

    switch (view) {
        case 'agenda':
            start = startOfMonth(date);
            end = endOfMonth(date);
            break;
        case 'month':
            start = startOfMonth(date);
            end = endOfMonth(date);
            break;
        case 'week':
            start = startOfWeek(date);
            end = endOfWeek(date);
            break;
        case 'day':
            return format(date, formatString);
        default:
            return 'Error while formatting ';
    }

    return `${format(start, formatString)} - ${format(end, formatString)}`;
}

export function navigateDate(
    date: Date,
    view: TCalendarView,
    direction: 'previous' | 'next'
): Date {
    const operations = {
        agenda: direction === 'next' ? addMonths : subMonths,
        year: direction === 'next' ? addYears : subYears,
        month: direction === 'next' ? addMonths : subMonths,
        week: direction === 'next' ? addWeeks : subWeeks,
        day: direction === 'next' ? addDays : subDays,
    };

    return operations[view](date, 1);
}

export function getEventsCount(
    events: IEvent[],
    date: Date,
    view: TCalendarView
): number {
    const compareFns = {
        agenda: isSameMonth,
        year: isSameYear,
        day: isSameDay,
        week: isSameWeek,
        month: isSameMonth,
    };

    return events.filter((event) =>
        compareFns[view](new Date(event.startTime), date)
    ).length;
}

// ================ Week and day view helper functions ================ //

export function getCurrentEvents(events: IEvent[]) {
    const now = new Date();
    return (
        events.filter((event) =>
            isWithinInterval(now, {
                start: parseISO(event.startTime),
                end: parseISO(event.endTime),
            })
        ) || null
    );
}

export function groupEvents(dayEvents: IEvent[]) {
    const sortedEvents = dayEvents.sort(
        (a, b) =>
            parseISO(a.startTime).getTime() - parseISO(b.startTime).getTime()
    );
    const groups: IEvent[][] = [];

    for (const event of sortedEvents) {
        const eventStart = parseISO(event.startTime);

        let placed = false;
        for (const group of groups) {
            const lastEventInGroup = group[group.length - 1];
            const lastEventEnd = parseISO(lastEventInGroup.endTime);

            if (eventStart >= lastEventEnd) {
                group.push(event);
                placed = true;
                break;
            }
        }

        if (!placed) groups.push([event]);
    }

    return groups;
}

export function getEventBlockStyle(
    event: IEvent,
    day: Date,
    groupIndex: number,
    groupSize: number,
    visibleHoursRange?: { from: number; to: number }
) {
    const startDate = parseISO(event.startTime);
    const dayStart = new Date(day.setHours(0, 0, 0, 0));
    const eventStart = startDate < dayStart ? dayStart : startDate;
    const startMinutes = differenceInMinutes(eventStart, dayStart);

    let top;

    if (visibleHoursRange) {
        const visibleStartMinutes = visibleHoursRange.from * 60;
        const visibleEndMinutes = visibleHoursRange.to * 60;
        const visibleRangeMinutes = visibleEndMinutes - visibleStartMinutes;
        top =
            ((startMinutes - visibleStartMinutes) / visibleRangeMinutes) * 100;
    } else {
        top = (startMinutes / 1440) * 100;
    }

    const width = 100 / groupSize;
    const left = groupIndex * width;

    return { top: `${top}%`, width: `${width}%`, left: `${left}%` };
}

export function isWorkingHour(
    day: Date,
    hour: number,
    workingHours: TWorkingHours
) {
    const dayIndex = day.getDay() as keyof typeof workingHours;
    const dayHours = workingHours[dayIndex];
    return hour >= dayHours.from && hour < dayHours.to;
}

export function getVisibleHours(
    visibleHours: TVisibleHours,
    singleDayEvents: IEvent[]
) {
    let earliestEventHour = visibleHours.from;
    let latestEventHour = visibleHours.to;

    singleDayEvents.forEach((event) => {
        const startHour = parseISO(event.startTime).getHours();
        const endTime = parseISO(event.endTime);
        const endHour = endTime.getHours() + (endTime.getMinutes() > 0 ? 1 : 0);
        if (startHour < earliestEventHour) earliestEventHour = startHour;
        if (endHour > latestEventHour) latestEventHour = endHour;
    });

    latestEventHour = Math.min(latestEventHour, 24);

    const hours = Array.from(
        { length: latestEventHour - earliestEventHour },
        (_, i) => i + earliestEventHour
    );

    return { hours, earliestEventHour, latestEventHour };
}

export function getCalendarCells(selectedDate: Date): ICalendarCell[] {
    const currentYear = selectedDate.getFullYear();
    const currentMonth = selectedDate.getMonth();

    const getDaysInMonth = (year: number, month: number) =>
        new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) =>
        new Date(year, month, 1).getDay();

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);
    const totalDays = firstDayOfMonth + daysInMonth;

    const prevMonthCells = Array.from({ length: firstDayOfMonth }, (_, i) => ({
        day: daysInPrevMonth - firstDayOfMonth + i + 1,
        currentMonth: false,
        date: new Date(
            currentYear,
            currentMonth - 1,
            daysInPrevMonth - firstDayOfMonth + i + 1
        ),
    }));

    const currentMonthCells = Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        currentMonth: true,
        date: new Date(currentYear, currentMonth, i + 1),
    }));

    const nextMonthCells = Array.from(
        { length: (7 - (totalDays % 7)) % 7 },
        (_, i) => ({
            day: i + 1,
            currentMonth: false,
            date: new Date(currentYear, currentMonth + 1, i + 1),
        })
    );

    return [...prevMonthCells, ...currentMonthCells, ...nextMonthCells];
}

export function calculateMonthEventPositions(
    multiDayEvents: IEvent[],
    singleDayEvents: IEvent[],
    selectedDate: Date
) {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);

    const eventPositions: { [key: string]: number } = {};
    const occupiedPositions: { [key: string]: boolean[] } = {};

    eachDayOfInterval({ start: monthStart, end: monthEnd }).forEach((day) => {
        occupiedPositions[day.toISOString()] = [false, false, false];
    });

    const sortedEvents = [
        ...multiDayEvents.sort((a, b) => {
            const aDuration = differenceInDays(
                parseISO(a.endTime),
                parseISO(a.startTime)
            );
            const bDuration = differenceInDays(
                parseISO(b.endTime),
                parseISO(b.startTime)
            );
            return (
                bDuration - aDuration ||
                parseISO(a.startTime).getTime() -
                    parseISO(b.startTime).getTime()
            );
        }),
        ...singleDayEvents.sort(
            (a, b) =>
                parseISO(a.startTime).getTime() -
                parseISO(b.startTime).getTime()
        ),
    ];

    sortedEvents.forEach((event) => {
        const eventStart = parseISO(event.startTime);
        const eventEnd = parseISO(event.endTime);
        const eventDays = eachDayOfInterval({
            start: eventStart < monthStart ? monthStart : eventStart,
            end: eventEnd > monthEnd ? monthEnd : eventEnd,
        });

        let position = -1;

        for (let i = 0; i < 3; i++) {
            if (
                eventDays.every((day) => {
                    const dayPositions =
                        occupiedPositions[startOfDay(day).toISOString()];
                    return dayPositions && !dayPositions[i];
                })
            ) {
                position = i;
                break;
            }
        }

        if (position !== -1) {
            eventDays.forEach((day) => {
                const dayKey = startOfDay(day).toISOString();
                occupiedPositions[dayKey][position] = true;
            });
            eventPositions[event.id] = position;
        }
    });

    return eventPositions;
}

export function getMonthCellEvents(
    date: Date,
    events: IEvent[],
    eventPositions: Record<string, number>
) {
    const eventsForDate = events.filter((event) => {
        const eventStart = parseISO(event.startTime);
        const eventEnd = parseISO(event.endTime);
        return (
            (date >= eventStart && date <= eventEnd) ||
            isSameDay(date, eventStart) ||
            isSameDay(date, eventEnd)
        );
    });

    return eventsForDate
        .map((event) => ({
            ...event,
            position: eventPositions[event.id] ?? -1,
            isMultiDay: event.startTime !== event.endTime,
        }))
        .sort((a, b) => {
            if (a.isMultiDay && !b.isMultiDay) return -1;
            if (!a.isMultiDay && b.isMultiDay) return 1;
            return a.position - b.position;
        });
}

type TimeString = string;

type ParsedDateTime = {
    date: Date;
    time: TimeString;
};

export const combineDateAndTime = (date: Date, time: TimeString): string => {
    const [hours, minutes] = time.split(':').map(Number);

    const combinedDate = set(date, {
        hours,
        minutes,
        seconds: 0,
        milliseconds: 0,
    });

    return formatISO(combinedDate);
};

export const createApiDateTime = (
    date: Date,
    timeString: TimeString
): string => {
    if (!date || !timeString) {
        throw new Error('Both date and time are required');
    }

    const dateString = parseISO(date.toISOString());
    return combineDateAndTime(dateString, timeString);
};

export const parseApiDateTime = (apiDateTime: string): ParsedDateTime => {
    const date = parseISO(apiDateTime);

    return {
        date: date,
        time: format(date, 'HH:mm') as TimeString,
    };
};

export function getNextAvailableTimeSlot(
    interval = 15,
    businessStartTime = '09:00',
    businessEndTime = '18:00'
) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const businessStart = parse(businessStartTime, 'HH:mm', today);
    const businessEnd = parse(businessEndTime, 'HH:mm', today);

    if (isBefore(now, businessStart)) {
        return businessStartTime;
    }

    if (!isBefore(now, businessEnd)) {
        return undefined;
    }

    const currentMinutes = now.getMinutes();

    const nextSlotMinutes = Math.ceil(currentMinutes / interval) * interval;

    let nextSlot = setSeconds(setMilliseconds(now, 0), 0); // Clear seconds and milliseconds

    if (nextSlotMinutes >= 60) {
        nextSlot = addMinutes(setMinutes(nextSlot, 0), nextSlotMinutes);
    } else {
        nextSlot = setMinutes(nextSlot, nextSlotMinutes);
    }

    if (isAfter(nextSlot, businessEnd)) {
        return undefined;
    }

    return format(nextSlot, 'HH:mm');
}

export const formatTimeSlot = (hour: number, minute: number) => {
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return format(date, 'HH:mm');
};
