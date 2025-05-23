import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

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

import { createBookingSchema } from '@/features/bookings/api/create-bookings';
import { useCalendar } from '@/features/bookings/context';
import { Select } from '@/components/ui/form/select';

interface IProps {
    children: React.ReactNode;
    startDate?: Date;
    startTime?: { hour: number; minute: number };
}

export function AddEventDialog({ children }: IProps) {
    const { users } = useCalendar();

    return (
        <Dialog>
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
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                    schema={createBookingSchema}
                >
                    {({ register, formState }) => (
                        <>
                            <Select
                                label='Customer'
                                error={formState.errors['customerId']}
                                options={users.map((user) => ({
                                    label: user.name,
                                    value: user.id,
                                }))}
                                registration={register('customerId')}
                            />
                            <Select
                                label='User'
                                error={formState.errors['userId']}
                                options={users.map((user) => ({
                                    label: user.name,
                                    value: user.id,
                                }))}
                                registration={register('userId')}
                            />
                            <Select
                                label='Service'
                                error={formState.errors['serviceId']}
                                options={users.map((user) => ({
                                    // TODO !!
                                    label: user.name,
                                    value: user.id,
                                }))}
                                registration={register('serviceId')}
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
