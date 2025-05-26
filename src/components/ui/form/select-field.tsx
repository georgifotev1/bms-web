import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/utils/cn';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';

type Option = {
    label: React.ReactNode;
    value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
    options: Option[];
    className?: string;
    defaultValue?: string;
    placeholder?: string;
    registration: Partial<UseFormRegisterReturn>;
};

export const SelectField = (props: SelectFieldProps) => {
    const {
        label,
        options,
        error,
        className,
        defaultValue,
        placeholder = 'Select an option',
        registration,
    } = props;

    const [selectedValue, setSelectedValue] = React.useState<string>(
        defaultValue || ''
    );

    const handleValueChange = (value: string) => {
        setSelectedValue(value);

        const syntheticEvent = {
            target: {
                name: registration.name,
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>;

        if (registration.onChange) {
            registration.onChange(syntheticEvent);
        }
    };

    return (
        <FieldWrapper label={label} error={error}>
            <Select
                defaultValue={defaultValue}
                value={selectedValue}
                onValueChange={handleValueChange}
                name={registration.name}
            >
                <SelectTrigger className={cn('w-full', className)}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem
                            key={option.label?.toString()}
                            value={option.value.toString()}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <input type='hidden' {...registration} value={selectedValue} />
        </FieldWrapper>
    );
};
