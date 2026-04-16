import { LucideIcon } from "lucide-react";

interface IconProps{
    Icon: LucideIcon;
    size?: number;
    className?: string;
    color?: string;
}

function Icon({ Icon, size, className, color }: IconProps) {
    return (
        <Icon size={size}
            className={className}
            color={color}/>
    );
}

export default Icon;