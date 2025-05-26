export type RouteType = 'landing' | 'app' | 'brand';

export interface RouteContext {
    hostname: string;
    subdomain: string;
    routeType: RouteType;
    isLanding: boolean;
}
