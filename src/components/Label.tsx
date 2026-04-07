import clsx from "clsx";
import '../styles/Label.css'

interface LabelProps {
    text: string;
    className?: string;
    htmlFor?: string;
}

function comp_label(props: LabelProps) {
    return ( 
        <label htmlFor={props.htmlFor} 
                className={clsx('labelcomp', props.className)}>
            {props.text}
        </label> 
);}

export default comp_label;