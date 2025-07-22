import { FieldValues } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../select';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './form';
import { BaseFormFieldProps, FormSelectOption } from './form.interfaces';

export interface FormSelectProps<T extends FieldValues = FieldValues>
    extends BaseFormFieldProps<T> {
    placeholder?: string;
    type?: 'text' | 'email' | 'number' | 'password';
    className?: string;
    options: FormSelectOption[];
}

export const FormSelect = <T extends FieldValues = FieldValues>({
    control,
    name,
    label,
    placeholder,
    description,
    options = [],
    ...props
}: FormSelectProps<T>) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    {...props}
                >
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {options.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {description && (
                    <FormDescription>{description}</FormDescription>
                )}
                <FormMessage />
            </FormItem>
        )}
    />
);
