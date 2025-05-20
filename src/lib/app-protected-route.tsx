import { LoadingScreen } from '@/components/ui/spinner/loading-screen';
import { paths } from '@/config/paths';
import { Navigate, useLocation } from 'react-router';
import { useUser } from './auth';
import { useBrand } from './brand';

export const AppProtectedRoute = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const user = useUser();

    const location = useLocation();

    const brandId = user.data?.brandId;
    const brand = useBrand(String(brandId ?? ''));

    if (user.isLoading || brand.isLoading) {
        return <LoadingScreen />;
    }

    if (!user.data) {
        return (
            <Navigate to={paths.app.auth.login.getHref(location.pathname)} />
        );
    }

    // TODO : add proper error handling
    if (!brandId) {
        return <div>Brand ID not found.</div>;
    }

    if (brand.error) {
        return <div>Brand not found or error loading brand.</div>;
    }

    return children;
};
