import '../styles/Input.css'
import clsx from 'clsx';
import { forwardRef } from 'react';

function InputField(props, ref) {
    return (
    <input placeholder={props.placeholder} 
            ref={ref}
            className={clsx('input-field', props.className)} 
            type={props.type} 
            id={props.id}>

    </input> 
);}

export default InputField;