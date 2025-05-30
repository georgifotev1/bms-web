'use client';

import { createContext, useContext, useState } from 'react';
import { useBookingsForView } from '@/features/bookings/api/get-bookings';

import type { Dispatch, SetStateAction } from 'react';
import type { Booking as IEvent, User as IUser } from '@/types/api';
import type {
    TBadgeVariant,
    TVisibleHours,
    TWorkingHours,
    TCalendarView,
} from '@/types/calendar';

interface ICalendarContext {
    selectedDate: Date;
    setSelectedDate: (date: Date | undefined) => void;
    currentView: TCalendarView;
    setCurrentView: (view: TCalendarView) => void;
    selectedUserId: IUser['id'] | -1;
    updateSelectedUserId: (userId: IUser['id'] | -1) => void;
    badgeVariant: TBadgeVariant;
    setBadgeVariant: (variant: TBadgeVariant) => void;
    workingHours: TWorkingHours;
    setWorkingHours: Dispatch<SetStateAction<TWorkingHours>>;
    visibleHours: TVisibleHours;
    setVisibleHours: Dispatch<SetStateAction<TVisibleHours>>;
    users: IUser[];
    events: IEvent[];
    isLoading: boolean;
    error: Error | null;
}

const CalendarContext = createContext({} as ICalendarContext);

const WORKING_HOURS = {
    0: { from: 0, to: 0 },
    1: { from: 9, to: 17 },
    2: { from: 9, to: 17 },
    3: { from: 9, to: 17 },
    4: { from: 9, to: 17 },
    5: { from: 9, to: 17 },
    6: { from: 0, to: 0 },
};

const VISIBLE_HOURS = { from: 7, to: 20 };
const calendarUserKey = 'calendarUserKey';
const calendarViewKey = 'calendarViewKey';

export function CalendarProvider({
    children,
    users,
}: {
    children: React.ReactNode;
    users: IUser[];
}) {
    const [badgeVariant, setBadgeVariant] = useState<TBadgeVariant>('colored');
    const [visibleHours, setVisibleHours] =
        useState<TVisibleHours>(VISIBLE_HOURS);
    const [workingHours, setWorkingHours] =
        useState<TWorkingHours>(WORKING_HOURS);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentView, setCurrentView] = useState<TCalendarView>(
        () => (localStorage.getItem(calendarViewKey) as TCalendarView) ?? 'week'
    );

    const [selectedUserId, setSelectedUserId] = useState<IUser['id'] | -1>(
        () => {
            const option = Number(localStorage.getItem(calendarUserKey));
            if (isNaN(option)) return -1;
            return option;
        }
    );

    const {
        data: events = [],
        isLoading,
        error,
    } = useBookingsForView(currentView, selectedDate);

    const handleSelectDate = (date: Date | undefined) => {
        if (!date) return;
        setSelectedDate(date);
    };

    const handleViewChange = (view: TCalendarView) => {
        localStorage.setItem(calendarViewKey, view);
        setCurrentView(view);
    };

    const updateSelectedUserId = (option: IUser['id'] | -1) => {
        localStorage.setItem(calendarUserKey, option.toString());
        setSelectedUserId(option);
    };

    return (
        <CalendarContext.Provider
            value={{
                selectedDate,
                setSelectedDate: handleSelectDate,
                currentView,
                setCurrentView: handleViewChange,
                selectedUserId,
                updateSelectedUserId,
                badgeVariant,
                setBadgeVariant,
                workingHours,
                setWorkingHours,
                visibleHours,
                setVisibleHours,
                users,
                events,
                isLoading,
                error,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendar(): ICalendarContext {
    const context = useContext(CalendarContext);
    if (!context)
        throw new Error('useCalendar must be used within a CalendarProvider.');
    return context;
}
