import { Muted } from '@/components/typography';
import { Label } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import { WorkingHour } from '../api/update-brand';
import * as React from 'react';

interface WorkingHoursProps {
    registration: Partial<UseFormRegisterReturn>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue: UseFormSetValue<any>;
    defaultValue: WorkingHour[];
}
const WorkingHours = ({
    registration,
    setValue,
    defaultValue,
}: WorkingHoursProps) => {
    const [workingHours, setWorkingHours] = React.useState(defaultValue);

    React.useEffect(() => {
        if (registration.name) {
            setValue(registration.name, workingHours);
        }
    }, [workingHours, registration.name, setValue]);

    const handleTimeChange = (
        dayOfWeek: number,
        field: 'openTime' | 'closeTime',
        value: string
    ) => {
        updateWorkingHour(dayOfWeek, { [field]: value });
    };
    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const getDayName = (dayNumber: number) => dayNames[dayNumber];

    const updateWorkingHour = (
        dayOfWeek: number,
        updates: Partial<WorkingHour>
    ) => {
        setWorkingHours(prev =>
            prev.map(day =>
                day.dayOfWeek === dayOfWeek ? { ...day, ...updates } : day
            )
        );
    };

    const handleSwitchChange = (dayOfWeek: number, isOpen: boolean) => {
        updateWorkingHour(dayOfWeek, {
            isClosed: !isOpen,
            openTime: isOpen ? '09:00' : undefined,
            closeTime: isOpen ? '18:00' : undefined,
        });
    };
    return (
        <div className='border-t border-solid border-tertiary py-6 space-y-6'>
            <div className='mb-6'>
                <Label className='font-bold mb-1'>Working hours</Label>
                <Muted>
                    Highlight when your business opens and closes on your
                    Booking Page.
                </Muted>
            </div>
            {workingHours.map(day => (
                <div
                    className='grid grid-cols-4 gap-4 items-center'
                    key={day.dayOfWeek}
                >
                    <div className='flex items-center gap-2'>
                        <Switch
                            id={`${day.dayOfWeek}`}
                            onCheckedChange={checked =>
                                handleSwitchChange(day.dayOfWeek, checked)
                            }
                            defaultChecked={!day.isClosed}
                        />
                        <Label htmlFor={`${day.dayOfWeek}`}>
                            {getDayName(day.dayOfWeek)}
                        </Label>
                    </div>
                    <Input
                        type='time'
                        onChange={e =>
                            handleTimeChange(
                                day.dayOfWeek,
                                'openTime',
                                e.target.value
                            )
                        }
                        defaultValue={day.isClosed ? '' : '09:00'}
                        disabled={day.isClosed}
                        className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
                    />
                    <Input
                        type='time'
                        onChange={e =>
                            handleTimeChange(
                                day.dayOfWeek,
                                'closeTime',
                                e.target.value
                            )
                        }
                        defaultValue={day.isClosed ? '' : '18:00'}
                        disabled={day.isClosed}
                        className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
                    />
                </div>
            ))}
        </div>
    );
};

export default WorkingHours;
