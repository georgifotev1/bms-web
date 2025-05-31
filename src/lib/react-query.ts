import { UseMutationOptions, DefaultOptions } from '@tanstack/react-query';

export const queryConfig = {
    queries: {
        // throwOnError: true,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60,
    },
} satisfies DefaultOptions;

export type ApiFnReturnType<
    FnType extends (...args: unknown[]) => Promise<unknown>
> = Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: unknown[]) => unknown> = Omit<
    ReturnType<T>,
    'queryKey' | 'queryFn'
>;

export type MutationConfig<
    MutationFnType extends (...args: unknown[]) => Promise<unknown>
> = UseMutationOptions<
    ApiFnReturnType<MutationFnType>,
    Error,
    Parameters<MutationFnType>[0]
>;

export const queryKeys = {
    events: 'events',
    brand: 'brand',
    user: 'user',
    users: 'users',
    customers: 'customers',
    services: 'services',
};
