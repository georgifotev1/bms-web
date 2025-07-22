import { Link, useSearchParams, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { useLogin, loginInputSchema, LoginInput } from '@/lib/auth';
import { Form } from '@/components/ui/form/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/ui/form/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export const LoginForm = () => {
    const login = useLogin();
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirectTo');
    const navigate = useNavigate();
    const form = useForm<LoginInput>({
        resolver: zodResolver(loginInputSchema),
    });

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
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(values => {
                                login.mutate(values, {
                                    onSuccess: () =>
                                        navigate(
                                            redirectTo
                                                ? redirectTo
                                                : paths.app.root.path
                                        ),
                                });
                            })}
                            className='space-y-8'
                        >
                            <FormInput
                                control={form.control}
                                name='email'
                                label='Email'
                                type='email'
                                placeholder='Enter your email'
                            />
                            <FormInput
                                control={form.control}
                                name='password'
                                label='Password'
                                type='password'
                                placeholder='*******'
                            />
                            <Button type='submit' className='w-full'>
                                Login
                            </Button>
                        </form>
                    </Form>
                    <div className='mt-4 text-center text-sm'>
                        Don&apos;t have an account?{' '}
                        <Link
                            to={paths.app.auth.register.getHref(redirectTo)}
                            className='underline'
                        >
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
