import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';

import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';
import { Matcher } from 'react-day-picker';

type DatePickerFieldProps = FieldWrapperPassThroughProps & {
    className?: string;
    defaultValue?: Date;
    placeholder?: string;
    dateFormat?: string;
    registration: Partial<UseFormRegisterReturn>;
    disabledOptions: Matcher | Matcher[] | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue: UseFormSetValue<any>;
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
        disabledOptions,
        setValue,
    } = props;

    const [selectedValue, setSelectedValue] = React.useState<Date | undefined>(
        defaultValue
    );
    const [isOpen, setIsOpen] = React.useState(false);

    const handleDateSelect = (selectedDate: Date) => {
        setSelectedValue(selectedDate);
        setIsOpen(false);
        if (registration.name) setValue(registration.name, selectedDate);
    };

    React.useEffect(() => {
        if (defaultValue && registration.name) {
            setValue(registration.name, defaultValue);
        }
    }, [defaultValue, setValue, registration.name]);

    return (
        <FieldWrapper label={label} error={error}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant='outline'
                        className={cn(
                            'justify-start text-left font-normal w-full',
                            !selectedValue && 'text-muted-foreground',
                            className
                        )}
                        type='button'
                        icon={<CalendarIcon />}
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
                        disabled={disabledOptions}
                    />
                </PopoverContent>
            </Popover>
        </FieldWrapper>
    );
};
