import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/utils/cn'; // Adjust import path as needed

import { Switch } from '@/components/ui/switch'; // Adjust import path
import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';

export type SwitchFieldProps = Omit<
    React.ComponentProps<typeof Switch>,
    'checked' | 'onCheckedChange'
> &
    FieldWrapperPassThroughProps & {
        className?: string;
        registration: Partial<UseFormRegisterReturn>;
        switchClassName?: string;
    };

function SwitchField({
    className,
    label,
    error,
    registration,
    switchClassName,
    disabled,
    ...props
}: SwitchFieldProps) {
    const switchId = React.useId();
    const [isChecked, setIsChecked] = React.useState(
        props.defaultChecked || false
    );

    const handleCheckedChange = (checked: boolean) => {
        setIsChecked(checked);

        const syntheticEvent = {
            target: {
                name: registration.name,
                checked,
                value: checked,
                type: 'checkbox',
            },
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        registration.onChange?.(syntheticEvent);
    };

    return (
        <FieldWrapper label={label} error={error}>
            <div className={cn('flex items-start space-x-3', className)}>
                <Switch
                    id={switchId}
                    checked={isChecked}
                    onCheckedChange={handleCheckedChange}
                    disabled={disabled}
                    className={cn(
                        error && 'ring-2 ring-destructive ring-offset-2',
                        switchClassName
                    )}
                    {...props}
                />
            </div>
        </FieldWrapper>
    );
}

export { SwitchField };
