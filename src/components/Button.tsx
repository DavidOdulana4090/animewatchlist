import clsx from "clsx";
import "../styles/Button.css";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
	text: string;
	onClick: () => void;
    className?: string;
    Icon?: LucideIcon | any;
    iconSize?: number;
}

function Button({ text, onClick, className, Icon, iconSize }: ButtonProps) {
	return (
		<button
			onClick={onClick}
			className={clsx(
				"comp-button",
				"cursor-pointer transition-all px-6 py-2 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]",
				className,
			)}
        >
            <span className=" inline-flex gap-3">
                {Icon && <Icon size={iconSize} className={clsx('icon-styling')} />}
                <span> {text} </span>
            </span>

		</button>
	);
}

export default Button;
