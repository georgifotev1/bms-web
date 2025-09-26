import { useBrandContext } from '@/context/brand';
import { useServices } from '@/features/services/api/get-service';
import { useUsers } from '@/features/users/api/get-users';

export const MainPage = () => {
    const brand = useBrandContext();
    const users = useUsers('public');
    const services = useServices('public');
    console.log(users.data);
    console.log(services.data);

    return <h1>Hello from {brand.name}</h1>;
};
