import { paths } from '@/config/paths';
import { env } from '../config/env';
import { toast } from 'sonner';

function interceptor(
    path: string,
    init: RequestInit = {}
): [RequestInfo, RequestInit] {
    const headers = new Headers(init.headers || {});
    headers.set('Accept', 'application/json');

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
            const message = errorData?.error || response.statusText;
            toast.error(message);
            if (
                response.status === 401 &&
                !window.location.pathname.includes('auth')
            ) {
                const searchParams = new URLSearchParams();
                const redirectTo =
                    searchParams.get('redirectTo') || window.location.pathname;
                window.location.href = paths.app.auth.login.getHref(redirectTo);
            }
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
    postFormData: <T>(
        url: string,
        formData: FormData,
        options: RequestInit = {}
    ): Promise<T> =>
        fetchWrapper<T>(url, {
            method: 'POST',
            body: formData,
            ...options,
        }),
    putFormData: <T>(
        url: string,
        formData: FormData,
        options: RequestInit = {}
    ): Promise<T> =>
        fetchWrapper<T>(url, {
            method: 'PUT',
            body: formData,
            ...options,
        }),
};
