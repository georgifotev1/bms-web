import { endpoints } from '@/config/endpoints';
import { api } from '@/lib/api-client';
import { queryKeys } from '@/lib/react-query';
import { Customer } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getCustomers = (): Promise<Customer[]> => {
    return api.get(endpoints.customer.private);
};

export const useCustomers = () => {
    return useQuery({
        queryKey: [queryKeys.customers],
        queryFn: () => getCustomers(),
    });
};
