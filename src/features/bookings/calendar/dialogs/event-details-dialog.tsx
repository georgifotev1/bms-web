'use client';

import { format, parseISO } from 'date-fns';
import { Calendar, Clock, Text, User } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import type { Booking as IEvent } from '@/types/api';

interface IProps {
    event: IEvent;
    children: React.ReactNode;
}

export function EventDetailsDialog({ event, children }: IProps) {
    const startDate = parseISO(event.startTime);
    const endDate = parseISO(event.endTime);

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>{children}</DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{event.serviceName}</DialogTitle>
                    </DialogHeader>

                    <div className='space-y-4'>
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
                            <Calendar className='mt-1 size-4 shrink-0' />
                            <div>
                                <p className='text-sm font-medium'>
                                    Start Date
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    {format(startDate, 'MMM d, yyyy h:mm a')}
                                </p>
                            </div>
                        </div>

                        <div className='flex items-start gap-2'>
                            <Clock className='mt-1 size-4 shrink-0' />
                            <div>
                                <p className='text-sm font-medium'>End Date</p>
                                <p className='text-sm text-muted-foreground'>
                                    {format(endDate, 'MMM d, yyyy h:mm a')}
                                </p>
                            </div>
                        </div>
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
