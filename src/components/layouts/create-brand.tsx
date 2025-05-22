import { useUser } from '@/lib/auth';
import { Head } from '../seo/head';
import { LoadingScreen } from '../ui/spinner/loading-screen';
import { Navigate } from 'react-router';
import { paths } from '@/config/paths';

export const CreateBrandLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const user = useUser();

    if (user.isLoading) return <LoadingScreen />;
    if (user.data?.brandId && user.data.brandId > 0)
        return <Navigate to={paths.app.root} />;
    return (
        <>
            <Head title={'Create your brand'} />
            <div className='flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                    <h2 className='mt-3 text-center text-3xl font-extrabold text-gray-900'>
                        {'What is the name of your company?'}
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
