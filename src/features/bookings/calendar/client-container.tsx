import { useMemo } from 'react';
import { isSameDay, parseISO } from 'date-fns';

import { TCalendarView } from '@/types/calendar';
import { CalendarHeader } from './header/calendar-header';
import { CalendarDayView } from './week-and-day-view/calendar-day-view';
import { CalendarMonthView } from './month-view/calendar-month-view';
import { CalendarWeekView } from './week-and-day-view/calendar-week-view';
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
                    selectedUserId === -1 || event.userId === selectedUserId;
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
                    selectedUserId === -1 || event.userId === selectedUserId;
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
                    selectedUserId === -1 || event.userId === selectedUserId;
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
        <div className=''>
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
            {view === 'agenda' && (
                <CalendarAgendaView
                    singleDayEvents={singleDayEvents}
                    multiDayEvents={multiDayEvents}
                />
            )}
        </div>
    );
}
