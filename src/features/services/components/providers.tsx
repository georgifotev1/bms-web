import { H4, Muted } from '@/components/typography';
import { CheckboxField } from '@/components/ui/form-v1/checkbox-field';
import { User } from '@/types/api';
import { ServiceData } from '../api/create-service';
import { Control } from 'react-hook-form';

interface IServiceProvidersProps {
    isLoading?: boolean;
    users?: User[];
    control: Control<ServiceData>;
    initialValues: number[];
    error?: string;
}
export const ServiceProvidersSection = ({
    isLoading,
    users,
    control,
    initialValues,
    error,
}: IServiceProvidersProps) => {
    return (
        <aside className='flex flex-col items-start col-start-2 gap-4 sticky top-20 h-[calc(100vh-80px)]'>
            <div className='flex flex-col items-start gap-1 w-full'>
                <H4>Team</H4>
                <span>Who will provide this service?</span>
                {isLoading && <div>Loading users...</div>}
                {users?.map(user => (
                    <CheckboxField
                        key={user.id}
                        name='userIds'
                        control={control}
                        label={user.name}
                        value={user.id}
                        initialValues={initialValues}
                    />
                ))}
                {error && <Muted className='text-destructive'>{error}</Muted>}
            </div>
        </aside>
    );
};
