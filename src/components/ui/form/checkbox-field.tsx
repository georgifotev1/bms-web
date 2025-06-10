/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { cn } from '@/utils/cn'; // Adjust import path as needed
import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';
import { Checkbox } from '../checkbox';
import { Label } from './label';

export type CheckboxFieldProps = Omit<
    React.ComponentProps<typeof Checkbox>,
    'checked' | 'onCheckedChange'
> &
    FieldWrapperPassThroughProps & {
        className?: string;
        name: string;
        control: Control<any>;
        checkboxClassName?: string;
        value: any;
        initialValues?: any[];
    };

export const CheckboxField = ({
    className,
    label,
    error,
    name,
    control,
    checkboxClassName,
    disabled,
    value,
    initialValues = [],
    ...props
}: CheckboxFieldProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={initialValues}
            render={({ field, fieldState }) => {
                const currentValues: any[] = field.value || [];
                const isChecked = currentValues.includes(value);

                const handleCheckedChange = (checked: boolean) => {
                    let newValue: any[];

                    if (checked) {
                        if (currentValues.includes(value)) {
                            newValue = currentValues;
                        } else {
                            newValue = [...currentValues, value];
                        }
                    } else {
                        newValue = currentValues.filter(item => item !== value);
                    }

                    field.onChange(newValue);
                };

                return (
                    <FieldWrapper error={error}>
                        <div
                            className={cn(
                                'flex items-center space-x-3',
                                className
                            )}
                        >
                            <Checkbox
                                id={`${name}-${value}`}
                                checked={isChecked}
                                onCheckedChange={handleCheckedChange}
                                disabled={disabled}
                                className={cn(
                                    (error || fieldState.error) &&
                                        'ring-2 ring-destructive ring-offset-2',
                                    checkboxClassName
                                )}
                                {...props}
                            />
                            <Label
                                htmlFor={`${name}-${value}`}
                                className='text-sm font-normal'
                            >
                                {label}
                            </Label>
                        </div>
                    </FieldWrapper>
                );
            }}
        />
    );
};
