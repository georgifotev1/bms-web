import logo from '@/assets/react.svg';
import { Head } from '@/components/seo/head';
import { Link } from '@/components/ui/link';
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
                <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                    <div className='flex justify-center'>
                        <Link
                            className='flex items-center text-white'
                            to={paths.landing.getHref()}
                        >
                            <img
                                className='h-24 w-auto'
                                src={logo}
                                alt='Workflow'
                            />
                        </Link>
                    </div>

                    <h2 className='mt-3 text-center text-3xl font-extrabold text-gray-900'>
                        {title}
                    </h2>
                </div>

                <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                    <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};
