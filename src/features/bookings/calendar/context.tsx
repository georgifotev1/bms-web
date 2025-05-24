'use client';

import { createContext, useContext, useState } from 'react';

import type { Dispatch, SetStateAction } from 'react';
import type { Booking as IEvent, User as IUser } from '@/types/api';
import type {
    TBadgeVariant,
    TVisibleHours,
    TWorkingHours,
} from '@/types/calendar';

interface ICalendarContext {
    selectedDate: Date;
    setSelectedDate: (date: Date | undefined) => void;
    selectedUserId: IUser['id'] | 'all';
    setSelectedUserId: (userId: IUser['id'] | 'all') => void;
    badgeVariant: TBadgeVariant;
    setBadgeVariant: (variant: TBadgeVariant) => void;
    users: IUser[];
    workingHours: TWorkingHours;
    setWorkingHours: Dispatch<SetStateAction<TWorkingHours>>;
    visibleHours: TVisibleHours;
    setVisibleHours: Dispatch<SetStateAction<TVisibleHours>>;
    events: IEvent[];
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

export function CalendarProvider({
    children,
    users,
    events,
}: {
    children: React.ReactNode;
    users: IUser[];
    events: IEvent[];
}) {
    const [badgeVariant, setBadgeVariant] = useState<TBadgeVariant>('colored');
    const [visibleHours, setVisibleHours] =
        useState<TVisibleHours>(VISIBLE_HOURS);
    const [workingHours, setWorkingHours] =
        useState<TWorkingHours>(WORKING_HOURS);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedUserId, setSelectedUserId] = useState<IUser['id'] | 'all'>(
        'all'
    );

    const handleSelectDate = (date: Date | undefined) => {
        if (!date) return;
        setSelectedDate(date);
    };

    return (
        <CalendarContext.Provider
            value={{
                selectedDate,
                setSelectedDate: handleSelectDate,
                selectedUserId,
                setSelectedUserId,
                badgeVariant,
                setBadgeVariant,
                users,
                visibleHours,
                setVisibleHours,
                workingHours,
                setWorkingHours,
                events,
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
