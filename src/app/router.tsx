import { createBrowserRouter, RouterProvider } from 'react-router';

import * as React from 'react';
import { getRouteContext } from '@/utils/routing';
import { createRoutesForContext } from '@/config/router/router-factory';

export const AppRouter = () => {
    const router = React.useMemo(() => {
        const context = getRouteContext();
        const routes = createRoutesForContext(context);
        return createBrowserRouter(routes);
    }, []);

    return <RouterProvider router={router} />;
};
