import { RouteObject } from 'react-router';
import { paths } from '@/config/paths';

export const landingRoutes: RouteObject[] = [
    {
        path: paths.landing.path,
        lazy: () =>
            import('@/app/routes/landing/root').then(({ LandinRoute }) => ({
                Component: LandinRoute,
            })),
    },
    {
        path: '*',
        lazy: () =>
            import('@/app/routes/not-found').then(({ NotFoundRoute }) => ({
                Component: () => <NotFoundRoute />,
            })),
    },
];
