import { H4 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { ButtonLink } from '@/components/ui/link';
import { Spinner } from '@/components/ui/spinner/spinner';
import { ChevronLeft } from 'lucide-react';

export const FormDetailsHeader = ({
    title,
    disabled,
    isLoading,
    goBackTo,
}: {
    title: string;
    disabled: boolean;
    isLoading: boolean;
    goBackTo?: string;
}) => {
    return (
        <header className='h-14 sticky bg-background top-0 z-10 lg:px-10'>
            <div className='py-3 flex items-center justify-between px-4 lg:!px-0  border-b border-solid border-tertiary'>
                <div className='flex items-center gap-2'>
                    {goBackTo && (
                        <ButtonLink variant='ghost' size='icon' to={goBackTo}>
                            <ChevronLeft />
                        </ButtonLink>
                    )}
                    <H4>{title}</H4>
                </div>
                <Button
                    size='sm'
                    disabled={disabled || isLoading}
                    className='rounded-4xl'
                    type='submit'
                    icon={isLoading && <Spinner />}
                >
                    Save
                </Button>
            </div>
        </header>
    );
};
