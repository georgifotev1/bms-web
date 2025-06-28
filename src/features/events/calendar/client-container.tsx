import { useMemo } from 'react';
import { isSameDay, parseISO } from 'date-fns';

import { CalendarHeader } from './header/calendar-header';
import { CalendarDayView } from './week-and-day-view/calendar-day-view';
import { CalendarMonthView } from './month-view/calendar-month-view';
import { CalendarWeekView } from './week-and-day-view/calendar-week-view';
import { CalendarAgendaView } from './agenda-view/calendar-agenda-view';
import { useCalendar } from './context';
import { TCalendarView } from '@/types/calendar';
import { Event } from '@/types/api';
import { LoadingScreen } from '@/components/ui/spinner/loading-screen';
import { DndProviderWrapper } from '@/utils/dnd-provider';

export function ClientContainer() {
    const {
        selectedDate,
        selectedUserId,
        events,
        currentView,
        setCurrentView,
        isLoading,
    } = useCalendar();

    const filteredEvents = useMemo(() => {
        if (!events) return;
        return events.filter(event => {
            const eventStartDate = parseISO(event.startTime);
            const eventEndDate = parseISO(event.endTime);

            if (currentView === 'month' || currentView === 'agenda') {
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

            if (currentView === 'week') {
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

            if (currentView === 'day') {
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
    }, [selectedDate, selectedUserId, events, currentView]);

    const singleDayEvents = useMemo(() => {
        return filteredEvents?.filter(event => {
            const startDate = parseISO(event.startTime);
            const endDate = parseISO(event.endTime);
            return isSameDay(startDate, endDate);
        });
    }, [filteredEvents]);

    const multiDayEvents = useMemo(() => {
        return filteredEvents?.filter(event => {
            const startDate = parseISO(event.startTime);
            const endDate = parseISO(event.endTime);
            return !isSameDay(startDate, endDate);
        });
    }, [filteredEvents]);

    const eventStartDates = useMemo(() => {
        return filteredEvents?.map(event => ({
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
        <>
            <CalendarHeader
                view={currentView}
                events={filteredEvents}
                updateView={setCurrentView}
            />
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <DndProviderWrapper>
                    <CalendarView
                        view={currentView}
                        singleDayEvents={singleDayEvents}
                        multiDayEvents={multiDayEvents}
                    />
                </DndProviderWrapper>
            )}
        </>
    );
}

type CalendarViewProps = {
    view: TCalendarView;
    singleDayEvents: Event[];
    multiDayEvents: Event[];
};

const CalendarView = ({ view, ...props }: CalendarViewProps) => {
    switch (view) {
        case 'day':
            return <CalendarDayView {...props} />;
        case 'week':
            return <CalendarWeekView {...props} />;
        case 'month':
            return <CalendarMonthView {...props} />;
        case 'agenda':
            return <CalendarAgendaView {...props} />;
        default:
            return null;
    }
};
