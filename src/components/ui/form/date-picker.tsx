import { cn } from '@/utils/cn';
import { Button } from '../button';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './form';
import { BaseFormFieldProps } from './form.interfaces';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../calendar';
import { FieldValues } from 'react-hook-form';

export const FormDatePicker = <T extends FieldValues = FieldValues>({
    control,
    name,
    label,
    description,
}: BaseFormFieldProps<T>) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className='flex flex-col'>
                <FormLabel>{label}</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                                variant={'outline'}
                                className={cn(
                                    'w-[240px] pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground'
                                )}
                            >
                                {field.value ? (
                                    format(field.value, 'PPP')
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date =>
                                date > new Date() ||
                                date < new Date('1900-01-01')
                            }
                            captionLayout='dropdown'
                        />
                    </PopoverContent>
                </Popover>
                <FormDescription>{description}</FormDescription>
                <FormMessage />
            </FormItem>
        )}
    />
);
