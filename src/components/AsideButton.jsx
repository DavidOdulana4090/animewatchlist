import { Icon } from "lucide-react";
import "../styles/AsideButton.css"
import clsx from "clsx";

function AsideButtons(props) {
    const Icon = props.Icon;

    const isSelected = props.active === props.text;

    const handleSelected = () => {
        props.onClick(props.text); 
    };
    return ( 
        <button className={clsx('slice', props.className, isSelected ? 'selected' : '')} onClick={handleSelected}>
            {Icon && <Icon size={props.iconSize} className={clsx('icon-styling')} />}
            <span className="text"> {props.text} </span>
        </button>
     );
}

export default AsideButtons;