import { ContentLayout } from '@/components/layouts/content';
import { Skeleton } from '@/components/ui/skeleton';
import { useBookings } from '@/features/bookings/api/get-bookings';
import { ClientContainer } from '@/features/bookings/components/calendar/client-container';
import { CalendarProvider } from '@/features/bookings/calendar/context';
import { useUsers } from '@/features/users/api/get-users';

export const DashboardRoute = () => {
    const users = useUsers();
    const bookings = useBookings();

    if (bookings.isLoading || users.isLoading) {
        return <Skeleton />;
    }
    if (!bookings.data || !users.data) return;
    return (
        <ContentLayout title='Dashboard'>
            <CalendarProvider users={users.data} events={bookings.data}>
                <div className='mx-auto flex w-full flex-col gap-4'>
                    <ClientContainer view='week' />
                </div>
            </CalendarProvider>
        </ContentLayout>
    );
};
