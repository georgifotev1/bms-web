import { ContentLayout } from '@/components/layouts/content';
import { ClientContainer } from '@/features/bookings/calendar/client-container';
import { CalendarProvider } from '@/features/bookings/calendar/context';
import { CalendarSkeleton } from '@/features/bookings/calendar/calendar-skeleton';
import { useDashboardData } from '@/context/dashboard';

export const CalendarRoute = () => {
    const { users, isLoading: usersLoading } = useDashboardData();

    if (usersLoading) {
        return <CalendarSkeleton />;
    }

    return (
        <ContentLayout title='Dashboard'>
            <CalendarProvider users={users.data ?? []}>
                <ClientContainer />
            </CalendarProvider>
        </ContentLayout>
    );
};
