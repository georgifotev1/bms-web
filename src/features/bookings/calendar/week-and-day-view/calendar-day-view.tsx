import { Clock, User } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { parseISO, areIntervalsOverlapping, format } from 'date-fns';

import type { Booking as IEvent } from '@/types/api';
import { useCalendar } from '@/features/bookings/calendar/context';
import {
    formatTimeSlot,
    getCurrentEvents,
    getEventBlockStyle,
    getVisibleHours,
    groupEvents,
    isWorkingHour,
} from '@/features/bookings/calendar/helpers';
import { DayViewMultiDayEventsRow } from './day-view-multi-day-events-row';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AddEventDialog } from '../dialogs/add-event-dialog';
import { EventBlock } from './event-block';
import { CalendarTimeline } from './calendar-time-line';
import { cn } from '@/utils/cn';

interface IProps {
    singleDayEvents: IEvent[];
    multiDayEvents: IEvent[];
}

export function CalendarDayView({ singleDayEvents, multiDayEvents }: IProps) {
    const { selectedDate, setSelectedDate, users, visibleHours, workingHours } =
        useCalendar();

    const { hours, earliestEventHour, latestEventHour } = getVisibleHours(
        visibleHours,
        singleDayEvents
    );

    const currentEvents = getCurrentEvents(singleDayEvents);

    const dayEvents = singleDayEvents.filter((event) => {
        const eventDate = parseISO(event.startTime);
        return (
            eventDate.getDate() === selectedDate.getDate() &&
            eventDate.getMonth() === selectedDate.getMonth() &&
            eventDate.getFullYear() === selectedDate.getFullYear()
        );
    });

    const groupedEvents = groupEvents(dayEvents);

    return (
        <div className='flex'>
            <div className='flex flex-1 flex-col'>
                <div>
                    <DayViewMultiDayEventsRow
                        selectedDate={selectedDate}
                        multiDayEvents={multiDayEvents}
                    />

                    {/* Day header */}
                    <div className='relative z-20 flex border-b'>
                        <div className='w-18'></div>
                        <span className='flex-1 border-l py-2 text-center text-xs font-medium text-muted-foreground'>
                            {format(selectedDate, 'EE')}{' '}
                            <span className='font-semibold text-foreground'>
                                {format(selectedDate, 'd')}
                            </span>
                        </span>
                    </div>
                </div>

                <ScrollArea className='h-[800px]' type='always'>
                    <div className='flex'>
                        {/* Hours column */}
                        <div className='relative w-18'>
                            {hours.map((hour, index) => (
                                <div
                                    key={hour}
                                    className='relative'
                                    style={{ height: '96px' }}
                                >
                                    <div className='absolute -top-3 right-2 flex h-6 items-center'>
                                        {index !== 0 && (
                                            <span className='text-xs text-muted-foreground'>
                                                {format(
                                                    new Date().setHours(hour),
                                                    'HH:00'
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Day grid */}
                        <div className='relative flex-1 border-l'>
                            <div className='relative'>
                                {hours.map((hour, index) => {
                                    const isDisabled = !isWorkingHour(
                                        selectedDate,
                                        hour,
                                        workingHours
                                    );

                                    return (
                                        <div
                                            key={hour}
                                            className={cn(
                                                'relative',
                                                isDisabled &&
                                                    'bg-calendar-disabled-hour'
                                            )}
                                            style={{ height: '96px' }}
                                        >
                                            {index !== 0 && (
                                                <div className='pointer-events-none absolute inset-x-0 top-0 border-b'></div>
                                            )}

                                            <AddEventDialog
                                                startDate={selectedDate}
                                                startTime={{
                                                    hour,
                                                    minute: 0,
                                                }}
                                            >
                                                <div className='absolute inset-x-0 top-0 h-[24px] cursor-pointer group'>
                                                    <div className='absolute left-0 top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 text-xs font-medium text-primary bg-background px-1 py-0.5 rounded shadow-sm border border-primary'>
                                                        {formatTimeSlot(
                                                            hour,
                                                            0
                                                        )}
                                                    </div>
                                                </div>
                                            </AddEventDialog>

                                            <AddEventDialog
                                                startDate={selectedDate}
                                                startTime={{
                                                    hour,
                                                    minute: 15,
                                                }}
                                            >
                                                <div className='absolute inset-x-0 top-[24px] h-[24px] cursor-pointer group'>
                                                    <div className='absolute left-0 top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 text-xs font-medium text-primary bg-background px-1 py-0.5 rounded shadow-sm border border-primary'>
                                                        {formatTimeSlot(
                                                            hour,
                                                            15
                                                        )}
                                                    </div>
                                                </div>
                                            </AddEventDialog>

                                            <AddEventDialog
                                                startDate={selectedDate}
                                                startTime={{
                                                    hour,
                                                    minute: 30,
                                                }}
                                            >
                                                <div className='absolute inset-x-0 top-[48px] h-[24px] cursor-pointer group'>
                                                    <div className='absolute left-0 top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 text-xs font-medium text-primary bg-background px-1 py-0.5 rounded shadow-sm border border-primary'>
                                                        {formatTimeSlot(
                                                            hour,
                                                            30
                                                        )}
                                                    </div>
                                                </div>
                                            </AddEventDialog>

                                            <AddEventDialog
                                                startDate={selectedDate}
                                                startTime={{
                                                    hour,
                                                    minute: 45,
                                                }}
                                            >
                                                <div className='absolute inset-x-0 top-[72px] h-[24px] cursor-pointer group'>
                                                    <div className='absolute left-0 top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 text-xs font-medium text-primary bg-background px-1 py-0.5 rounded shadow-sm border border-primary'>
                                                        {formatTimeSlot(
                                                            hour,
                                                            45
                                                        )}
                                                    </div>
                                                </div>
                                            </AddEventDialog>
                                        </div>
                                    );
                                })}

                                {groupedEvents.map((group, groupIndex) =>
                                    group.map((event) => {
                                        let style = getEventBlockStyle(
                                            event,
                                            selectedDate,
                                            groupIndex,
                                            groupedEvents.length,
                                            {
                                                from: earliestEventHour,
                                                to: latestEventHour,
                                            }
                                        );
                                        const hasOverlap = groupedEvents.some(
                                            (otherGroup, otherIndex) =>
                                                otherIndex !== groupIndex &&
                                                otherGroup.some((otherEvent) =>
                                                    areIntervalsOverlapping(
                                                        {
                                                            start: parseISO(
                                                                event.startTime
                                                            ),
                                                            end: parseISO(
                                                                event.endTime
                                                            ),
                                                        },
                                                        {
                                                            start: parseISO(
                                                                otherEvent.startTime
                                                            ),
                                                            end: parseISO(
                                                                otherEvent.endTime
                                                            ),
                                                        }
                                                    )
                                                )
                                        );

                                        if (!hasOverlap)
                                            style = {
                                                ...style,
                                                width: '100%',
                                                left: '0%',
                                            };

                                        return (
                                            <div
                                                key={event.id}
                                                className='absolute p-1'
                                                style={style}
                                            >
                                                <EventBlock event={event} />
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            <CalendarTimeline
                                firstVisibleHour={earliestEventHour}
                                lastVisibleHour={latestEventHour}
                            />
                        </div>
                    </div>
                </ScrollArea>
            </div>

            <div className='hidden w-64 divide-y border-l md:block'>
                <Calendar
                    className='mx-auto w-fit px-0'
                    mode='single'
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                />

                <div className='flex-1 space-y-3'>
                    {currentEvents.length > 0 ? (
                        <div className='flex items-start gap-2 px-4 pt-4'>
                            <span className='relative mt-[5px] flex size-2.5'>
                                <span className='absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75'></span>
                                <span className='relative inline-flex size-2.5 rounded-full bg-green-600'></span>
                            </span>

                            <p className='text-sm font-semibold text-foreground'>
                                Happening now
                            </p>
                        </div>
                    ) : (
                        <p className='p-4 text-center text-sm italic text-muted-foreground'>
                            No appointments or consultations at the moment
                        </p>
                    )}

                    {currentEvents.length > 0 && (
                        <ScrollArea className='h-[422px] px-4' type='always'>
                            <div className='space-y-6 pb-4'>
                                {currentEvents.map((event) => {
                                    const user = users.find(
                                        (user) => user.id === event.userId
                                    );

                                    return (
                                        <div
                                            key={event.id}
                                            className='space-y-1.5'
                                        >
                                            <p className='line-clamp-2 text-sm font-semibold'>
                                                {event.serviceName}
                                            </p>

                                            {user && (
                                                <div className='flex items-center gap-1.5 text-muted-foreground'>
                                                    <User className='size-3.5' />
                                                    <span className='text-sm'>
                                                        {user.name}
                                                    </span>
                                                </div>
                                            )}

                                            <div className='flex items-center gap-1.5 text-muted-foreground'>
                                                <Calendar className='size-3.5' />
                                                <span className='text-sm'>
                                                    {format(
                                                        new Date(),
                                                        'MMM d, yyyy'
                                                    )}
                                                </span>
                                            </div>

                                            <div className='flex items-center gap-1.5 text-muted-foreground'>
                                                <Clock className='size-3.5' />
                                                <span className='text-sm'>
                                                    {format(
                                                        parseISO(
                                                            event.startTime
                                                        ),
                                                        'h:mm a'
                                                    )}{' '}
                                                    -{' '}
                                                    {format(
                                                        parseISO(event.endTime),
                                                        'h:mm a'
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    )}
                </div>
            </div>
        </div>
    );
}
