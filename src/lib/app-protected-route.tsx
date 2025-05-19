import { LoadingScreen } from '@/components/ui/spinner/loading-screen';
import { paths } from '@/config/paths';
import { Navigate, useLocation } from 'react-router';
import { useUser } from './auth';

export const AppProtectedRoute = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const user = useUser();
    const location = useLocation();

    if (user.isLoading) {
        return <LoadingScreen />;
    }

    if (!user.data) {
        return (
            <Navigate to={paths.app.auth.login.getHref(location.pathname)} />
        );
    }

    return children;
};
