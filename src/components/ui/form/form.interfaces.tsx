import {
    Control,
    FieldPath,
    FieldValues,
    SubmitHandler,
    UseFormProps,
    UseFormReturn,
} from 'react-hook-form';

export type FormProps<TFormValues extends FieldValues, Schema> = {
    onSubmit: SubmitHandler<TFormValues>;
    schema: Schema;
    className?: string;
    children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
    options?: UseFormProps<TFormValues>;
    id?: string;
    hasFiles?: boolean;
};
export interface BaseFormFieldProps<T extends FieldValues = FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label?: string;
    description?: string;
    defaultChecked?: boolean;
}

export interface FormSelectOption {
    label: string;
    value: string;
}
