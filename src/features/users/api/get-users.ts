import { endpoints, EndpointVisibility } from '@/config/endpoints';
import { api } from '@/lib/api-client';
import { queryKeys } from '@/lib/react-query';
import { User } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getUsers = (visibility: EndpointVisibility): Promise<User[]> => {
    return api.get(endpoints.users[visibility]);
};

export const useUsers = (visibility: EndpointVisibility = 'private') => {
    return useQuery({
        queryKey: [queryKeys.users],
        queryFn: () => getUsers(visibility),
    });
};
