import { Link, useSearchParams, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { useLogin, loginInputSchema } from '@/lib/auth';
import { Form } from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';

export const LoginForm = () => {
    const login = useLogin();
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirectTo');
    const navigate = useNavigate();

    return (
        <div className='flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4'>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle className='text-2xl'>Login</CardTitle>
                    <CardDescription>
                        Enter your email and password to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form
                        onSubmit={values => {
                            login.mutate(values, {
                                onSuccess: () =>
                                    navigate(
                                        redirectTo
                                            ? redirectTo
                                            : paths.app.root.path
                                    ),
                                onError: () => {
                                    toast.error('Invalid credentials!');
                                },
                            });
                        }}
                        schema={loginInputSchema}
                        options={{ defaultValues: { email: '', password: '' } }}
                    >
                        {({ control, formState: { isValid } }) => (
                            <>
                                <FormInput
                                    control={control}
                                    name='email'
                                    label='Email'
                                    type='email'
                                    placeholder='Enter your email'
                                />
                                <FormInput
                                    control={control}
                                    name='password'
                                    label='Password'
                                    type='password'
                                    placeholder='*******'
                                />
                                <Button
                                    disabled={!isValid}
                                    type='submit'
                                    className='w-full'
                                >
                                    Login
                                </Button>
                            </>
                        )}
                    </Form>
                    <div className='mt-4 text-center text-sm'>
                        Don&apos;t have an account?
                        <Link
                            to={paths.app.auth.register.getHref(redirectTo)}
                            className='underline ml-1'
                        >
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
