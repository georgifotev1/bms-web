import { MainErrorFallback } from '@/components/errors/main';
import { LoadingScreen } from '@/components/ui/spinner/loading-screen';
import { queryConfig } from '@/lib/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'sonner';

type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: queryConfig,
            })
    );
    return (
        <React.Suspense fallback={<LoadingScreen />}>
            <ErrorBoundary FallbackComponent={MainErrorFallback}>
                <QueryClientProvider client={queryClient}>
                    {import.meta.env.DEV && <ReactQueryDevtools />}
                    {children}
                </QueryClientProvider>
                <Toaster />
            </ErrorBoundary>
        </React.Suspense>
    );
};
