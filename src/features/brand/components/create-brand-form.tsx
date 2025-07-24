import { useNavigate } from 'react-router';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { createBrandInputSchema, useCreateBrand } from '../api/create-brand';
import { useQueryClient } from '@tanstack/react-query';
import { FormInput } from '@/components/ui/form/input';
import { Form } from '@/components/ui/form/form';
import { toast } from 'sonner';

export const CreateBrandForm = () => {
    const brand = useCreateBrand();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return (
        <div className='flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4'>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle className='text-2xl'>Brand Name</CardTitle>
                    <CardDescription>
                        Enter the name of your brand or company.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form
                        onSubmit={values => {
                            brand.mutate(values, {
                                onSuccess: async () => {
                                    await queryClient.invalidateQueries({
                                        queryKey: ['user'],
                                    });
                                    navigate(paths.app.root.path, {
                                        replace: true,
                                    });
                                },
                                onError: err => toast.error(err.message),
                            });
                        }}
                        schema={createBrandInputSchema}
                        options={{ defaultValues: { name: '' } }}
                    >
                        {({ control, formState: { isValid } }) => (
                            <>
                                <FormInput
                                    control={control}
                                    name='name'
                                    label='Company Name'
                                    type='text'
                                    placeholder='Crystal Nails'
                                />
                                <Button
                                    isLoading={brand.isPending}
                                    disabled={brand.isPending || !isValid}
                                    type='submit'
                                    className='w-full'
                                >
                                    Submit
                                </Button>
                            </>
                        )}
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};
