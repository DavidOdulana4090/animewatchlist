import '../styles/Input.css'
import clsx from 'clsx';
import { forwardRef } from 'react';

interface InputFieldProps {
    placeholder: string | "";
    type?: string | "";
    name?: string | "";
    id?: string | "";
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string | "";
}

const InputField = forwardRef(( { placeholder, type, name, id, onChange, className }: InputFieldProps, ref: React.Ref<HTMLInputElement>) => {
    return (
        <input placeholder={placeholder}
            ref={ref}
            className={clsx('input-field', className)}
            type={type}
            name={name}
            id={id}
            onChange={onChange}>
        </input>
    );
});

export default InputField;