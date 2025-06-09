import { H4 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { ButtonLink } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { CreateServiceForm } from '@/features/services/components/create-service-form';
import { ChevronLeft } from 'lucide-react';

const CREATE_SERVICE_FORM_ID = 'create-service-form';
export const NewServiceRoute = () => {
    return (
        <div className='flex flex-col relative gap-6 max-w-[1140px] mx-auto'>
            <header className='h-14 sticky bg-background top-0 z-10 lg:px-10 border-b border-solid border-tertiary'>
                <div className='py-3 flex items-center justify-between px-4 lg:!px-0'>
                    <div className='flex items-center gap-2'>
                        <ButtonLink
                            variant='ghost'
                            size='icon'
                            to={paths.app.services.path}
                        >
                            <ChevronLeft />
                        </ButtonLink>
                        <H4>New Service</H4>
                    </div>
                    <Button
                        form={CREATE_SERVICE_FORM_ID}
                        size='sm'
                        className='rounded-4xl'
                        type='submit'
                    >
                        Save
                    </Button>
                </div>
            </header>
            <CreateServiceForm id={CREATE_SERVICE_FORM_ID} />
        </div>
    );
};
