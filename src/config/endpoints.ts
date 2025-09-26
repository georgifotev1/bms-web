export const endpoints = {
    brand: {
        public: '/brand/public',
        private: '/brand',
    },
    customer: {
        private: '/customers',
    },
    events: {
        private: '/events/timestamp',
    },
    services: {
        private: '/service',
        public: '/service/public',
    },
    users: {
        private: '/users',
        public: '/users/public',
    },
} as const;

export type EndpointVisibility = 'private' | 'public';
