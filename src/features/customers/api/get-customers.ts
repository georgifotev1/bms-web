import { api } from '@/lib/api-client';
import { Customer } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getCustomers = (): Promise<Customer[]> => {
    return api.get('/customers');
};

export const useCustomers = () => {
    return useQuery({
        queryKey: ['customers'],
        queryFn: () => getCustomers(),
    });
};
