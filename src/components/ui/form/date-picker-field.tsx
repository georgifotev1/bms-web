import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Control, FieldValues, FieldPath } from 'react-hook-form';

import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';
import { FormControl, FormField, FormItem } from './form';

type DatePickerFieldProps<TFieldValues extends FieldValues = FieldValues> =
    FieldWrapperPassThroughProps & {
        className?: string;
        control: Control<TFieldValues>;
        name: FieldPath<TFieldValues>;
    };

export const DatePickerField = <TFieldValues extends FieldValues = FieldValues>(
    props: DatePickerFieldProps<TFieldValues>
) => {
    const { label, error, className, control, name } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <FieldWrapper label={label} error={error}>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Popover modal open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant='outline'
                                        className={cn(
                                            'text-left font-normal',
                                            !field.value &&
                                                'text-muted-foreground',
                                            className
                                        )}
                                        type='button'
                                        icon={
                                            <CalendarIcon className='mr-2 h-4 w-4' />
                                        }
                                    >
                                        {field.value ? (
                                            format(new Date(field.value), 'PPP')
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className='w-auto p-0'
                                    align='start'
                                >
                                    <Calendar
                                        mode='single'
                                        selected={field.value}
                                        onSelect={(date) => {
                                            field.onChange(date);
                                            if (date) setOpen(false);
                                        }}
                                        disabled={(date) => {
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);
                                            return date < today;
                                        }}
                                        defaultMonth={field.value}
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                    </FormItem>
                )}
            />
        </FieldWrapper>
    );
};
