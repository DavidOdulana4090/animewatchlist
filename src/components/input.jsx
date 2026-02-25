import '../styles/Input.css'
import clsx from 'clsx';
import { forwardRef } from 'react';

const InputField = forwardRef((props, ref) => {
    return (
        <input placeholder={props.placeholder}
            ref={ref}
            className={clsx('input-field', props.className)}
            type={props.type}
            name={props.name}
            id={props.id}>
            

        </input>
    );
});

export default InputField;