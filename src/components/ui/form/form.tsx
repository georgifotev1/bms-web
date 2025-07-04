import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
    Controller,
    FormProvider,
    SubmitHandler,
    useForm,
    useFormContext,
    UseFormProps,
    UseFormReturn,
    useFormState,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { cn } from '@/utils/cn';
import { Label } from '@/components/ui/form/label';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
);

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
};

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);
    const { getFieldState } = useFormContext();
    const formState = useFormState({ name: fieldContext.name });
    const fieldState = getFieldState(fieldContext.name, formState);

    if (!fieldContext) {
        throw new Error('useFormField should be used within <FormField>');
    }

    const { id } = itemContext;

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    };
};

type FormItemContextValue = {
    id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
    {} as FormItemContextValue
);

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
    const id = React.useId();

    return (
        <FormItemContext.Provider value={{ id }}>
            <div
                data-slot='form-item'
                className={cn('grid gap-2', className)}
                {...props}
            />
        </FormItemContext.Provider>
    );
}

function FormLabel({
    className,
    ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
    const { error, formItemId } = useFormField();

    return (
        <Label
            data-slot='form-label'
            data-error={!!error}
            className={cn('data-[error=true]:text-destructive', className)}
            htmlFor={formItemId}
            {...props}
        />
    );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
    const { error, formItemId, formDescriptionId, formMessageId } =
        useFormField();

    return (
        <Slot
            data-slot='form-control'
            id={formItemId}
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            {...props}
        />
    );
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
    const { formDescriptionId } = useFormField();

    return (
        <p
            data-slot='form-description'
            id={formDescriptionId}
            className={cn('text-muted-foreground text-sm', className)}
            {...props}
        />
    );
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message ?? '') : props.children;

    if (!body) {
        return null;
    }

    return (
        <p
            data-slot='form-message'
            id={formMessageId}
            className={cn('text-destructive text-sm', className)}
            {...props}
        >
            {body}
        </p>
    );
}

type FormProps<TFormValues extends FieldValues, Schema> = {
    onSubmit: SubmitHandler<TFormValues>;
    schema: Schema;
    className?: string;
    children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
    options?: UseFormProps<TFormValues>;
    id?: string;
    hasFiles?: boolean;
};

const Form = <
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Schema extends ZodType<any, any, any>,
    TFormValues extends FieldValues = z.infer<Schema>,
>({
    onSubmit,
    children,
    className,
    options,
    id,
    schema,
    hasFiles,
}: FormProps<TFormValues, Schema>) => {
    const form = useForm({
        ...options,
        resolver: zodResolver(schema),
    });
    return (
        <FormProvider {...form}>
            <form
                className={cn('space-y-6', className)}
                onSubmit={form.handleSubmit(onSubmit)}
                id={id}
                encType={hasFiles ? 'multipart/form-data' : undefined}
            >
                {children(form)}
            </form>
        </FormProvider>
    );
};

export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
};
