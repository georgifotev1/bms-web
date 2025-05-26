import { useMemo } from 'react';
import { isSameDay, parseISO } from 'date-fns';

import { TCalendarView } from '@/types/calendar';
import { CalendarHeader } from './header/calendar-header';
import { CalendarDayView } from './week-and-day-view/calendar-day-view';
import { CalendarMonthView } from './month-view/calendar-month-view';
import { CalendarWeekView } from './week-and-day-view/calendar-week-view';
import { CalendarYearView } from './year-view/calendar-year-view';
import { CalendarAgendaView } from './agenda-view/calendar-agenda-view';
import { useCalendar } from './context';

interface IProps {
    view: TCalendarView;
    updateView: (view: TCalendarView) => void;
}

export function ClientContainer({ view, updateView }: IProps) {
    const { selectedDate, selectedUserId, events } = useCalendar();

    const filteredEvents = useMemo(() => {
        if (!events) return;
        return events.filter((event) => {
            const eventStartDate = parseISO(event.startTime);
            const eventEndDate = parseISO(event.endTime);

            if (view === 'year') {
                const yearStart = new Date(selectedDate.getFullYear(), 0, 1);
                const yearEnd = new Date(
                    selectedDate.getFullYear(),
                    11,
                    31,
                    23,
                    59,
                    59,
                    999
                );
                const isInSelectedYear =
                    eventStartDate <= yearEnd && eventEndDate >= yearStart;
                const isUserMatch =
                    selectedUserId === 'all' || event.userId === selectedUserId;
                return isInSelectedYear && isUserMatch;
            }

            if (view === 'month' || view === 'agenda') {
                const monthStart = new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    1
                );
                const monthEnd = new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth() + 1,
                    0,
                    23,
                    59,
                    59,
                    999
                );
                const isInSelectedMonth =
                    eventStartDate <= monthEnd && eventEndDate >= monthStart;
                const isUserMatch =
                    selectedUserId === 'all' || event.userId === selectedUserId;
                return isInSelectedMonth && isUserMatch;
            }

            if (view === 'week') {
                const dayOfWeek = selectedDate.getDay();

                const weekStart = new Date(selectedDate);
                weekStart.setDate(selectedDate.getDate() - dayOfWeek);
                weekStart.setHours(0, 0, 0, 0);

                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                weekEnd.setHours(23, 59, 59, 999);

                const isInSelectedWeek =
                    eventStartDate <= weekEnd && eventEndDate >= weekStart;
                const isUserMatch =
                    selectedUserId === 'all' || event.userId === selectedUserId;
                return isInSelectedWeek && isUserMatch;
            }

            if (view === 'day') {
                const dayStart = new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate(),
                    0,
                    0,
                    0
                );
                const dayEnd = new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate(),
                    23,
                    59,
                    59
                );
                const isInSelectedDay =
                    eventStartDate <= dayEnd && eventEndDate >= dayStart;
                const isUserMatch =
                    selectedUserId === 'all' || event.userId === selectedUserId;
                return isInSelectedDay && isUserMatch;
            }
        });
    }, [selectedDate, selectedUserId, events, view]);

    const singleDayEvents = filteredEvents?.filter((event) => {
        const startDate = parseISO(event.startTime);
        const endDate = parseISO(event.endTime);
        return isSameDay(startDate, endDate);
    });

    const multiDayEvents = filteredEvents?.filter((event) => {
        const startDate = parseISO(event.startTime);
        const endDate = parseISO(event.endTime);
        return !isSameDay(startDate, endDate);
    });

    // For year view, we only care about the start date
    // by using the same date for both start and end,
    // we ensure only the start day will show a dot
    const eventStartDates = useMemo(() => {
        return filteredEvents?.map((event) => ({
            ...event,
            endDate: event.startTime,
        }));
    }, [filteredEvents]);
    if (
        !filteredEvents ||
        !singleDayEvents ||
        !multiDayEvents ||
        !eventStartDates
    )
        return;
    return (
        <div className='overflow-hidden'>
            <CalendarHeader
                view={view}
                events={filteredEvents}
                updateView={updateView}
            />

            {view === 'day' && (
                <CalendarDayView
                    singleDayEvents={singleDayEvents}
                    multiDayEvents={multiDayEvents}
                />
            )}
            {view === 'month' && (
                <CalendarMonthView
                    singleDayEvents={singleDayEvents}
                    multiDayEvents={multiDayEvents}
                />
            )}
            {view === 'week' && (
                <CalendarWeekView
                    singleDayEvents={singleDayEvents}
                    multiDayEvents={multiDayEvents}
                />
            )}
            {view === 'year' && (
                <CalendarYearView allEvents={eventStartDates} />
            )}
            {view === 'agenda' && (
                <CalendarAgendaView
                    singleDayEvents={singleDayEvents}
                    multiDayEvents={multiDayEvents}
                />
            )}
        </div>
    );
}
