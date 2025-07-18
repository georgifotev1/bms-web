import { RouteObject } from 'react-router';
import { paths } from '@/config/paths';
import AppRoot, { ErrorBoundary } from '@/app/routes/app/root';
import { AppProtectedRoute } from '@/components/layouts/app-protected-route';

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
        path: paths.app.root.path,
        element: (
            <AppProtectedRoute>
                <AppRoot />
            </AppProtectedRoute>
        ),
        ErrorBoundary: ErrorBoundary,
        children: [
            {
                index: true,
                lazy: () =>
                    import('@/app/routes/app/calendar').then(
                        ({ CalendarRoute }) => ({
                            Component: CalendarRoute,
                        })
                    ),
            },
            {
                path: paths.app.services.path,
                lazy: () =>
                    import('@/app/routes/app/services').then(
                        ({ ServicesRoute }) => ({
                            Component: ServicesRoute,
                        })
                    ),
            },
            {
                path: paths.app.services.new,
                lazy: () =>
                    import('@/app/routes/app/services/new').then(
                        ({ NewServiceRoute }) => ({
                            Component: NewServiceRoute,
                        })
                    ),
            },
            {
                path: paths.app.services.edit,
                lazy: () =>
                    import('@/app/routes/app/services/edit').then(
                        ({ EditServiceRoute }) => ({
                            Component: EditServiceRoute,
                        })
                    ),
            },
            {
                path: paths.app.brand.path,
                lazy: () =>
                    import('@/app/routes/app/brand/brand-details').then(
                        ({ BrandRoute }) => ({
                            Component: BrandRoute,
                        })
                    ),
            },
            {
                path: paths.app.brand.workingHours,
                lazy: () =>
                    import('@/app/routes/app/brand/working-hours').then(
                        ({ WorkingHoursRoute }) => ({
                            Component: WorkingHoursRoute,
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
