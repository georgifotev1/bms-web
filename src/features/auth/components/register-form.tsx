import { Link, useNavigate, useSearchParams } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { paths } from '@/config/paths';
import { registerInputSchema, useRegister } from '@/lib/auth';

export const RegisterForm = () => {
    const login = useRegister();
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirectTo');
    const navigate = useNavigate();

    return (
        <div>
            <Form
                onSubmit={(values) => {
                    login.mutate(values, {
                        onSuccess: () =>
                            navigate(redirectTo ? redirectTo : paths.app.root),
                    });
                }}
                schema={registerInputSchema}
            >
                {({ register, formState }) => (
                    <>
                        <Input
                            type='text'
                            label='Full Name'
                            error={formState.errors['username']}
                            registration={register('username')}
                        />
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
                                Submit
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
                        to={paths.app.auth.login.getHref(redirectTo)}
                        className='font-medium text-blue-600 hover:text-blue-500'
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};
