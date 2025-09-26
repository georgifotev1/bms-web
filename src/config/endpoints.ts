export const endpoints = {
    brand: {
        public: '/brand/public',
        private: '/brand',
    },
} as const;

export type EndpointVisibility = 'private' | 'public';
