import { RouteObject } from 'react-router';
import { RouteContext } from '../../types/routing';
import { landingRoutes } from './landing-routes';
import { appRoutes } from './app-routes';
import { brandRoutes } from './brand-routes';

export const createRoutesForContext = (
    context: RouteContext
): RouteObject[] => {
    switch (context.routeType) {
        case 'landing':
            return landingRoutes;
        case 'app':
            return appRoutes;
        case 'brand':
            return brandRoutes;
        default:
            return [
                {
                    path: '*',
                    element: <div>Page not found</div>,
                },
            ];
    }
};
