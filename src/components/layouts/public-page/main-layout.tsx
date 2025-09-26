import { BrandContext } from '@/context/brand';
import { useBrand } from '@/features/brand/api/get-brand';

export const PublicMainLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const brand = useBrand('public');
    if (!brand.data) {
        return <div>Brand not found or error loading brand.</div>;
    }

    return (
        <BrandContext.Provider value={brand.data}>
            {children}
        </BrandContext.Provider>
    );
};
