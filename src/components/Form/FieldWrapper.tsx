import { FieldError } from 'react-hook-form';
import FieldErrorLabel from './FieldErrorLabel';

type FieldWrapperProps = {
    label: string;
    fieldError?: FieldError;
    errorMessage?: string;
    children: React.ReactNode;
};

const FORM_FIELD_CLASS = 'flex flex-col gap-2';

export default function FieldWrapper({
    label,
    children,
    errorMessage,
    fieldError,
}: FieldWrapperProps) {
    return (
        <div className={FORM_FIELD_CLASS}>
            <label>{label}</label>
            {children}
            {fieldError && errorMessage && (
                <FieldErrorLabel message={errorMessage} />
            )}
        </div>
    );
}
