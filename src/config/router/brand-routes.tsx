import { RouteObject } from 'react-router';

export const brandRoutes: RouteObject[] = [
    {
        path: '/',
        lazy: () =>
            import('@/app/routes/brand/root').then(({ MainRoute }) => ({
                Component: () => <MainRoute />,
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
