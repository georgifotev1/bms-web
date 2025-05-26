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
import { useCalendar } from '@/features/bookings/calendar/context';
import { SelectField } from '@/components/ui/form/select-field';

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
                    id='event-form'
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                    schema={createBookingSchema}
                >
                    {({ register, formState }) => (
                        <>
                            <SelectField
                                label='User'
                                error={formState.errors['userId']}
                                options={users.map((user) => ({
                                    label: user.name,
                                    value: user.id,
                                }))}
                                registration={register('userId')}
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
