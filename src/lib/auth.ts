import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Token, User } from '@/types/api';
import { api, tokenService } from './api-client';

export const loginInputSchema = z.object({
    email: z.string().min(1, 'Required').email('Invalid email'),
    password: z.string().min(3, 'Invalid Password'),
});

export const registerInputSchema = z.object({
    email: z.string().min(1, 'Required').email('Invalid email'),
    username: z.string().min(1, 'Required'),
    password: z.string().min(3, 'Invalid Password'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
export type RegisterInput = z.infer<typeof registerInputSchema>;

const getUser = async (): Promise<User> => {
    return await api.get('/users/me');
};

const logout = (): Promise<void> => {
    return api.post('/auth/logout');
};

const login = (data: LoginInput): Promise<Token> => {
    return api.post('/auth/token', data);
};

const register = (data: RegisterInput): Promise<User> => {
    return api.post('/auth/register', data);
};

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retryDelay: 500,
    });
};

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            tokenService.setToken(data.token);
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
};

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data);
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            tokenService.clearToken();
            queryClient.removeQueries({ queryKey: ['user'] });
        },
    });
};
