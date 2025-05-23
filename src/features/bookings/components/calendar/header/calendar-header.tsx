import {
    Columns,
    Grid3x3,
    List,
    Plus,
    Grid2x2,
    CalendarRange,
} from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';

import type { Booking as IEvent } from '@/types/api';
import { TCalendarView } from '@/types/calendar';
import { TodayButton } from './today-button';
import { DateNavigator } from './date-navigator';
import { Link } from '@/components/ui/link';
import { UserSelect } from './user-select';
import { AddEventDialog } from '../dialogs/add-event-dialog';
import { cn } from '@/utils/cn';

interface IProps {
    view: TCalendarView;
    events: IEvent[];
}

export function CalendarHeader({ view, events }: IProps) {
    return (
        <div className='flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between'>
            <div className='flex items-center gap-3'>
                <TodayButton />
                <DateNavigator view={view} events={events} />
            </div>

            <div className='flex flex-col items-center gap-1.5 sm:flex-row sm:justify-between'>
                <div className='flex w-full items-center gap-1.5'>
                    <div className='inline-flex first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none'>
                        <Link
                            className={cn(
                                buttonVariants({
                                    variant: `${
                                        view === 'day' ? 'default' : 'outline'
                                    }`,
                                    size: 'icon',
                                }),
                                'rounded-r-none [&_svg]:size-5'
                            )}
                            to='/day-view'
                        >
                            <List strokeWidth={1.8} />
                        </Link>

                        <Link
                            className={cn(
                                buttonVariants({
                                    variant: `${
                                        view === 'day' ? 'default' : 'outline'
                                    }`,
                                    size: 'icon',
                                }),
                                'rounded-r-none [&_svg]:size-5'
                            )}
                            to='/week-view'
                        >
                            <Columns strokeWidth={1.8} />
                        </Link>

                        <Link
                            className={cn(
                                buttonVariants({
                                    variant: `${
                                        view === 'day' ? 'default' : 'outline'
                                    }`,
                                    size: 'icon',
                                }),
                                'rounded-r-none [&_svg]:size-5'
                            )}
                            to='/month-view'
                        >
                            <Grid2x2 strokeWidth={1.8} />
                        </Link>

                        <Link
                            className={cn(
                                buttonVariants({
                                    variant: `${
                                        view === 'day' ? 'default' : 'outline'
                                    }`,
                                    size: 'icon',
                                }),
                                'rounded-r-none [&_svg]:size-5'
                            )}
                            to='/year-view'
                        >
                            <Grid3x3 strokeWidth={1.8} />
                        </Link>

                        <Link
                            className={cn(
                                buttonVariants({
                                    variant: `${
                                        view === 'day' ? 'default' : 'outline'
                                    }`,
                                    size: 'icon',
                                }),
                                'rounded-r-none [&_svg]:size-5'
                            )}
                            to='/agenda-view'
                        >
                            <CalendarRange strokeWidth={1.8} />
                        </Link>
                    </div>

                    <UserSelect />
                </div>

                <AddEventDialog>
                    <Button className='w-full sm:w-auto'>
                        <Plus />
                        Add Event
                    </Button>
                </AddEventDialog>
            </div>
        </div>
    );
}
