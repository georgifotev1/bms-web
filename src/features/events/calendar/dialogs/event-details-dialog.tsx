import { format } from 'date-fns';
import { Banknote, Calendar, Clock, ClockPlus, Text, User } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import type { Event as IEvent } from '@/types/api';

interface IProps {
    event: IEvent;
    children: React.ReactNode;
}

export function EventDetailsDialog({ event, children }: IProps) {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>{children}</DialogTrigger>

                <DialogContent aria-describedby='service details'>
                    <DialogHeader>
                        <DialogTitle>{event.serviceName}</DialogTitle>
                    </DialogHeader>

                    <div className='space-y-4 grid grid-cols-2'>
                        <div className='flex items-start gap-2'>
                            <User className='mt-1 size-4 shrink-0' />
                            <div>
                                <p className='text-sm font-medium'>
                                    Responsible
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    {event.userName}
                                </p>
                            </div>
                        </div>

                        <div className='flex items-start gap-2'>
                            <User className='mt-1 size-4 shrink-0' />
                            <div>
                                <p className='text-sm font-medium'>Customer</p>
                                <p className='text-sm text-muted-foreground'>
                                    {event.customerName}
                                </p>
                            </div>
                        </div>

                        <div className='flex items-start gap-2'>
                            <Calendar className='mt-1 size-4 shrink-0' />
                            <div>
                                <p className='text-sm font-medium'>Date</p>
                                <p className='text-sm text-muted-foreground'>
                                    {format(
                                        event.startTime,
                                        'EEE, MMMM dd, yyyy'
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className='flex items-start gap-2'>
                            <Clock className='mt-1 size-4 shrink-0' />
                            <div>
                                <p className='text-sm font-medium'>Time</p>
                                <p className='text-sm text-muted-foreground flex gap-0.5'>
                                    {format(event.startTime, 'h:mm a')}
                                    <span>-</span>
                                    {format(event.endTime, 'h:mm a')}
                                </p>
                            </div>
                        </div>

                        {event.bufferTime && (
                            <div className='flex items-start gap-2'>
                                <ClockPlus className='mt-1 size-4 shrink-0' />
                                <div>
                                    <p className='text-sm font-medium'>
                                        Buffer Time
                                    </p>
                                    <p className='text-sm text-muted-foreground flex gap-0.5'>
                                        {event.bufferTime} minutes
                                    </p>
                                </div>
                            </div>
                        )}

                        {event.cost && (
                            <div className='flex items-start gap-2'>
                                <Banknote className='mt-1 size-4 shrink-0' />
                                <div>
                                    <p className='text-sm font-medium'>
                                        Total Price
                                    </p>
                                    <p className='text-sm text-muted-foreground flex gap-0.5'>
                                        {event.cost}
                                    </p>
                                </div>
                            </div>
                        )}

                        {event.comment && (
                            <div className='flex items-start gap-2'>
                                <Text className='mt-1 size-4 shrink-0' />
                                <div>
                                    <p className='text-sm font-medium'>
                                        Comment
                                    </p>
                                    <p className='text-sm text-muted-foreground'>
                                        {event.comment}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
