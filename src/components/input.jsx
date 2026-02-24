import '../styles/input.css'
import clsx from 'clsx';

function InputField(props) {
    return (
    <input placeholder={props.placeholder} 
            className={clsx('input-field', props.className)} 
            type={props.type} 
            id={props.id}>

    </input> 
);}

export default InputField;