import clsx from "clsx";
import "../styles/Button.css";

interface ButtonProps {
	text: string;
	onClick: () => void;
	className?: string;
}

function Button({ text, onClick, className }: ButtonProps) {
	return (
		<button
			onClick={onClick}
			className={clsx(
				"comp-button",
				"cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]",
				className,
			)}
		>
			{text}
		</button>
	);
}

export default Button;
