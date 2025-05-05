import { buttonVariants } from '@/components/ui/button';
import { env } from '@/config/env';

export const LandinRoute = () => {
    return (
        <section className='bg-white dark:bg-gray-900'>
            <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12'>
                <h1 className='mb-4 font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
                    Booking Management System
                </h1>
                <p className='mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400'>
                    Your all-in-one platform for seamless booking management.
                    Simplify scheduling, maximize efficiency, and enhance your
                    customer experience with our powerful booking solution.
                </p>
                <div className='flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4'>
                    <a
                        className={buttonVariants({ variant: 'default' })}
                        href={`http://app.${env.APP_URL}`}
                    >
                        Get started
                    </a>
                </div>
            </div>
        </section>
    );
};
