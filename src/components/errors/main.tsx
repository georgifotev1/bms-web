import { H2 } from '../typography';
import { Button } from '../ui/button';

export const MainErrorFallback = () => {
    return (
        <div
            className='flex h-screen w-screen flex-col items-center justify-center text-red-500'
            role='alert'
        >
            <H2 className='text-lg font-semibold'>
                Ooops, something went wrong :(
            </H2>
            <Button
                className='mt-4'
                onClick={() => window.location.assign(window.location.origin)}
            >
                Refresh
            </Button>
        </div>
    );
};
