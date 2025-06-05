import { useDashboardData } from '@/context/dashboard';
import { H3, SmallText, SmallTextMuted } from '@/components/typography';
import { LoadingScreen } from '@/components/ui/spinner/loading-screen';
import { buttonVariants } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ServiceProviders } from './service-providers';
import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { cn } from '@/utils/cn';

export const ServicesList = () => {
    const { services, users, isLoading } = useDashboardData();
    if (isLoading) return <LoadingScreen />;
    if (!services.data) return;
    return (
        <section className='py-8'>
            <div className='container px-0 md:px-12'>
                <div className='flex justify-between'>
                    <H3>Services ({services.data.length})</H3>
                    <Link
                        to={paths.app.services.new}
                        className={cn(
                            buttonVariants({
                                variant: 'default',
                                size: 'icon',
                            }),
                            'rounded-full'
                        )}
                    >
                        <Plus />
                    </Link>
                </div>

                <div className='flex flex-col gap-2 mt-8'>
                    {services.data.map(service => (
                        <div
                            key={service.id}
                            className='flex items-center py-2 px-4 justify-between border rounded-sm cursor-pointer hover:bg-accent/50'
                        >
                            <div className='flex flex-col gap-2'>
                                <SmallText>{service.title}</SmallText>
                                <div className='flex gap-1'>
                                    <SmallTextMuted>
                                        {service.duration} min
                                    </SmallTextMuted>
                                    <SmallTextMuted>-</SmallTextMuted>
                                    <SmallTextMuted>
                                        ${service.cost}
                                    </SmallTextMuted>
                                </div>
                            </div>
                            <div>
                                <ServiceProviders
                                    providers={service.providers}
                                    users={users.data}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
