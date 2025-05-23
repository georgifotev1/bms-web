import * as React from 'react';
import { ContentLayout } from '@/components/layouts/content';
import { Skeleton } from '@/components/ui/skeleton';
import { useBookings } from '@/features/bookings/api/get-bookings';
import { ClientContainer } from '@/features/bookings/calendar/client-container';
import { CalendarProvider } from '@/features/bookings/calendar/context';
import { useUsers } from '@/features/users/api/get-users';
import { TCalendarView } from '@/types/calendar';

const calendarViewKey = 'calendarViewKey';

export const DashboardRoute = () => {
    const users = useUsers();
    const bookings = useBookings();
    const [view, setView] = React.useState<TCalendarView>(
        () => (localStorage.getItem(calendarViewKey) as TCalendarView) ?? 'week'
    );
    const updateView = (view: TCalendarView) => {
        localStorage.setItem(calendarViewKey, view);
        setView(view);
    };

    if (bookings.isLoading || users.isLoading) {
        return <Skeleton />;
    }

    return (
        <ContentLayout title='Dashboard'>
            <CalendarProvider
                users={users.data ?? []}
                events={bookings.data ?? []}
            >
                <div className='mx-auto flex w-full flex-col gap-4'>
                    <ClientContainer view={view} updateView={updateView} />
                </div>
            </CalendarProvider>
        </ContentLayout>
    );
};
