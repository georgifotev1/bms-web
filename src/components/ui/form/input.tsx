import { Input } from '../input';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './form';
import { BaseFormFieldProps } from './form.interfaces';

export interface FormInputProps extends BaseFormFieldProps {
    placeholder?: string;
    type?: 'text' | 'email' | 'number' | 'password';
    className?: string;
}
export const FormInput = ({
    control,
    name,
    label,
    placeholder,
    description,
    type = 'text',
    className,
    ...props
}: FormInputProps) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input
                        type={type}
                        placeholder={placeholder}
                        className={className}
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

// Expample usage:

//               <FormInput
//                 control={form.control}
//                 name="email"
//                 label="Email"
//                 type="email"
//                 placeholder="Enter your email"
//                 description="We'll never share your email with anyone else."
//               />
