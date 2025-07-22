import * as React from 'react';

import { cn } from '@/utils/cn';
import { type UseFormRegisterReturn } from 'react-hook-form';
import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    FieldWrapperPassThroughProps & {
        className?: string;
        registration: Partial<UseFormRegisterReturn>;
    };

function Textarea({
    className,
    label,
    error,
    registration,
    ...props
}: TextareaProps) {
    return (
        <FieldWrapper label={label} error={error}>
            <textarea
                className={cn(
                    'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                {...registration}
                {...props}
            />
        </FieldWrapper>
    );
}

export { Textarea };
