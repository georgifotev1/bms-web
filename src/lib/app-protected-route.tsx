import { Navigate, useLocation } from 'react-router';
import { paths } from '@/config/paths';
import { useUser } from './auth';

export const AppProtectedRoute = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const user = useUser();
    const location = useLocation();

    if (!user.data) {
        return (
            <Navigate to={paths.app.auth.login.getHref(location.pathname)} />
        );
    }

    return children;
};
