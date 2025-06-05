import { H1, Lead } from '@/components/typography';
import { ButtonLink } from '@/components/ui/link';

export const NotFoundRoute = () => {
    return (
        <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
            <div className='text-center'>
                <p className='text-base font-semibold text-primary'>404</p>
                <H1>Page not found</H1>
                <Lead className='mt-6 text-lg font-medium text-pretty'>
                    Sorry, we couldn’t find the page you’re looking for.
                </Lead>
                <div className='mt-10 flex items-center justify-center gap-x-6'>
                    <ButtonLink to={'/'}>Go back home</ButtonLink>
                </div>
            </div>
        </main>
    );
};
