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
        return <Navigate to={paths.app.root.path} />;
    return (
        <>
            <Head title={'Create your brand'} />
            <div className='flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8'>
                <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                    {children}
                </div>
            </div>
        </>
    );
};
