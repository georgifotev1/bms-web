import { H4 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { ButtonLink } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { ChevronLeft } from 'lucide-react';

export const NewServiceRoute = () => {
    return (
        <>
            <header className='h-14 sticky top-0 bg-canvas z-10 lg:px-10'>
                <div className='py-3 flex items-center justify-between border-b border-solid border-tertiary px-4 lg:!px-0'>
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
                    <Button size='sm' disabled className='rounded-4xl'>
                        Save
                    </Button>
                </div>
            </header>
        </>
    );
};
