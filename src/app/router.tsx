import { env } from '@/config/env';
import { paths } from '@/config/paths';
import { AppProtectedRoute } from '@/lib/app-protected-route';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router';
import AppRoot, {
    ErrorBoundary as AppRootErrorBoundary,
} from './routes/app/root';
const BrandComponent = ({ brand }: { brand: string }) => (
    <div>Brand: {brand}</div>
);
const createAppRouter = () => {
    const hostname = window.location.hostname;
    const isLanding = hostname === env.APP_HOST;
    const subdomain = hostname.split('.')[0];
    let routesConfig: RouteObject[] = [];

    if (isLanding) {
        routesConfig = [
            {
                path: paths.landing.path,
                lazy: () =>
                    import('./routes/landing/root').then(({ LandinRoute }) => ({
                        Component: LandinRoute,
                    })),
            },
        ];
    } else if (subdomain == 'app') {
        routesConfig = [
            {
                path: paths.app.auth.register.path,
                lazy: () =>
                    import('./routes/app/auth/register').then(
                        ({ RegisterRoute }) => ({
                            Component: RegisterRoute,
                        })
                    ),
            },
            {
                path: paths.app.auth.login.path,
                lazy: () =>
                    import('./routes/app/auth/login').then(
                        ({ LoginRoute }) => ({
                            Component: LoginRoute,
                        })
                    ),
            },
            {
                path: paths.app.brandCreate,
                lazy: () =>
                    import('./routes/app/brand/create-brand').then(
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
                ErrorBoundary: AppRootErrorBoundary,
                children: [
                    {
                        path: paths.app.root,
                        lazy: () =>
                            import('./routes/app/dashboard').then(
                                ({ DashboardRoute }) => ({
                                    Component: DashboardRoute,
                                })
                            ),
                    },
                ],
            },
        ];
    } else {
        routesConfig = [
            { path: '/', element: <BrandComponent brand={subdomain} /> },
        ];
    }
    return createBrowserRouter(routesConfig);
};
export const AppRouter = () => {
    const router = createAppRouter();
    return <RouterProvider router={router} />;
};
