import { api } from '@/lib/api-client';
import { User } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getUsers = (): Promise<User[]> => {
    return api.get('/users');
};

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers(),
    });
};
