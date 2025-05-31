import { isToday } from 'date-fns';

import { cn } from '@/utils/cn';

import type { Event as IEvent } from '@/types/api';
import { useCalendar } from '@/features/events/calendar/context';
import { useNavigate } from 'react-router';

interface IProps {
    day: number;
    date: Date;
    events: IEvent[];
}

export function YearViewDayCell({ day, date, events }: IProps) {
    const navigate = useNavigate();
    const { setSelectedDate } = useCalendar();

    const maxIndicators = 3;
    const eventCount = events.length;

    const handleClick = () => {
        setSelectedDate(date);
        navigate('/day-view');
    };

    return (
        <button
            onClick={handleClick}
            type='button'
            className='flex h-11 flex-1 flex-col items-center justify-start gap-0.5 rounded-md pt-1 hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
        >
            <div
                className={cn(
                    'flex size-6 items-center justify-center rounded-full text-xs font-medium',
                    isToday(date) &&
                        'bg-primary font-semibold text-primary-foreground'
                )}
            >
                {day}
            </div>

            {eventCount > 0 && (
                <div className='mt-0.5 flex gap-0.5'>
                    {eventCount <= maxIndicators ? (
                        events.map((event) => (
                            <div
                                key={event.id}
                                className={cn(
                                    'size-1.5 rounded-full',
                                    'bg-blue-600'
                                )}
                            />
                        ))
                    ) : (
                        <>
                            <div
                                className={cn(
                                    'size-1.5 rounded-full',
                                    'bg-blue-600'
                                )}
                            />
                            <span className='text-[7px] text-muted-foreground'>
                                +{eventCount - 1}
                            </span>
                        </>
                    )}
                </div>
            )}
        </button>
    );
}
