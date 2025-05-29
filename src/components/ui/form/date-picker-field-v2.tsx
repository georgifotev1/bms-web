import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';

type DatePickerFieldProps = FieldWrapperPassThroughProps & {
    className?: string;
    defaultValue?: Date;
    placeholder?: string;
    dateFormat?: string;
    registration: Partial<UseFormRegisterReturn>;
};

export const DatePickerFieldV2 = (props: DatePickerFieldProps) => {
    const {
        label,
        error,
        className,
        defaultValue,
        placeholder = 'Pick a date',
        dateFormat = 'PPP',
        registration,
    } = props;

    const [selectedValue, setSelectedValue] = React.useState<Date | undefined>(
        defaultValue
    );
    const [isOpen, setIsOpen] = React.useState(false);

    const handleDateSelect = (selectedDate: Date) => {
        setSelectedValue(selectedDate);
        setIsOpen(false);

        const syntheticEvent = {
            target: {
                name: registration.name,
                value: selectedDate,
            },
        };

        if (registration.onChange) {
            registration.onChange(syntheticEvent);
        }
    };

    return (
        <FieldWrapper label={label} error={error}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant='outline'
                        className={cn(
                            'justify-start text-left font-normal',
                            !selectedValue && 'text-muted-foreground',
                            className
                        )}
                        type='button'
                        icon={<CalendarIcon className='mr-2 h-4 w-4' />}
                    >
                        {selectedValue ? (
                            format(selectedValue, dateFormat)
                        ) : (
                            <span>{placeholder}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                        mode='single'
                        required
                        selected={selectedValue}
                        onSelect={handleDateSelect}
                        defaultMonth={selectedValue}
                    />
                </PopoverContent>
            </Popover>
            <input
                type='hidden'
                {...registration}
                value={selectedValue ? selectedValue.toISOString() : ''}
            />
        </FieldWrapper>
    );
};
