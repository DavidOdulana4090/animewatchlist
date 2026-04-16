import clsx from "clsx";
import '../styles/Heading.css'

interface Heading1Props {
    text: string;
    className?: string;
}

function heading1({ text, className }: Heading1Props) {
    return (
    <h1 className={clsx('heading-1',className)}>
        {text}
    </h1>  );
}

export default heading1;