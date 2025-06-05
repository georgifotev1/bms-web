import { AvatarComponent } from '@/components/ui/avatar';
import { User } from '@/types/api';

export const ServiceProviders = ({
    providers,
    users,
}: {
    providers: number[];
    users: User[] | undefined;
}) => {
    if (!users || users?.length == 0) return;
    return (
        <div className='flex gap-1'>
            {providers.map(provider => {
                const usr = users.find(user => user.id === provider);
                return usr ? <AvatarComponent key={usr.id} user={usr} /> : null;
            })}
        </div>
    );
};
