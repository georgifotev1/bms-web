import { Switch } from '../switch';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from './form';
import { BaseFormFieldProps } from './form.interfaces';

export const FormSwitch = ({
    control,
    name,
    label,
    description,
}: BaseFormFieldProps) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                <div className='space-y-0.5'>
                    <FormLabel>{label}</FormLabel>
                    <FormDescription>{description}</FormDescription>
                </div>
                <FormControl>
                    <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
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
