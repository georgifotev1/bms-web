import { H1, Lead } from '@/components/typography';
import { buttonVariants } from '@/components/ui/button';
import { env } from '@/config/env';
import { useTranslation } from 'react-i18next';

export const LandinRoute = () => {
    const { t } = useTranslation();
    return (
        <section className='bg-white dark:bg-gray-900'>
            <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12'>
                <H1 className='mb-4 font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
                    {t('landing.welcomeHeading')}
                </H1>
                <Lead className='mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400'>
                    {t('landing.welcomeDescription')}
                </Lead>
                <div className='flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4'>
                    <a
                        className={buttonVariants({ variant: 'default' })}
                        href={`http://app.${env.APP_URL}`}
                    >
                        {t('landing.getStarted')}
                    </a>
                </div>
            </div>
        </section>
    );
};
