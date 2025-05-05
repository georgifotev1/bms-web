import { env } from '@/lib/env';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router';
const BrandComponent = ({ brand }: { brand: string }) => (
    <div>Brand: {brand}</div>
);
const createAppRouter = () => {
    const hostname = window.location.hostname;
    const isLanding = hostname === env.APP_HOST;
    const subdomain = hostname.split('.')[0];
    console.log(env.APP_HOST == hostname);
    let routesConfig: RouteObject[] = [];

    if (isLanding) {
        routesConfig = [{ path: '/', element: <div>Landing</div> }];
    } else if (subdomain == 'app') {
        routesConfig = [{ path: '/', element: <div>Dashboard</div> }];
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
