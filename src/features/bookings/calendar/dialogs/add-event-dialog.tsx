import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import * as React from 'react';
import {
    Dialog,
    DialogHeader,
    DialogClose,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';

import {
    bookingFormSchema,
    useCreateBooking,
} from '@/features/bookings/api/create-bookings';
import { SelectField } from '@/components/ui/form/select-field';
import { useDashboardData } from '@/context/dashboard';
import { useBrandContext } from '@/context/brand';
import { TimePickerField } from '@/components/ui/form/time-picker-field';
import { createApiDateTime } from '../helpers';
import { Textarea } from '@/components/ui/form/textarea';
import { DatePickerField } from '@/components/ui/form/date-picker-field';

interface IProps {
    children: React.ReactNode;
    startDate?: Date;
    startTime?: { hour: number; minute: number };
}

export function AddEventDialog({ children }: IProps) {
    const { users, customers, services } = useDashboardData();
    const booking = useCreateBooking();
    const brand = useBrandContext();

    const [open, setOpen] = React.useState<boolean>(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                    <DialogDescription>
                        This is just and example of how to use the form. In a
                        real application, you would call the API to create the
                        event
                    </DialogDescription>
                </DialogHeader>

                <Form
                    id='event-form'
                    onSubmit={(values) => {
                        booking.mutate(
                            {
                                customerId: values.customerId,
                                userId: values.userId,
                                serviceId: values.serviceId,
                                brandId: brand.id,
                                startTime: createApiDateTime(
                                    values.bookingDate,
                                    values.startTime
                                ),
                                endTime: createApiDateTime(
                                    values.bookingDate,
                                    values.endTime
                                ),
                                comment: values.comment ?? '',
                            },
                            {
                                onSuccess: () => setOpen(false),
                            }
                        );
                    }}
                    schema={bookingFormSchema}
                >
                    {({ register, formState, control }) => (
                        <>
                            <SelectField
                                label='User'
                                error={formState.errors['userId']}
                                options={
                                    users.data?.map((user) => ({
                                        label: user.name,
                                        value: user.id,
                                    })) ?? []
                                }
                                registration={register('userId')}
                            />
                            <SelectField
                                label='Customer'
                                error={formState.errors['customerId']}
                                options={
                                    customers?.data?.map((customer) => ({
                                        label: customer.name,
                                        value: customer.id,
                                    })) ?? []
                                }
                                registration={register('customerId')}
                            />
                            <SelectField
                                label='Service'
                                error={formState.errors['serviceId']}
                                options={
                                    services?.data?.map((service) => ({
                                        label: service.title,
                                        value: service.id,
                                    })) ?? []
                                }
                                registration={register('serviceId')}
                            />
                            <DatePickerField
                                label='Booking Date'
                                error={formState.errors['bookingDate']}
                                control={control}
                                name='bookingDate'
                            />

                            <TimePickerField
                                label='Start Time'
                                error={formState.errors['startTime']}
                                registration={register('startTime')}
                                placeholder='Select start time'
                                startTime='09:00'
                                endTime='18:00'
                                interval={15}
                            />

                            <TimePickerField
                                label='End Time'
                                error={formState.errors['endTime']}
                                registration={register('endTime')}
                                placeholder='Select end time'
                                startTime='09:00'
                                endTime='18:00'
                                interval={15}
                            />
                            <Textarea
                                label='Leave a message'
                                error={formState.errors['comment']}
                                registration={register('comment')}
                            />
                        </>
                    )}
                </Form>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type='button' variant='outline'>
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button form='event-form' type='submit'>
                        Create Event
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
