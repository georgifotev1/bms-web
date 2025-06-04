import { paths } from '@/config/paths';
import { env } from '../config/env';
import { Token } from '@/types/api';
import { toast } from 'sonner';

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

async function ensureValidToken(): Promise<boolean> {
    if (!tokenService.getToken()) {
        try {
            const newToken = await tokenService.refreshToken();
            tokenService.setToken(newToken.token);
            return true;
        } catch {
            return false;
        }
    }
    return true;
}

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
    const isAuthRoute = window.location.pathname.includes('auth');

    if (!isAuthRoute) {
        const isToken = await ensureValidToken();
        if (!isToken)
            window.location.href = paths.app.auth.login.getHref(
                window.location.pathname
            );
    }

    const [url, config] = interceptor(path, init);
    try {
        const response = await fetch(`${env.API_URL}${url}`, config);
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const message = errorData?.error || response.statusText;
            toast.error(message);
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
