import { env } from '@/config/env';
import { RouteContext, RouteType } from '@/types/routing';

export const getRouteContext = (): RouteContext => {
    const hostname = window.location.hostname;
    const isLanding = hostname === env.APP_HOST;
    const subdomain = hostname.split('.')[0];

    let routeType: RouteType;
    if (isLanding) {
        routeType = 'landing';
    } else if (subdomain === 'app') {
        routeType = 'app';
    } else {
        routeType = 'brand';
    }

    return { hostname, subdomain, routeType, isLanding };
};
