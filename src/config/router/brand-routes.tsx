import PublicAppRoot, { ErrorBoundary } from '@/app/routes/brand/root';
import { PublicMainLayout } from '@/components/layouts/public-page/main-layout';
import { RouteObject } from 'react-router';
import { paths } from '../paths';

export const brandRoutes: RouteObject[] = [
    {
        path: paths.public.root.path,
        element: (
            <PublicMainLayout>
                <PublicAppRoot />
            </PublicMainLayout>
        ),
        ErrorBoundary: ErrorBoundary,
        children: [
            {
                index: true,
                lazy: () =>
                    import('@/app/routes/brand/main-page').then(
                        ({ MainPage }) => ({
                            Component: MainPage,
                        })
                    ),
            },
        ],
    },
    {
        path: '*',
        lazy: () =>
            import('@/app/routes/not-found').then(({ NotFoundRoute }) => ({
                Component: () => <NotFoundRoute />,
            })),
    },
];
