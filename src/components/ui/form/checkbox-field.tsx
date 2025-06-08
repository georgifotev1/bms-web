/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import { cn } from '@/utils/cn'; // Adjust import path as needed

import { Switch } from '@/components/ui/switch'; // Adjust import path
import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';
import { Checkbox } from '../checkbox';
import { Label } from './label';

export type CheckboxFieldProps = Omit<
    React.ComponentProps<typeof Switch>,
    'checked' | 'onCheckedChange'
> &
    FieldWrapperPassThroughProps & {
        className?: string;
        registration: Partial<UseFormRegisterReturn>;
        checkboxClassName?: string;
        value: any;
        setValue: UseFormSetValue<any>;
        currentValues: any[];
    };

export const CheckboxField = ({
    className,
    label,
    error,
    registration,
    checkboxClassName,
    disabled,
    value,
    setValue,
    currentValues,
    ...props
}: CheckboxFieldProps) => {
    const isChecked = currentValues?.includes(value) || false;
    const handleCheckedChange = (checked: boolean) => {
        if (!registration.name) return;

        let newValue: any[];

        if (checked) {
            newValue = currentValues ? [...currentValues, value] : [value];
        } else {
            newValue = currentValues
                ? currentValues.filter(item => item !== value)
                : [];
        }
        setValue(registration.name, newValue, { shouldValidate: true });
    };

    return (
        <FieldWrapper error={error}>
            <div className={cn('flex items-center space-x-3', className)}>
                <Checkbox
                    id={label}
                    checked={isChecked}
                    onCheckedChange={handleCheckedChange}
                    disabled={disabled}
                    className={cn(
                        error && 'ring-2 ring-destructive ring-offset-2',
                        checkboxClassName
                    )}
                    {...props}
                />
                <Label htmlFor={label} className='text-sm font-normal'>
                    {label}
                </Label>
            </div>
        </FieldWrapper>
    );
};
