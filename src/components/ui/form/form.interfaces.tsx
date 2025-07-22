/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FieldPath } from 'react-hook-form';

export interface BaseFormFieldProps {
    control: Control<any>;
    name: FieldPath<any>;
    label: string;
    description?: string;
}

export interface FormSelectOption {
    label: string;
    value: string;
}
