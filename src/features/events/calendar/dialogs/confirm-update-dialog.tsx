import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import * as React from 'react';
import {
    Dialog,
    DialogHeader,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog';

import type { Event as IEvent } from '@/types/api';
import { useUpdateEvent } from '../../api/update-events';

interface IProps {
    event: IEvent;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    newStartDate: Date;
    newEndDate: Date;
}

export function ConfirmEventUpdateDialog({
    event,
    open,
    setOpen,
    newStartDate,
    newEndDate,
}: IProps) {
    const updateEvent = useUpdateEvent(event.id);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent aria-describedby='Update event'>
                <DialogHeader>
                    <DialogTitle>Reschedule this appointment?</DialogTitle>
                </DialogHeader>

                <DialogDescription className='flex gap-2'>
                    <span>From:</span>
                    <span>{format(event.startTime, 'EEE, MMMM dd, yyyy')}</span>
                    <span>
                        {format(event.startTime, 'h:mm a')}
                        <span className='mx-0.5'>-</span>
                        {format(event.endTime, 'h:mm a')}
                    </span>
                </DialogDescription>

                <DialogDescription className='flex gap-2'>
                    <span>To:</span>
                    <span>{format(newStartDate, 'EEE, MMMM dd, yyyy')}</span>
                    <span>
                        {format(newStartDate, 'h:mm a')}
                        <span className='mx-0.5'>-</span>
                        {format(newEndDate, 'h:mm a')}
                    </span>
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type='button' variant='outline'>
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        onClick={() =>
                            updateEvent.mutate(
                                {
                                    customerId: event.customerId,
                                    userId: event.userId,
                                    serviceId: event.serviceId,
                                    brandId: event.brandId,
                                    startTime: newStartDate.toISOString(),
                                    endTime: newEndDate.toISOString(),
                                    comment: event.comment ?? '',
                                },
                                {
                                    onSuccess: () => setOpen(false),
                                }
                            )
                        }
                    >
                        Update Event
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
