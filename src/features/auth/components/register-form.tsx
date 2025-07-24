import { Link, useNavigate, useSearchParams } from 'react-router';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { registerInputSchema, useRegister } from '@/lib/auth';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/input';

export const RegisterForm = () => {
    const register = useRegister();
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirectTo');
    const navigate = useNavigate();

    return (
        <div className='flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4'>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle className='text-2xl'>Regiter</CardTitle>
                    <CardDescription>Register to the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form
                        onSubmit={values => {
                            register.mutate(values, {
                                onSuccess: () =>
                                    navigate(
                                        redirectTo
                                            ? redirectTo
                                            : paths.app.root.path
                                    ),
                                onError: err => toast.error(err.message),
                            });
                        }}
                        options={{
                            defaultValues: {
                                username: '',
                                email: '',
                                password: '',
                            },
                        }}
                        schema={registerInputSchema}
                    >
                        {({ control, formState: { isValid } }) => (
                            <>
                                <FormInput
                                    control={control}
                                    name='username'
                                    label='Full Name'
                                    type='text'
                                    placeholder='John Doe'
                                />
                                <FormInput
                                    control={control}
                                    name='email'
                                    label='Email'
                                    type='email'
                                    placeholder='johndoe@gmail.com'
                                />
                                <FormInput
                                    control={control}
                                    name='password'
                                    label='Password'
                                    type='password'
                                    placeholder='******'
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
                        Already have an account
                        <Link
                            to={paths.app.auth.login.getHref(redirectTo)}
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
