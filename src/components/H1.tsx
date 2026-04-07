import clsx from "clsx";
import '../styles/Heading.css'

interface Heading1Props {
    text: string;
    className?: string;
}

function heading1(props: Heading1Props) {
    return (
    <h1 className={clsx('heading-1',props.className)}>
        {props.text}
    </h1>  );
}

export default heading1;