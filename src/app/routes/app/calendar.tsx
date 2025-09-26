import { ContentLayout } from '@/components/layouts/content';
import { ClientContainer } from '@/features/events/calendar/client-container';
import { CalendarProvider } from '@/features/events/calendar/context';

import { LoadingScreen } from '@/components/ui/spinner/loading-screen';
import { useUsers } from '@/features/users/api/get-users';

export const CalendarRoute = () => {
    const { data: users, isLoading: usersLoading } = useUsers();

    if (usersLoading) {
        return <LoadingScreen />;
    }

    return (
        <ContentLayout title='Dashboard'>
            <CalendarProvider users={users ?? []}>
                <ClientContainer />
            </CalendarProvider>
        </ContentLayout>
    );
};
