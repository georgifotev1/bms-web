import * as React from 'react';
import WorkingHours from './working-hours';
import { useBrandContext } from '@/context/brand';
import {
    useUpdateWorkingHours,
    workingHoursFormSchema,
} from '../api/update-brand';
import { Form } from '@/components/ui/form';
import { FormDetailsHeader } from '@/components/ui/form/details-header';

export const WorkingHoursForm = () => {
    const brand = useBrandContext();
    const updateWorkingHours = useUpdateWorkingHours(brand.id);

    const defaultWorkingHours = React.useMemo(() => {
        return brand.workingHours.sort((a, b) => {
            const dayOrder = [1, 2, 3, 4, 5, 6, 0];
            return (
                dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek)
            );
        });
    }, [brand.workingHours]);

    return (
        <Form
            onSubmit={values => updateWorkingHours.mutate(values)}
            schema={workingHoursFormSchema}
            className='w-full'
            options={{ defaultValues: { workingHours: defaultWorkingHours } }}
        >
            {({
                register,
                setValue,
                formState: { isDirty, isValid, isSubmitting },
            }) => {
                const isSubmitDisabled = !isDirty || !isValid || isSubmitting;

                return (
                    <div className='flex flex-col relative gap-6 max-w-[1140px] mx-auto'>
                        <FormDetailsHeader
                            title='Working Hours'
                            disabled={isSubmitDisabled}
                            isLoading={updateWorkingHours.isPending}
                        />
                        <WorkingHours
                            setValue={setValue}
                            registration={register('workingHours')}
                            defaultValue={defaultWorkingHours}
                        />
                    </div>
                );
            }}
        </Form>
    );
};
