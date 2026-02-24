import clsx from "clsx";
import '../styles/Label.css'

function comp_label(props) {
    return ( 
        <label htmlFor={props.htmlFor} 
                className={clsx('labelcomp', props.className)}>
            {props.text}
        </label> 
);}

export default comp_label;