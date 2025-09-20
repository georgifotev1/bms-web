import { FieldValues } from 'react-hook-form';
import { Textarea } from '../textarea';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './form';

import { BaseFormFieldProps } from './form.interfaces';

export interface FormTextareaProps<T extends FieldValues = FieldValues>
    extends BaseFormFieldProps<T> {
    placeholder?: string;
    className?: string;
}

export const FormTextarea = <T extends FieldValues = FieldValues>({
    control,
    name,
    label,
    placeholder,
    description,
    ...props
}: FormTextareaProps<T>) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Textarea
                        className='resize-none'
                        placeholder={placeholder}
                        {...field}
                        {...props}
                    />
                </FormControl>
                {description && (
                    <FormDescription>{description}</FormDescription>
                )}
                <FormMessage />
            </FormItem>
        )}
    />
);
