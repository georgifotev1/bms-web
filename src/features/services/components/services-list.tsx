import { useDashboardData } from '@/context/dashboard';
import { H3, SmallText, SmallTextMuted } from '@/components/typography';
import { LoadingScreen } from '@/components/ui/spinner/loading-screen';
import { Image, Plus } from 'lucide-react';
import { ProvidersAvatars } from './providers-avatars';
import { ButtonLink } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { useNavigate } from 'react-router';

export const ServicesList = () => {
    const { services, users, isLoading } = useDashboardData();
    const navigate = useNavigate();
    if (isLoading) return <LoadingScreen />;
    if (!services.data) return;
    return (
        <section className='py-8'>
            <div className='container px-0 md:px-12 mx-auto'>
                <div className='flex justify-between'>
                    <H3>Services ({services.data.length})</H3>
                    <ButtonLink
                        to={paths.app.services.new}
                        variant='default'
                        size='icon'
                    >
                        <Plus />
                    </ButtonLink>
                </div>

                <div className='flex flex-col gap-2 mt-8'>
                    {services.data.map(service => (
                        <div
                            key={service.id}
                            className='flex items-center gap-4 py-2 px-4 justify-between border rounded-sm cursor-pointer hover:bg-accent/50'
                            onClick={() => navigate(`/services/${service.id}`)}
                        >
                            {service.imageUrl ? (
                                <img
                                    src={service.imageUrl}
                                    width={50}
                                    alt={service.title}
                                    className='shrink-0 rounded-sm'
                                    loading='lazy'
                                />
                            ) : (
                                <div className='w-[50px] h-[50px] bg-accent flex items-center justify-center rounded-sm shrink-0'>
                                    <Image />
                                </div>
                            )}

                            <div className='flex flex-1 flex-col gap-2'>
                                <SmallText>{service.title}</SmallText>
                                <div className='flex gap-1'>
                                    <SmallTextMuted>
                                        {service.duration} min
                                    </SmallTextMuted>
                                    <SmallTextMuted>-</SmallTextMuted>
                                    <SmallTextMuted>
                                        $
                                        {service.cost != ''
                                            ? service.cost
                                            : '0'}
                                    </SmallTextMuted>
                                </div>
                            </div>
                            <div>
                                <ProvidersAvatars
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
