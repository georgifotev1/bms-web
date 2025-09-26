import { useBrandContext } from '@/context/brand';

export const MainPage = () => {
    const brand = useBrandContext();
    return <h1>Hello from {brand.name}</h1>;
};
