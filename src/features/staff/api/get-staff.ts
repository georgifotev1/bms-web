import { api } from '@/lib/api-client';
import { User } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getStaffMembers = (): Promise<User[]> => {
    return api.get('/users');
};

export const useStaffMembers = () => {
    return useQuery({
        queryKey: ['staff'],
        queryFn: () => getStaffMembers(),
    });
};
