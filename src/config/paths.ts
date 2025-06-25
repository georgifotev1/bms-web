export const paths = {
    landing: {
        path: '/',
        getHref: () => '/',
    },

    app: {
        auth: {
            register: {
                path: '/auth/register',
                getHref: (redirectTo?: string | null | undefined) =>
                    `/auth/register${
                        redirectTo
                            ? `?redirectTo=${encodeURIComponent(redirectTo)}`
                            : ''
                    }`,
            },
            login: {
                path: '/auth/login',
                getHref: (redirectTo?: string | null | undefined) =>
                    `/auth/login${
                        redirectTo
                            ? `?redirectTo=${encodeURIComponent(redirectTo)}`
                            : ''
                    }`,
            },
        },
        brandCreate: '/brand/create',
        root: {
            path: '/',
        },
        services: {
            path: '/services',
            new: '/services/new',
            edit: '/services/:serviceId',
        },
        brand: {
            path: '/brand',
        },
    },
} as const;
