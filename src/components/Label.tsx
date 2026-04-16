import clsx from "clsx";
import '../styles/Label.css'

interface LabelProps {
    text: string;
    className?: string;
    htmlFor?: string;
}

function comp_label({ text, className, htmlFor }: LabelProps) {
    return ( 
        <label htmlFor={htmlFor} 
            className={clsx('labelcomp', className)}>
            {text}
        </label>
    );    
;}

export default comp_label;