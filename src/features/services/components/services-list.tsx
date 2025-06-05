import { useDashboardData } from '@/context/dashboard';
import { H3, SmallText, SmallTextMuted } from '@/components/typography';
import { LoadingScreen } from '@/components/ui/spinner/loading-screen';
import { AvatarComponent } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const ServicesList = () => {
    const { services, users, isLoading } = useDashboardData();
    if (isLoading) return <LoadingScreen />;
    if (!services.data) return;
    return (
        <section className='py-8'>
            <div className='container px-0 md:px-12'>
                <div className='flex justify-between'>
                    <H3>Services ({services.data.length})</H3>
                    <Button
                        size='icon'
                        className='rounded-full'
                        icon={<Plus />}
                    />
                </div>

                <div className='flex flex-col gap-2 mt-8'>
                    {services.data.map(service => (
                        <div
                            key={service.id}
                            className='flex items-center py-2 px-4 justify-between border rounded-md cursor-pointer hover:bg-accent/50'
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
                                <div className='flex gap-1'>
                                    {service.providers.map(provider => {
                                        const usr = users.data?.find(
                                            user => user.id === provider
                                        );
                                        return usr ? (
                                            <AvatarComponent user={usr} />
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
