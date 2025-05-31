import { ContentLayout } from '@/components/layouts/content';
import { ClientContainer } from '@/features/events/calendar/client-container';
import { CalendarProvider } from '@/features/events/calendar/context';
import { useDashboardData } from '@/context/dashboard';
import { LoadingScreen } from '@/components/ui/spinner/loading-screen';

export const CalendarRoute = () => {
    const { users, isLoading: usersLoading } = useDashboardData();

    if (usersLoading) {
        return <LoadingScreen />;
    }

    return (
        <ContentLayout title='Dashboard'>
            <CalendarProvider users={users.data ?? []}>
                <ClientContainer />
            </CalendarProvider>
        </ContentLayout>
    );
};
