import { RouteObject } from 'react-router';
import { paths } from '@/config/paths';
import AppRoot, { ErrorBoundary } from '@/app/routes/app/root';
import { AppProtectedRoute } from '@/lib/app-protected-route';

export const appRoutes: RouteObject[] = [
    {
        path: paths.app.auth.register.path,
        lazy: () =>
            import('@/app/routes/app/auth/register').then(
                ({ RegisterRoute }) => ({
                    Component: RegisterRoute,
                })
            ),
    },
    {
        path: paths.app.auth.login.path,
        lazy: () =>
            import('@/app/routes/app/auth/login').then(({ LoginRoute }) => ({
                Component: LoginRoute,
            })),
    },
    {
        path: paths.app.brandCreate,
        lazy: () =>
            import('@/app/routes/app/brand/create-brand').then(
                ({ CreateBrandRoute }) => ({
                    Component: CreateBrandRoute,
                })
            ),
    },
    {
        path: paths.app.root,
        element: (
            <AppProtectedRoute>
                <AppRoot />
            </AppProtectedRoute>
        ),
        ErrorBoundary: ErrorBoundary,
        children: [
            {
                path: paths.app.root,
                lazy: () =>
                    import('@/app/routes/app/dashboard').then(
                        ({ DashboardRoute }) => ({
                            Component: DashboardRoute,
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
