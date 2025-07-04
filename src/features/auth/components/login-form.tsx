import { Link, useSearchParams, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { paths } from '@/config/paths';
import { useLogin, loginInputSchema } from '@/lib/auth';

export const LoginForm = () => {
    const login = useLogin();
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirectTo');
    const navigate = useNavigate();

    return (
        <div>
            <Form
                onSubmit={(values) => {
                    login.mutate(values, {
                        onSuccess: () =>
                            navigate(
                                redirectTo ? redirectTo : paths.app.root.path
                            ),
                    });
                }}
                schema={loginInputSchema}
            >
                {({ register, formState }) => (
                    <>
                        <Input
                            type='email'
                            label='Email Address'
                            error={formState.errors['email']}
                            registration={register('email')}
                        />
                        <Input
                            type='password'
                            label='Password'
                            error={formState.errors['password']}
                            registration={register('password')}
                        />
                        <div>
                            <Button
                                isLoading={login.isPending}
                                disabled={login.isPending}
                                type='submit'
                                className='w-full'
                            >
                                Log in
                            </Button>
                        </div>
                        {login.error && (
                            <div className='text-red-500 text-sm'>
                                {login.error.message}
                            </div>
                        )}
                    </>
                )}
            </Form>
            <div className='mt-2 flex items-center justify-end'>
                <div className='text-sm'>
                    <Link
                        to={paths.app.auth.register.getHref(redirectTo)}
                        className='font-medium text-blue-600 hover:text-blue-500'
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};
