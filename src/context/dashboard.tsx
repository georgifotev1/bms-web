import React, { createContext, useContext, ReactNode } from 'react';
import { useQueries } from '@tanstack/react-query';
import { Customer, Service, User } from '@/types/api';
import { api } from '@/lib/api-client';
import { queryKeys } from '@/lib/react-query';

const getCustomers = (): Promise<Customer[]> => {
    return api.get('/customers');
};

const getServices = async (brandId: number): Promise<Service[]> => {
    return await api.get(`/service/${brandId}`);
};

const getUsers = (): Promise<User[]> => {
    return api.get('/users');
};
interface DashboardContextType {
    users: {
        data: User[] | undefined;
        isLoading: boolean;
        error: unknown;
        isError: boolean;
    };
    customers: {
        data: Customer[] | undefined;
        isLoading: boolean;
        error: unknown;
        isError: boolean;
    };
    services: {
        data: Service[] | undefined;
        isLoading: boolean;
        error: unknown;
        isError: boolean;
    };
    isLoading: boolean;
    hasError: boolean;
    isAllSuccess: boolean;
    isAnyLoading: boolean;
    refetchAll: () => void;
    stats: {
        usersCount: number;
        customersCount: number;
        servicesCount: number;
    };
}

const DashboardContext = createContext<DashboardContextType | undefined>(
    undefined
);

interface DashboardProviderProps {
    children: ReactNode;
    brandId: number;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
    children,
    brandId,
}) => {
    const queries = useQueries({
        queries: [
            {
                queryKey: [queryKeys.users],
                queryFn: () => getUsers(),
            },
            {
                queryKey: [queryKeys.customers],
                queryFn: () => getCustomers(),
            },
            {
                queryKey: [queryKeys.services, brandId],
                queryFn: () => getServices(brandId),
                enabled: !!brandId,
            },
        ],
    });

    const [usersQuery, customersQuery, servicesQuery] = queries;

    const contextValue: DashboardContextType = {
        users: {
            data: usersQuery.data,
            isLoading: usersQuery.isLoading,
            error: usersQuery.error,
            isError: usersQuery.isError,
        },
        customers: {
            data: customersQuery.data,
            isLoading: customersQuery.isLoading,
            error: customersQuery.error,
            isError: customersQuery.isError,
        },
        services: {
            data: servicesQuery.data,
            isLoading: servicesQuery.isLoading,
            error: servicesQuery.error,
            isError: servicesQuery.isError,
        },
        isLoading: queries.every((q) => q.isLoading),
        isAnyLoading: queries.some((q) => q.isLoading),
        hasError: queries.some((q) => q.isError),
        isAllSuccess: queries.every((q) => q.isSuccess),
        refetchAll: () => {
            queries.forEach((query) => query.refetch());
        },
        stats: {
            usersCount: usersQuery.data?.length || 0,
            customersCount: customersQuery.data?.length || 0,
            servicesCount: servicesQuery.data?.length || 0,
        },
    };

    return (
        <DashboardContext.Provider value={contextValue}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboardData = (): DashboardContextType => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error(
            'useDashboardData must be used within a DashboardProvider. ' +
                'Make sure to wrap your component with DashboardProvider.'
        );
    }
    return context;
};
