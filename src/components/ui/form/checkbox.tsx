import { FieldValues } from 'react-hook-form';
import { Checkbox } from '../checkbox';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './form';
import { BaseFormFieldProps } from './form.interfaces';

export interface FormCheckboxProps<T extends FieldValues = FieldValues>
    extends BaseFormFieldProps<T> {
    className?: string;
}

export const FormCheckbox = <T extends FieldValues = FieldValues>({
    control,
    name,
    label,
    description,
    ...props
}: FormCheckboxProps<T>) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                    <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        {...props}
                    />
                </FormControl>
                <div className='space-y-1 leading-none'>
                    <FormLabel>{label}</FormLabel>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                </div>
                <FormMessage />
            </FormItem>
        )}
    />
);
