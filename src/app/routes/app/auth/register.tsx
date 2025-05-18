import { AuthLayout } from '@/components/layouts/auth';
import { RegisterForm } from '@/features/auth/components/register-form';

export const RegisterRoute = () => {
    return (
        <AuthLayout title='Register a new account'>
            <RegisterForm />
        </AuthLayout>
    );
};
