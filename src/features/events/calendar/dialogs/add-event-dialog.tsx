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
    eventFormSchema,
    useCreateEvent,
} from '@/features/events/api/create-events';
import { SelectField } from '@/components/ui/form/select-field';
import { useDashboardData } from '@/context/dashboard';
import { useBrandContext } from '@/context/brand';
import { TimePickerField } from '@/components/ui/form/time-picker-field';
import { createApiDateTime, getNextAvailableTimeSlot } from '../helpers';
import { Textarea } from '@/components/ui/form/textarea';
import { DatePickerFieldV2 } from '@/components/ui/form/date-picker-field-v2';

interface IProps {
    children: React.ReactNode;
    startDate?: Date;
    startTime?: string;
}

export function AddEventDialog(props: IProps) {
    const { users, customers, services } = useDashboardData();
    const event = useCreateEvent();
    const brand = useBrandContext();

    const [open, setOpen] = React.useState<boolean>(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{props.children}</DialogTrigger>

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
                    onSubmit={values => {
                        event.mutate(
                            {
                                customerId: values.customerId,
                                userId: values.userId,
                                serviceId: values.serviceId,
                                brandId: brand.id,
                                startTime: createApiDateTime(
                                    values.eventDate,
                                    values.startTime
                                ),
                                endTime: createApiDateTime(
                                    values.eventDate,
                                    values.endTime
                                ),
                                comment: values.comment ?? '',
                            },
                            {
                                onSuccess: () => setOpen(false),
                            }
                        );
                    }}
                    schema={eventFormSchema}
                >
                    {({ register, formState, watch }) => {
                        const startTimeValue = watch('startTime');
                        const selectedDate = watch('eventDate');
                        const serviceId = watch('serviceId');
                        const serviceDuration =
                            services.data?.find(
                                service => service.id === serviceId
                            )?.duration ?? 15;

                        return (
                            <>
                                <SelectField
                                    label='User'
                                    error={formState.errors['userId']}
                                    options={
                                        users.data?.map(user => ({
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
                                        customers?.data?.map(customer => ({
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
                                        services?.data?.map(service => ({
                                            label: service.title,
                                            value: service.id,
                                        })) ?? []
                                    }
                                    registration={register('serviceId')}
                                />

                                <div className='grid grid-cols-3 gap-2'>
                                    <DatePickerFieldV2
                                        label='Event Date'
                                        error={formState.errors['eventDate']}
                                        registration={register('eventDate')}
                                        disabledOptions={[
                                            { before: new Date() },
                                            {
                                                dayOfWeek:
                                                    brand.workingHours
                                                        .filter(
                                                            day => day.isClosed
                                                        )
                                                        .map(
                                                            day => day.dayOfWeek
                                                        ) ?? [],
                                            },
                                        ]}
                                    />
                                    <TimePickerField
                                        label='Start Time'
                                        error={formState.errors['startTime']}
                                        registration={register('startTime')}
                                        defaultValue={props.startTime}
                                        placeholder='Start time'
                                        startTime={'09:00'}
                                        endTime='18:00'
                                        interval={15}
                                        minTime={getNextAvailableTimeSlot(
                                            selectedDate
                                        )}
                                    />

                                    <TimePickerField
                                        label='End Time'
                                        error={formState.errors['endTime']}
                                        registration={register('endTime')}
                                        placeholder='End time'
                                        startTime='09:00'
                                        endTime='18:00'
                                        interval={serviceDuration}
                                        minTime={startTimeValue}
                                        startTimeRef={startTimeValue}
                                        isEndTimePicker
                                    />
                                </div>

                                <Textarea
                                    label='Leave a message'
                                    error={formState.errors['comment']}
                                    registration={register('comment')}
                                />
                            </>
                        );
                    }}
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
