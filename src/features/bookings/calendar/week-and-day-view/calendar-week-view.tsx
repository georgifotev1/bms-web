import {
    startOfWeek,
    addDays,
    format,
    parseISO,
    isSameDay,
    areIntervalsOverlapping,
    isToday,
} from 'date-fns';

import { ScrollArea } from '@/components/ui/scroll-area';

import { cn } from '@/utils/cn';

import type { Booking as IEvent } from '@/types/api';
import { useCalendar } from '@/features/bookings/calendar/context';
import {
    formatTimeSlot,
    getEventBlockStyle,
    getVisibleHours,
    groupEvents,
    isWorkingHour,
} from '@/features/bookings/calendar/helpers';
import { WeekViewMultiDayEventsRow } from './week-view-multi-day-events-row';
import { AddEventDialog } from '../dialogs/add-event-dialog';
import { EventBlock } from './event-block';
import { CalendarTimeline } from './calendar-time-line';
import { DroppableTimeBlock } from '../dnd/droppable-time-block';

interface IProps {
    singleDayEvents: IEvent[];
    multiDayEvents: IEvent[];
}

export function CalendarWeekView({ singleDayEvents, multiDayEvents }: IProps) {
    const { selectedDate, workingHours, visibleHours } = useCalendar();

    const { hours, earliestEventHour, latestEventHour } = getVisibleHours(
        visibleHours,
        singleDayEvents
    );

    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    return (
        <>
            <div className='flex flex-col items-center justify-center border-b py-4 text-sm text-muted-foreground sm:hidden'>
                <p>Weekly view is not available on smaller devices.</p>
                <p>Please switch to daily or monthly view.</p>
            </div>

            <div className='hidden flex-col sm:flex'>
                <div>
                    <WeekViewMultiDayEventsRow
                        selectedDate={selectedDate}
                        multiDayEvents={multiDayEvents}
                    />

                    {/* Week header */}
                    <div className='relative z-20 flex border-b'>
                        <div className='w-18'></div>
                        <div className='grid flex-1 grid-cols-7 divide-x border-l'>
                            {weekDays.map((day, index) => {
                                const isDayToday = isToday(day);

                                return (
                                    <div
                                        key={index}
                                        className={cn(
                                            'py-2 text-center text-xs font-medium transition-colors relative',
                                            isDayToday
                                                ? 'bg-primary/10 text-primary border border-b-primary'
                                                : 'text-muted-foreground'
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                isDayToday && 'font-bold'
                                            )}
                                        >
                                            {format(day, 'EE')}
                                        </span>{' '}
                                        <span
                                            className={cn(
                                                'ml-1 font-semibold text-foreground'
                                            )}
                                        >
                                            {format(day, 'd')}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <ScrollArea className='h-[736px]' type='always'>
                    <div className='flex overflow-hidden'>
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

                        {/* Week grid */}
                        <div className='relative flex-1 border-l'>
                            <div className='grid grid-cols-7 divide-x'>
                                {weekDays.map((day, dayIndex) => {
                                    const dayEvents = singleDayEvents.filter(
                                        (event) =>
                                            isSameDay(
                                                parseISO(event.startTime),
                                                day
                                            ) ||
                                            isSameDay(
                                                parseISO(event.endTime),
                                                day
                                            )
                                    );
                                    const groupedEvents =
                                        groupEvents(dayEvents);

                                    return (
                                        <div
                                            key={dayIndex}
                                            className='relative'
                                        >
                                            {hours.map((hour, index) => {
                                                const isDisabled =
                                                    !isWorkingHour(
                                                        day,
                                                        hour,
                                                        workingHours
                                                    );

                                                return (
                                                    <div
                                                        key={hour}
                                                        className={cn(
                                                            'relative',
                                                            isDisabled &&
                                                                'bg-gray-100 cursor-not-allowed line-through pointer-events-none'
                                                        )}
                                                        style={{
                                                            height: '96px',
                                                        }}
                                                    >
                                                        {index !== 0 && (
                                                            <div className='pointer-events-none absolute inset-x-0 top-0 border-b'></div>
                                                        )}
                                                        <DroppableTimeBlock
                                                            date={day}
                                                            hour={hour}
                                                            minute={0}
                                                        >
                                                            <AddEventDialog
                                                                startDate={day}
                                                                startTime={{
                                                                    hour,
                                                                    minute: 0,
                                                                }}
                                                            >
                                                                <div
                                                                    className='absolute inset-x-0 top-0 h-[24px] cursor-pointer group'
                                                                    title={formatTimeSlot(
                                                                        hour,
                                                                        0
                                                                    )}
                                                                >
                                                                    <div className='absolute left-0 top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 text-xs font-medium text-primary bg-background px-1 py-0.5 rounded shadow-sm border border-primary'>
                                                                        {formatTimeSlot(
                                                                            hour,
                                                                            0
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </AddEventDialog>
                                                        </DroppableTimeBlock>
                                                        <DroppableTimeBlock
                                                            date={day}
                                                            hour={hour}
                                                            minute={15}
                                                        >
                                                            <AddEventDialog
                                                                startDate={day}
                                                                startTime={{
                                                                    hour,
                                                                    minute: 15,
                                                                }}
                                                            >
                                                                <div
                                                                    className='absolute inset-x-0 top-[24px] h-[24px] cursor-pointer group'
                                                                    title={formatTimeSlot(
                                                                        hour,
                                                                        15
                                                                    )}
                                                                >
                                                                    <div className='absolute left-0 top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 text-xs font-medium text-primary bg-background px-1 py-0.5 rounded shadow-sm border border-primary'>
                                                                        {formatTimeSlot(
                                                                            hour,
                                                                            15
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </AddEventDialog>
                                                        </DroppableTimeBlock>
                                                        <DroppableTimeBlock
                                                            date={day}
                                                            hour={hour}
                                                            minute={30}
                                                        >
                                                            <AddEventDialog
                                                                startDate={day}
                                                                startTime={{
                                                                    hour,
                                                                    minute: 30,
                                                                }}
                                                            >
                                                                <div
                                                                    className='absolute inset-x-0 top-[48px] h-[24px] cursor-pointer group'
                                                                    title={formatTimeSlot(
                                                                        hour,
                                                                        30
                                                                    )}
                                                                >
                                                                    <div className='absolute left-0 top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 text-xs font-medium text-primary bg-background px-1 py-0.5 rounded shadow-sm border border-primary'>
                                                                        {formatTimeSlot(
                                                                            hour,
                                                                            30
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </AddEventDialog>
                                                        </DroppableTimeBlock>
                                                        <DroppableTimeBlock
                                                            date={day}
                                                            hour={hour}
                                                            minute={45}
                                                        >
                                                            <AddEventDialog
                                                                startDate={day}
                                                                startTime={{
                                                                    hour,
                                                                    minute: 45,
                                                                }}
                                                            >
                                                                <div
                                                                    className='absolute inset-x-0 top-[72px] h-[24px] cursor-pointer group'
                                                                    title={formatTimeSlot(
                                                                        hour,
                                                                        45
                                                                    )}
                                                                >
                                                                    <div className='absolute left-0 top-0 right-0 opacity-0 group-hover:opacity-100 text-xs font-medium text-primary bg-background px-1 py-0.5 rounded shadow-sm border border-primary'>
                                                                        {formatTimeSlot(
                                                                            hour,
                                                                            45
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </AddEventDialog>
                                                        </DroppableTimeBlock>
                                                    </div>
                                                );
                                            })}

                                            {groupedEvents.map(
                                                (group, groupIndex) =>
                                                    group.map((event) => {
                                                        let style =
                                                            getEventBlockStyle(
                                                                event,
                                                                day,
                                                                groupIndex,
                                                                groupedEvents.length,
                                                                {
                                                                    from: earliestEventHour,
                                                                    to: latestEventHour,
                                                                }
                                                            );
                                                        const hasOverlap =
                                                            groupedEvents.some(
                                                                (
                                                                    otherGroup,
                                                                    otherIndex
                                                                ) =>
                                                                    otherIndex !==
                                                                        groupIndex &&
                                                                    otherGroup.some(
                                                                        (
                                                                            otherEvent
                                                                        ) =>
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
                                                                <EventBlock
                                                                    event={
                                                                        event
                                                                    }
                                                                />
                                                            </div>
                                                        );
                                                    })
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <CalendarTimeline
                                firstVisibleHour={earliestEventHour}
                                lastVisibleHour={latestEventHour}
                            />
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </>
    );
}
