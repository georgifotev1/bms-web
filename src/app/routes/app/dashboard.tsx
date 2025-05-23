import { ContentLayout } from '@/components/layouts/content';
import { Skeleton } from '@/components/ui/skeleton';
import { useBookings } from '@/features/bookings/api/get-bookings';
import { ClientContainer } from '@/features/bookings/components/calendar/client-container';
import { CalendarProvider } from '@/features/bookings/context';
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
            <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
                <CalendarProvider users={users.data} events={bookings.data}>
                    <div className='mx-auto flex max-w-screen-2xl flex-col gap-4 px-8 py-4'>
                        <ClientContainer view='week' />;
                    </div>
                </CalendarProvider>
            </div>
            <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min' />
        </ContentLayout>
    );
};
