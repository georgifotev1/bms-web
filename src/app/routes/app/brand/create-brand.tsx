import { CreateBrandLayout } from '@/components/layouts/create-brand';
import { CreateBrandForm } from '@/features/brand/components/create-brand-form';

export const CreateBrandRoute = () => {
    return (
        <CreateBrandLayout>
            <CreateBrandForm />
        </CreateBrandLayout>
    );
};
