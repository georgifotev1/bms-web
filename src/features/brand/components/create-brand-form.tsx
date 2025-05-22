import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { paths } from '@/config/paths';
import { createBrandInputSchema, useCreateBrand } from '../api/create-brand';
import { useQueryClient } from '@tanstack/react-query';

export const CreateBrandForm = () => {
    const brand = useCreateBrand();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return (
        <div>
            <Form
                onSubmit={(values) => {
                    brand.mutate(values, {
                        onSuccess: async () => {
                            await queryClient.invalidateQueries({
                                queryKey: ['user'],
                            });
                            navigate(paths.app.root, { replace: true });
                        },
                    });
                }}
                schema={createBrandInputSchema}
            >
                {({ register, formState }) => (
                    <>
                        <Input
                            type='text'
                            label='The name of your brand or company'
                            error={formState.errors['name']}
                            registration={register('name')}
                        />
                        <div>
                            <Button
                                isLoading={brand.isPending}
                                disabled={brand.isPending}
                                type='submit'
                                className='w-full'
                            >
                                Submit
                            </Button>
                        </div>
                        {brand.error && (
                            <div className='text-red-500 text-sm'>
                                {brand.error.message}
                            </div>
                        )}
                    </>
                )}
            </Form>
        </div>
    );
};
