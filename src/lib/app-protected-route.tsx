import { LoadingScreen } from '@/components/ui/spinner/loading-screen';
import { paths } from '@/config/paths';
import { Navigate, useLocation } from 'react-router';
import { useUser } from './auth';
import { useBrand } from '../features/brand/api/get-brand';
import { BrandContext } from '@/context/brand';

export const AppProtectedRoute = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const user = useUser();

    const location = useLocation();

    const brandId = user.data?.brandId;
    const brand = useBrand(brandId ?? 0);

    if (user.isLoading || user.isFetching || brand.isLoading) {
        return <LoadingScreen />;
    }

    if (!user.data) {
        return (
            <Navigate to={paths.app.auth.login.getHref(location.pathname)} />
        );
    }

    if (!brandId) {
        return <Navigate to={paths.app.brandCreate} />;
    }

    if (!brand.data) {
        return <div>Brand not found or error loading brand.</div>;
    }

    return (
        <BrandContext.Provider value={brand.data}>
            {children}
        </BrandContext.Provider>
    );
};
