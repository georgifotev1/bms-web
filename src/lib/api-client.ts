import { paths } from '@/config/paths';
import { env } from '../config/env';
import { Token } from '@/types/api';

let accessToken: string | null = null;

export const tokenService = {
    setToken(token: string | null) {
        accessToken = token;
    },
    getToken() {
        return accessToken;
    },
    clearToken() {
        accessToken = null;
        window.location.href = paths.app.auth.login.getHref();
    },
    async refreshToken(): Promise<Token> {
        const response = await fetch(`${env.API_URL}/auth/refresh`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        return data;
    },
};

function interceptor(
    path: string,
    init: RequestInit = {}
): [RequestInfo, RequestInit] {
    const headers = new Headers(init.headers || {});
    headers.set('Accept', 'application/json');
    const accessToken = tokenService.getToken();
    if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);

    return [
        path,
        {
            ...init,
            headers,
            credentials: 'include',
        },
    ];
}

async function fetchWrapper<T>(
    path: string,
    init: RequestInit = {}
): Promise<T> {
    const [url, config] = interceptor(path, init);
    try {
        const response = await fetch(`${env.API_URL}${url}`, config);
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const message = errorData?.message || response.statusText;
            const isAuthRoute = window.location.pathname.includes('auth');

            if (response.status === 401) {
                try {
                    const data = await tokenService.refreshToken();
                    tokenService.setToken(data.token);
                    const retryConfig = {
                        ...config,
                        headers: {
                            ...config.headers,
                            Authorization: `Bearer ${tokenService.getToken()}`,
                        },
                    };
                    const retryResponse = await fetch(
                        `${env.API_URL}${url}`,
                        retryConfig
                    );

                    if (!retryResponse.ok && retryResponse.status === 401) {
                        if (!isAuthRoute) {
                            const searchParams = new URLSearchParams();
                            const redirectTo =
                                searchParams.get('redirectTo') ||
                                window.location.pathname;
                            window.location.href =
                                paths.app.auth.login.getHref(redirectTo);
                        }
                        throw new Error(retryResponse.statusText);
                    }
                    return (await retryResponse.json()) as T;
                } catch {
                    throw new Error('Unauthorized');
                }
            }
            throw new Error(message);
        }

        return (await response.json()) as T;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const api = {
    get: <T>(url: string, options: RequestInit = {}): Promise<T> =>
        fetchWrapper<T>(url, { method: 'GET', ...options }),
    post: <T>(
        url: string,
        body?: unknown,
        options: RequestInit = {}
    ): Promise<T> =>
        fetchWrapper<T>(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
            ...options,
        }),
    put: <T>(
        url: string,
        body?: unknown,
        options: RequestInit = {}
    ): Promise<T> =>
        fetchWrapper<T>(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
            ...options,
        }),
    delete: <T>(url: string, options: RequestInit = {}): Promise<T> =>
        fetchWrapper<T>(url, { method: 'DELETE', ...options }),
};
