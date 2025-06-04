import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/utils/cn';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';
import { add, parse, format } from 'date-fns';

type TimePickerFieldProps = FieldWrapperPassThroughProps & {
    className?: string;
    defaultValue?: string;
    placeholder?: string;
    startTime?: string; // Default: "00:00"
    endTime?: string; // Default: "23:45"
    interval?: number; // Default: 15 (minutes)
    minTime?: string; // Minimum selectable time (e.g., for end time based on start time)
    registration: Partial<UseFormRegisterReturn>;
    startTimeRef?: string;
    disabled?: boolean;
    isEndTimePicker?: boolean;
};

export const TimePickerField = (props: TimePickerFieldProps) => {
    const {
        label,
        error,
        className,
        defaultValue,
        placeholder = 'Select time',
        startTime = '00:00',
        endTime = '23:45',
        interval = 15,
        minTime,
        registration,
        startTimeRef,
        disabled,
        isEndTimePicker,
    } = props;
    const [selectedTime, setSelectedTime] = React.useState<string>(
        defaultValue || ''
    );

    const generateTimeOptions = React.useMemo(() => {
        const options: { label: string; value: string }[] = [];

        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);

        const startTotalMinutes = startHour * 60 + startMinute;
        const endTotalMinutes = endHour * 60 + endMinute;

        let minTotalMinutes = startTotalMinutes;
        if (minTime) {
            const [minHour, minMinute] = minTime.split(':').map(Number);
            let minMinutes = minHour * 60 + minMinute;
            if (isEndTimePicker) minMinutes += interval;

            minTotalMinutes = Math.max(minMinutes, startTotalMinutes);
        }

        for (
            let totalMinutes = Math.max(startTotalMinutes, minTotalMinutes);
            totalMinutes <= endTotalMinutes;
            totalMinutes += interval
        ) {
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            const timeString = `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}`;
            options.push({
                label: timeString,
                value: timeString,
            });
        }

        return options;
    }, [startTime, endTime, interval, minTime, isEndTimePicker]);

    const handleTimeChange = React.useCallback(
        (time: string) => {
            setSelectedTime(time);

            const syntheticEvent = {
                target: {
                    name: registration.name,
                    value: time,
                },
            } as React.ChangeEvent<HTMLInputElement>;

            if (registration.onChange) {
                registration.onChange(syntheticEvent);
            }
        },
        [registration]
    );

    React.useEffect(() => {
        if (!startTimeRef) return;
        const date = parse(startTimeRef, 'HH:mm', new Date());
        const newDate = add(date, { minutes: interval });
        const newTimeString = format(newDate, 'HH:mm');
        handleTimeChange(newTimeString);
    }, [startTimeRef, interval, handleTimeChange]);

    return (
        <FieldWrapper label={label} error={error}>
            <Select
                defaultValue={defaultValue}
                value={selectedTime}
                onValueChange={handleTimeChange}
                name={registration.name}
                disabled={disabled}
            >
                <SelectTrigger className={cn('w-full', className)}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {generateTimeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <input type='hidden' {...registration} value={selectedTime} />
        </FieldWrapper>
    );
};
