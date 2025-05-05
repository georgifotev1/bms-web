import { env } from '../config/env';
import { paths } from '../config/paths';

let accessToken: string | null = null;

const tokenService = {
    setToken(token: string) {
        accessToken = token;
    },
    getToken() {
        return accessToken;
    },
    async refreshToken(): Promise<string> {
        return await api.get('/auth/refresh');
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

            if (response.status === 401) {
                try {
                    const newToken = await tokenService.refreshToken();
                    tokenService.setToken(newToken);
                    const retryConfig = {
                        ...config,
                        headers: {
                            ...config.headers,
                            Authorization: `Bearer ${newToken}`,
                        },
                    };
                    const retryResponse = await fetch(
                        `${env.API_URL}${url}`,
                        retryConfig
                    );

                    if (!retryResponse.ok) {
                        throw new Error(retryResponse.statusText);
                    }
                    return (await retryResponse.json()) as T;
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    const searchParams = new URLSearchParams();
                    const redirectTo =
                        searchParams.get('redirectTo') ||
                        window.location.pathname;
                    window.location.href =
                        paths.app.auth.login.getHref(redirectTo);
                }
            }
            throw new Error(message);
        }

        return (await response.json()) as T;
    } catch (error) {
        console.error('API call failed: ', error);
        throw error;
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
