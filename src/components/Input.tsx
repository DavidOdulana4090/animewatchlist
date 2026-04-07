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

const InputField = forwardRef((props: InputFieldProps, ref: React.Ref<HTMLInputElement>) => {
    return (
        <input placeholder={props.placeholder}
            ref={ref}
            className={clsx('input-field', props.className)}
            type={props.type}
            name={props.name}
            id={props.id}
            onChange={props.onChange}>
        </input>
    );
});

export default InputField;