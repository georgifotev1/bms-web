import { Head } from '@/components/seo/head';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';
import * as React from 'react';
import { Navigate, useSearchParams } from 'react-router';
import { LoadingScreen } from '../ui/spinner/loading-screen';

type LayoutProps = {
    children: React.ReactNode;
    title: string;
};

export const AuthLayout = ({ children, title }: LayoutProps) => {
    const user = useUser();
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirectTo');

    if (user.isLoading) return <LoadingScreen />;

    if (user.data) {
        return <Navigate to={redirectTo ? redirectTo : paths.app.root.path} />;
    }
    return (
        <>
            <Head title={title} />
            <div className='flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8'>
                <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                    {children}
                </div>
            </div>
        </>
    );
};
