import { Service } from '@/types/api';
import { getServiceFormData, ServiceData } from './create-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query';
import { api } from '@/lib/api-client';

const updateService = (
    data: ServiceData,
    serviceId: string
): Promise<Service> => {
    const formData = getServiceFormData(data);
    return api.putFormData(`/service/id/${serviceId}`, formData);
};

export const useUpdateService = (serviceId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ServiceData) => updateService(data, serviceId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.services] });
        },
    });
};
