import DashboardLayout from '@/components/layouts/dashboard';
import { Outlet } from 'react-router';

export const ErrorBoundary = () => {
    return <div>Something went wrong!</div>;
};

const AppRoot = () => {
    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    );
};

export default AppRoot;
