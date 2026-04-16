import { LucideIcon } from "lucide-react";
import "../styles/AsideButton.css"
import clsx from "clsx";

interface AsideButtonProps {
    Icon?: LucideIcon;
    text: string;
    active: string | null;
    onClick: (text: string) => void;
    className?: string;
    iconSize?: number;
}

function AsideButtons({ Icon, text, active, onClick, className, iconSize }: AsideButtonProps) {
    const isSelected = active === text;

    const handleSelected = () => {
        onClick(text); 
    };
    return ( 
        <button className={clsx('slice', className, isSelected ? 'selected' : '')} onClick={handleSelected}>
            {Icon && <Icon size={iconSize} className={clsx('icon-styling')} />}
            <span className="text"> {text} </span>
        </button>
     );
}

export default AsideButtons;