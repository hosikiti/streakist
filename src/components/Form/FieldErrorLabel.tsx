type FieldErrorLabelProps = {
    message: string;
};

export default function FieldErrorLabel({ message }: FieldErrorLabelProps) {
    return <span className="text-xs text-error">{message}</span>;
}
