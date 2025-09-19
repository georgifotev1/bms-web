import { FieldValues } from 'react-hook-form';
import { Switch } from '../switch';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from './form';
import { BaseFormFieldProps } from './form.interfaces';

export const FormSwitch = <T extends FieldValues = FieldValues>({
    control,
    name,
    label,
    description,
    defaultChecked,
}: BaseFormFieldProps<T>) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <div className='space-y-0.5'>
                    <FormLabel>{label}</FormLabel>
                    <FormDescription>{description}</FormDescription>
                </div>
                <FormControl>
                    <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        defaultChecked={defaultChecked}
                    />
                </FormControl>
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
