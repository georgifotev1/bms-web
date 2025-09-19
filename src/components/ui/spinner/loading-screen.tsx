import { Spinner } from './spinner';

export const LoadingScreen = ({
    message = 'Loading...',
}: {
    message?: string;
}) => {
    return (
        <div className='flex min-h-screen flex-col justify-center items-center bg-accent/80 py-12 sm:px-6 lg:px-8'>
            <Spinner size='lg' />
            <span className='text-white mt-4'>{message}</span>
        </div>
    );
};
